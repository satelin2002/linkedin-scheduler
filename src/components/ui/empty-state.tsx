import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Plus, Mail } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description?: string;
  className?: string;
  image: "not-found" | "error";
  showCreatePost?: boolean;
  showLearnMore?: boolean;
  onCreatePost?: () => void;
  onLearnMore?: () => void;
  onContact?: () => void;
}

export function EmptyState({
  title,
  description,
  className,
  image,
  showCreatePost,
  showLearnMore,
  onCreatePost,
  onLearnMore,
  onContact,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-12",
        "border rounded-lg bg-background/50 backdrop-blur-sm",
        className
      )}
    >
      <div className="w-40 h-40 relative mb-4">
        <Image
          src={`/illustrations/${image}.svg`}
          alt={title}
          fill
          className="object-contain"
        />
      </div>
      <h3 className="text-base font-medium text-foreground mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground max-w-sm mb-6">
          {description}
        </p>
      )}
      {image === "error" ? (
        <Button variant="outline" onClick={onContact} className="mb-12">
          <Mail className="h-4 w-4 mr-2" />
          Contact Support
        </Button>
      ) : (
        (showCreatePost || showLearnMore) && (
          <div className="flex gap-3 mt-2 mb-12">
            {showCreatePost && (
              <Button onClick={onCreatePost}>
                <Plus className="h-4 w-4 mr-2" />
                Create Post
              </Button>
            )}
            {showLearnMore && (
              <Button variant="outline" onClick={onLearnMore}>
                Learn more
              </Button>
            )}
          </div>
        )
      )}
    </div>
  );
}
