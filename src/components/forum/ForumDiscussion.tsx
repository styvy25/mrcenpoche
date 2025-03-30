
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ChevronLeft, MessageSquare, ThumbsUp, MessageCircle, Share, Flag, Bookmark } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ForumTopic, ForumPost } from './Forum';
import { formatDistanceToNow, format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { UserWithSubscription } from '@/components/auth/AuthContext';
import ReactMarkdown from 'react-markdown';

interface ForumDiscussionProps {
  topic: ForumTopic;
  posts: ForumPost[];
  onBackToTopics: () => void;
  currentUser: UserWithSubscription | null;
}

const ForumDiscussion: React.FC<ForumDiscussionProps> = ({ 
  topic, 
  posts, 
  onBackToTopics,
  currentUser
}) => {
  const [newReply, setNewReply] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const replyInputRef = useRef<HTMLTextAreaElement>(null);
  
  // Format dates
  const formatDate = (date: Date) => {
    return format(date, 'dd MMMM yyyy à HH:mm', { locale: fr });
  };
  
  const getTimeAgo = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true, locale: fr });
  };
  
  const handleSubmitReply = () => {
    if (!newReply.trim() || !currentUser) return;
    
    setIsSubmitting(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      setNewReply('');
      setIsSubmitting(false);
      // We would update the posts state here after API response
    }, 1000);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <Button 
          variant="ghost" 
          className="flex items-center gap-1 -ml-2"
          onClick={onBackToTopics}
        >
          <ChevronLeft className="h-4 w-4" />
          Retour aux sujets
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <Bookmark className="h-4 w-4" />
            <span className="hidden sm:inline">Suivre</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <Share className="h-4 w-4" />
            <span className="hidden sm:inline">Partager</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2 border-b">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-2xl mb-2">{topic.title}</CardTitle>
              <div className="flex flex-wrap gap-1 mb-2">
                {topic.tags?.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-gray-100 dark:bg-gray-800">
                    {tag}
                  </Badge>
                ))}
              </div>
              <CardDescription>
                Créé par <span className="font-medium">{topic.authorName}</span> le {formatDate(topic.createdAt)}
              </CardDescription>
            </div>
            <div className="flex items-center text-sm text-muted-foreground gap-4">
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{topic.repliesCount} {topic.repliesCount > 1 ? 'réponses' : 'réponse'}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-6">
            {posts.map((post, index) => (
              <div key={post.id} className="pb-6 border-b last:border-b-0">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={post.authorAvatar} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
                        {post.authorName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold">{post.authorName}</h3>
                        {post.authorRole && (
                          <Badge variant="outline" className="text-xs mr-2">
                            {post.authorRole}
                          </Badge>
                        )}
                        {post.authorPoints && (
                          <span className="text-xs text-purple-600 dark:text-purple-400 mr-2">
                            {post.authorPoints} points
                          </span>
                        )}
                        {post.authorBadges?.map((badge, i) => (
                          <Badge 
                            key={i} 
                            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs mr-1"
                          >
                            {badge}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatDate(post.createdAt)}
                        {post.isEdited && (
                          <span className="ml-2">(modifié {getTimeAgo(post.updatedAt || post.createdAt)})</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <ReactMarkdown>{post.content}</ReactMarkdown>
                    </div>
                    
                    {post.attachments && post.attachments.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {post.attachments.map(attachment => (
                          <div key={attachment.id}>
                            {attachment.type === 'image' && (
                              <img 
                                src={attachment.url} 
                                alt={attachment.name || 'Attachment'} 
                                className="max-w-full max-h-64 rounded-md"
                              />
                            )}
                            {attachment.type === 'file' && (
                              <a 
                                href={attachment.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                              >
                                📎 {attachment.name || 'Fichier attaché'}
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Button variant="ghost" size="sm" className="h-8 gap-1 text-muted-foreground">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{post.reactions?.find(r => r.type === '👍')?.count || 0}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 gap-1 text-muted-foreground">
                        <MessageCircle className="h-4 w-4" />
                        <span>Répondre</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 gap-1 text-muted-foreground">
                        <Share className="h-4 w-4" />
                        <span>Partager</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 gap-1 text-muted-foreground">
                        <Flag className="h-4 w-4" />
                        <span>Signaler</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {currentUser && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="font-semibold mb-2">Votre réponse</h3>
              <Textarea
                ref={replyInputRef}
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                placeholder="Écrivez votre réponse ici... (Markdown supporté)"
                rows={6}
                className="mb-3"
              />
              <div className="flex justify-end">
                <Button 
                  onClick={handleSubmitReply} 
                  disabled={!newReply.trim() || isSubmitting}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ForumDiscussion;
