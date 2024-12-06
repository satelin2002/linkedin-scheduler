"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Calendar } from "@/components/ui/calendar";
import { Post } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { format } from "date-fns";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { toast } from "sonner";
import { PenSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function PostCalendar() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [deletePostId, setDeletePostId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const postsContainerRef = useRef<HTMLDivElement>(null);

  const { data: posts, isLoading } = useQuery<Post[]>({
    queryKey: ["calendar-posts"],
    queryFn: async () => {
      const response = await fetch("/api/posts/calendar");
      if (!response.ok) throw new Error("Failed to fetch posts");
      return response.json();
    },
  });

  const handleEditPost = (post: Post) => {
    router.push(`/posts?openDialog=true&postId=${post.id}`);
  };

  const handleDeletePost = async () => {
    if (!deletePostId) return;

    try {
      const response = await fetch(`/api/posts/${deletePostId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete post");

      await queryClient.invalidateQueries({ queryKey: ["calendar-posts"] });
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
    } finally {
      setDeletePostId(null);
    }
  };

  const scheduledDates = posts?.reduce((acc, post) => {
    if (post.scheduledFor) {
      const date = new Date(post.scheduledFor);
      const key = format(date, "yyyy-MM-dd");
      if (!acc[key]) acc[key] = [];
      acc[key].push(post);
    }
    return acc;
  }, {} as Record<string, Post[]>);

  const scrollToDate = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const element = document.getElementById(`date-${dateStr}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="p-4 overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Scheduled Posts</h1>
      </div>

      <div className="grid md:grid-cols-[300px,1fr] gap-8">
        <div className="border rounded-lg p-4 h-fit">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date: Date | undefined) => {
              if (date) {
                setSelectedDate(date);
                scrollToDate(date);
              }
            }}
            className="rounded-md"
            modifiers={{
              scheduled: (date) => {
                const key = format(date, "yyyy-MM-dd");
                return !!scheduledDates?.[key]?.length;
              },
            }}
            modifiersStyles={{
              scheduled: {
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                borderRadius: "4px",
              },
            }}
          />
        </div>

        <div
          className="space-y-4 overflow-auto max-h-[calc(100vh-16rem)] p-4"
          ref={postsContainerRef}
        >
          {isLoading
            ? [...Array(3)].map((_, i) => (
                <div key={i} className="border rounded-lg p-4 space-y-4">
                  <Skeleton className="h-6 w-32" />
                  <div className="space-y-4">
                    {[...Array(2)].map((_, j) => (
                      <div key={j} className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-4 w-full" />
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Skeleton className="h-8 w-8" />
                          <Skeleton className="h-8 w-8" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            : Object.entries(scheduledDates || {}).map(([date, posts]) => (
                <div
                  key={date}
                  id={`date-${date}`}
                  className={cn(
                    "border rounded-lg p-4",
                    selectedDate &&
                      format(selectedDate, "yyyy-MM-dd") === date &&
                      "ring-2 ring-blue-500"
                  )}
                >
                  <h2 className="font-medium mb-4">
                    {format(new Date(date), "MMMM d, yyyy")}
                  </h2>
                  <div className="space-y-4">
                    {posts.map((post) => (
                      <div
                        key={post.id}
                        className="flex items-start  justify-between border-l-4 border-blue-500 bg-blue-50/50 p-4 rounded-r-lg"
                      >
                        <div>
                          <p className="text-sm text-gray-600">
                            {format(new Date(post.scheduledFor!), "h:mm a")}
                          </p>
                          <p className="mt-1 line-clamp-2 text-sm">
                            {post.content}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditPost(post)}
                          >
                            <PenSquare className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setDeletePostId(post.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
        </div>
      </div>

      <ConfirmDialog
        open={!!deletePostId}
        onOpenChange={(open) => !open && setDeletePostId(null)}
        onConfirm={handleDeletePost}
        title="Delete Post"
        description="Are you sure you want to delete this scheduled post? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
