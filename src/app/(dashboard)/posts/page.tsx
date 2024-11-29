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
                      onClick={() => handlePostClick(post.content, post.topics)}
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
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Page;
