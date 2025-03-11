
import { cn } from "@/lib/utils"

export interface TestimonialAuthor {
  name: string
  handle?: string
  avatar?: string
}

export interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
}

export function TestimonialCard({ 
  author, 
  text, 
  href,
  className 
}: TestimonialCardProps) {
  const Card = () => (
    <div className={cn(
      "flex flex-col justify-between bg-card p-6 shadow-sm",
      "rounded-xl border border-border/40",
      "transition-all duration-200 hover:border-border/80 hover:shadow-md",
      "min-w-[330px] max-w-[330px] h-[220px] mx-2 my-4",
      className
    )}>
      <p className="text-sm leading-relaxed text-muted-foreground">"{text}"</p>
      
      <div className="mt-4 flex items-center gap-3">
        {author.avatar && (
          <img 
            src={author.avatar} 
            alt={author.name} 
            className="h-10 w-10 rounded-full object-cover"
          />
        )}
        <div>
          <p className="text-sm font-medium">{author.name}</p>
          {author.handle && (
            <p className="text-xs text-muted-foreground">{author.handle}</p>
          )}
        </div>
      </div>
    </div>
  )
  
  if (href) {
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="hover:no-underline focus:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-xl"
      >
        <Card />
      </a>
    )
  }
  
  return <Card />
}
