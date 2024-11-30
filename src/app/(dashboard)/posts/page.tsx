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
  Clock,
  Trash2,
  CheckCircle2,
  PenLine,
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
import { useRouter } from "next/navigation";

export function Page() {
  const router = useRouter();
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

  const handlePostClick = (content: string, topics: string[]) => {
    const encodedContent = encodeURIComponent(content);
    const encodedTopics = encodeURIComponent(JSON.stringify(topics));
    router.push(
      `/posts/create?content=${encodedContent}&topics=${encodedTopics}`
    );
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="relative min-h-screen w-full overflow-hidden">
          <div className="relative z-10">
            {" "}
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <div className="flex items-center justify-between w-full gap-2 px-4">
                <div className="flex items-center gap-2">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">Posts</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Posts</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </div>
            </header>
            <div className="max-w-7xl mx-auto px-8 mt-8">
              <div className="flex items-center justify-between">
                <Tabs
                  defaultValue="all"
                  className="flex-1"
                  onValueChange={(value) => setActiveTab(value)}
                >
                  <TabsList className="inline-flex w-fit">
                    <TabsTrigger value="all" className="px-6">
                      All Posts
                    </TabsTrigger>
                    <TabsTrigger value="scheduled" className="px-6">
                      Scheduled
                    </TabsTrigger>
                    <TabsTrigger value="published" className="px-6">
                      Published
                    </TabsTrigger>
                    <TabsTrigger value="drafts" className="px-6">
                      Drafts
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <Link href="/posts/create">
                  <Button className="hover:bg-secondary/20">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Post
                  </Button>
                </Link>
              </div>

              <div className="grid gap-4 mt-6">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="rounded-lg border bg-card text-card-foreground shadow-sm h-fit"
                  >
                    {/* Post Content */}
                    <div className="p-4">
                      <div className="prose prose-sm max-w-none">
                        <div className="flex items-start gap-3">
                          {/* Status indicator */}
                          <div className="flex-shrink-0 mt-0.5">
                            {post.status === "scheduled" && (
                              <div className="rounded-full bg-blue-50 p-2">
                                <Clock className="h-4 w-4 text-blue-500" />
                              </div>
                            )}
                            {post.status === "published" && (
                              <div className="rounded-full bg-green-50 p-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                              </div>
                            )}
                            {post.status === "draft" && (
                              <div className="rounded-full bg-orange-50 p-2">
                                <PenLine className="h-4 w-4 text-orange-500" />
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1">
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
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between p-4 bg-slate-50 border-t rounded-b-lg">
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-secondary/20"
                          >
                            <Calendar className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-secondary/20"
                          >
                            <Clock className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-secondary/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="hover:bg-secondary/20"
                        onClick={() =>
                          handlePostClick(post.content, post.topics)
                        }
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Post
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Page;
