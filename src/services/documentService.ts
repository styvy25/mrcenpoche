
import { supabase } from "@/lib/supabase";
import { jsPDF } from "jspdf";

interface DocumentGenerationOptions {
  title: string;
  content: string;
  author?: string;
  type?: string;
}

export async function generateDocumentContent(options: DocumentGenerationOptions): Promise<any> {
  try {
    // In a real implementation, we would use Perplexity API to generate content
    // For now, just return the provided content
    return {
      title: options.title,
      content: options.content,
      metadata: {
        author: options.author || "MRC en Poche",
        type: options.type || "document",
        generatedAt: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error("Error generating document content:", error);
    throw error;
  }
}

export async function generatePDF(options: DocumentGenerationOptions): Promise<Blob> {
  try {
    // Create a new PDF document
    const doc = new jsPDF();
    const title = options.title || "Document";
    const content = options.content || "";
    
    // Add title
    doc.setFontSize(22);
    doc.text(title, 20, 20);
    
    // Add content
    doc.setFontSize(12);
    
    // Simple text wrapping (in a real app, use a more sophisticated approach)
    const lines = doc.splitTextToSize(content, 170);
    doc.text(lines, 20, 40);
    
    // Add footer
    doc.setFontSize(10);
    doc.text("Généré par MRC en Poche | " + new Date().toLocaleDateString(), 20, 280);
    
    // Return the document as a blob
    return doc.output('blob');
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
}

// Function to save document to Supabase storage
export async function saveDocument(file: Blob, fileName: string): Promise<string> {
  try {
    const user = (await supabase.auth.getUser()).data.user;
    
    if (!user) {
      throw new Error("User not authenticated");
    }
    
    const filePath = `${user.id}/${fileName}`;
    
    // Upload file to Supabase Storage
    const { error } = await supabase.storage
      .from('documents')
      .upload(filePath, file, {
        contentType: 'application/pdf',
        upsert: true
      });
    
    if (error) {
      throw error;
    }
    
    // Get public URL
    const { data } = supabase.storage
      .from('documents')
      .getPublicUrl(filePath);
    
    return data.publicUrl;
  } catch (error) {
    console.error("Error saving document:", error);
    throw error;
  }
}

// Function to integrate with Perplexity API for content generation
export async function generateContentWithAI(prompt: string): Promise<string> {
  try {
    // Note: In a real implementation, we would use Perplexity API
    // This function would make the API call and return the response
    
    // For now, return a placeholder response
    return `Contenu généré par Perplexity API basé sur: "${prompt}"`;
  } catch (error) {
    console.error("Error generating content with AI:", error);
    throw new Error("Failed to generate content with AI");
  }
}
