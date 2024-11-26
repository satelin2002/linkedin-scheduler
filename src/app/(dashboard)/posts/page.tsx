"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Plus,
  BookmarkIcon,
  Calendar,
  PenSquare,
  Send,
  Lightbulb,
  Signpost,
  MailCheck,
  BarChart3,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TypographyH3 } from "@/components/ui/typography";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { userPosts } from "@/lib/mock";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function Page() {
  const [expandedPosts, setExpandedPosts] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("my-posts");

  const togglePostExpansion = (postId: string) => {
    setExpandedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  const filteredPosts = userPosts.filter((post) =>
    activeTab === "saved" ? post.saved : !post.saved
  );

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <div className="flex items-center justify-between w-full gap-2 px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Building Your Application
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Posts</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <Link href="/posts/create">
              <Button
                className="bg-black hover:bg-black/90 text-white"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Post
              </Button>
            </Link>
          </div>
        </header>

        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <Tabs
              defaultValue="my-posts"
              className="w-full mb-6"
              onValueChange={setActiveTab}
            >
              <TabsList>
                <TabsTrigger value="my-posts">
                  <MailCheck className="h-4 w-4 mr-2" />
                  My Posts
                </TabsTrigger>
                <TabsTrigger value="saved">
                  <BookmarkIcon className="h-4 w-4 mr-2" />
                  Saved Posts
                </TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="space-y-2 mb-6">
              {activeTab === "my-posts" ? (
                <>
                  <p className="text-sm text-muted-foreground">
                    View and manage all the posts you've created. Edit, delete,
                    or share your content with your network.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground">
                    Access posts you've bookmarked for later. Keep track of
                    content that inspires you or that you want to reference.
                  </p>
                </>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="rounded-lg border bg-card text-card-foreground shadow-sm h-fit"
                >
                  {/* Card Header */}
                  <div className="p-4 border-b flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1.5">
                      <Lightbulb className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-medium text-sm">
                      Share an idea with your network
                    </h3>
                  </div>

                  {/* Post Content */}
                  <div className="p-4">
                    <div className="prose prose-sm max-w-none">
                      <div className="text-sm text-foreground">
                        {expandedPosts.includes(post.id) ? (
                          <>
                            {post.content}
                            {post.content.length > 300 && (
                              <button
                                onClick={() => togglePostExpansion(post.id)}
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
                                onClick={() => togglePostExpansion(post.id)}
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

                  {/* Footer */}
                  <div className="p-4 border-t">
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
                                <PenSquare className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-black text-white border-black">
                              Edit post
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
                                <BarChart3 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-black text-white border-black">
                              View analytics
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
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Page;
