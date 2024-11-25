"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bookmark, Send, Calendar, Lightbulb } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TypographyH3 } from "@/components/ui/typography";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { PopularPost, TopicSection, popularTopics } from "@/lib/mock";

export default function PopularPostsPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [expandedPosts, setExpandedPosts] = useState<string[]>([]);

  // Function to toggle post expansion
  const togglePostExpansion = (postId: string) => {
    setExpandedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="relative min-h-screen w-full overflow-hidden">
          <div className="relative z-10">
            <header className="flex h-16 shrink-0 items-center gap-2">
              <div className="flex items-center justify-between w-full gap-2 px-4">
                <div className="flex items-center gap-2">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <TypographyH3>Popular Posts</TypographyH3>
                </div>
              </div>
            </header>

            <div className="p-6">
              <div className="max-w-7xl mx-auto space-y-8">
                {/* Topic Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {popularTopics.map((topic) => (
                    <Badge
                      key={topic.name}
                      variant={
                        selectedTopic === topic.name ? "default" : "secondary"
                      }
                      className="cursor-pointer px-4 py-1.5 text-sm"
                      onClick={() => setSelectedTopic(topic.name)}
                    >
                      {topic.name}
                    </Badge>
                  ))}
                </div>

                {/* Posts for Selected Topic */}
                {selectedTopic && (
                  <div>
                    {popularTopics
                      .filter((topic) => topic.name === selectedTopic)
                      .map((topic) => (
                        <div key={topic.name}>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {topic.posts.map((post) => (
                              <div
                                key={post.id}
                                className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col"
                              >
                                {/* Card Header with Idea */}
                                <div className="p-4 border-b flex items-center gap-2">
                                  <div className="rounded-full bg-primary/10 p-1.5">
                                    <Lightbulb className="h-4 w-4 text-primary" />
                                  </div>
                                  <h3 className="font-medium text-sm">
                                    Share an idea with your network
                                  </h3>
                                </div>

                                {/* Post Content */}
                                <div className="p-4 flex-1">
                                  <div className="prose prose-sm max-w-none">
                                    <div className="text-sm text-foreground">
                                      {expandedPosts.includes(post.id) ? (
                                        <>
                                          {post.content}
                                          {post.content.length > 300 && (
                                            <button
                                              onClick={() =>
                                                togglePostExpansion(post.id)
                                              }
                                              className="text-primary hover:text-primary/90 ml-1"
                                            >
                                              show less
                                            </button>
                                          )}
                                        </>
                                      ) : (
                                        <>
                                          {post.content.slice(0, 300)}
                                          {post.content.length > 300 && (
                                            <button
                                              onClick={() =>
                                                togglePostExpansion(post.id)
                                              }
                                              className="text-primary hover:text-primary/90 ml-1"
                                            >
                                              ...more
                                            </button>
                                          )}
                                        </>
                                      )}
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-4">
                                      {post.topics.map((topic) => (
                                        <Badge
                                          key={topic}
                                          variant="secondary"
                                          className="rounded-full"
                                        >
                                          {topic}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                {/* Footer - with standardized spacing */}
                                <div className="p-4 border-t mt-auto">
                                  <div className="flex justify-between items-center">
                                    <div className="flex gap-3">
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
                                            >
                                              <Calendar className="h-4 w-4" />
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent className="bg-black text-white border-black">
                                            Schedule post
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
                                            >
                                              <Bookmark className="h-4 w-4" />
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent className="bg-black text-white border-black">
                                            Save post
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    </div>
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button
                                            size="sm"
                                            className="bg-primary hover:bg-primary/90 text-primary-foreground"
                                          >
                                            <Send className="h-4 w-4 mr-2" />
                                            Post
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent className="bg-black text-white border-black">
                                          Share post
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
