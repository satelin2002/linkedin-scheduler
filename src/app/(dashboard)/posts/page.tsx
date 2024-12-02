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
  FilePlus2,
  PenLine,
  BookCheck,
  CirclePlus,
  CalendarClock,
  NotepadTextDashed,
  Search,
  ChevronLeft,
  ChevronRight,
  FilePen,
  GalleryVerticalEnd,
  FolderClock,
  FolderPen,
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
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CreatePostDialog } from "@/components/create-post-dialog";

export function Page() {
  const router = useRouter();
  const [expandedPosts, setExpandedPosts] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("my-posts");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const togglePostExpansion = (postId: string) => {
    setExpandedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
  };

  const filteredPosts = userPosts.filter((post) => {
    switch (activeTab) {
      case "all":
        return true;
      case "scheduled":
        return post.status === "scheduled";
      case "published":
        return post.status === "published";
      case "drafts":
        return post.status === "draft";
      default:
        return true;
    }
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage
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
                  <TabsList className="inline-flex w-fit bg-white border rounded-lg p-0">
                    <TabsTrigger
                      value="all"
                      className="px-6 rounded-md data-[state=active]:bg-secondary/80 data-[state=active]:border-primary/70 data-[state=active]:border data-[state=active]:text-primary"
                    >
                      <GalleryVerticalEnd className="h-4 w-4 mr-2" />
                      All Posts
                    </TabsTrigger>
                    <TabsTrigger
                      value="scheduled"
                      className="px-6 rounded-md data-[state=active]:bg-secondary/80 data-[state=active]:border-primary/70 data-[state=active]:border data-[state=active]:text-primary"
                    >
                      <FolderClock className="h-4 w-4 mr-2" />
                      Scheduled
                    </TabsTrigger>
                    <TabsTrigger
                      value="published"
                      className="px-6 rounded-md data-[state=active]:bg-secondary/80 data-[state=active]:border-primary/70 data-[state=active]:border data-[state=active]:text-primary"
                    >
                      <BookCheck className="h-4 w-4 mr-2" />
                      Published
                    </TabsTrigger>
                    <TabsTrigger
                      value="drafts"
                      className="px-6 rounded-md data-[state=active]:bg-secondary/80 data-[state=active]:border-primary/70 data-[state=active]:border data-[state=active]:text-primary"
                    >
                      <FolderPen className="h-4 w-4 mr-2" />
                      Drafts
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="flex items-center gap-4">
                  <div className="relative w-64">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Search posts</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Input
                      type="text"
                      placeholder="Search posts..."
                      className="pl-9 h-9 w-full bg-white"
                    />
                  </div>
                  <CreatePostDialog />
                </div>
              </div>

              <div className="grid gap-4 mt-6 w-full max-w-full">
                {paginatedPosts.map((post, index) => (
                  <div
                    key={post.id}
                    className={cn(
                      "rounded-lg border bg-card text-card-foreground shadow-sm h-fit",
                      "transform transition-all duration-300",
                      "animate-in fade-in-50 slide-in-from-bottom-3",
                      `delay-[${index * 50}ms]`
                    )}
                  >
                    <div className="p-3 sm:p-4">
                      <div className="prose prose-sm max-w-none w-full">
                        <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                          <div className="flex-shrink-0 self-start">
                            {post.status === "scheduled" && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    {/* <div className="rounded-full border p-2.5 bg-gradient-to-br from-gray-50   to-gray-100/20">
                                      <CalendarClock className="h-5 w-5  " />
                                    </div> */}
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Scheduled post</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                            {post.status === "published" && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    {/* <div className="rounded-full border p-2.5 bg-gradient-to-br from-gray-50   to-gray-100/20">
                                      <MailCheck className="h-5 w-5 " />
                                    </div> */}
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Published post</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                            {post.status === "draft" && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    {/* <div className="rounded-full border p-2.5 bg-gradient-to-br from-gray-50   to-gray-100/20">
                                      <FilePen className="h-5 w-5  " />
                                    </div> */}
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Draft post</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>

                          <div className="flex-1 min-w-0 overflow-hidden space-y-3 sm:space-y-0">
                            <div className="text-sm text-foreground overflow-hidden">
                              <p className="truncate pr-4 pb-1">
                                {post.content.split(" ").slice(0, 15).join(" ")}
                                {post.content.split(" ").length > 15
                                  ? "..."
                                  : ""}
                              </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                              <span className="text-sm text-muted-foreground order-2 sm:order-1">
                                {post.status === "published" && (
                                  <>
                                    Published on{" "}
                                    {format(new Date(post.timestamp), "MMM d")}
                                  </>
                                )}
                                {post.status === "draft" && (
                                  <>
                                    Draft from{" "}
                                    {format(new Date(post.timestamp), "MMM d")}
                                  </>
                                )}
                                {post.status === "scheduled" && (
                                  <>
                                    Scheduled for{" "}
                                    {format(new Date(post.timestamp), "MMM d")}
                                  </>
                                )}
                              </span>
                              <div className="flex flex-wrap gap-2 min-w-0 overflow-hidden order-1 sm:order-2">
                                {post.topics.map((topic) => (
                                  <Badge
                                    key={topic}
                                    variant="secondary"
                                    className="rounded-full text-xs"
                                  >
                                    {topic}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 flex-shrink-0 pt-3 mt-3 border-t sm:pt-0 sm:mt-0 sm:border-t-0 sm:border-l sm:pl-4">
                            <div className="flex gap-1">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 w-8 p-0 hover:bg-secondary/20"
                                    >
                                      <Calendar className="h-4 w-4 text-muted-foreground" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Schedule post</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 w-8 p-0 hover:bg-secondary/20"
                                    >
                                      <PenSquare className="h-4 w-4 text-muted-foreground" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Edit post</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 w-8 p-0 hover:bg-secondary/20"
                                    >
                                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Delete post</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="hover:bg-secondary/20"
                                    onClick={() =>
                                      handlePostClick(post.content, post.topics)
                                    }
                                  >
                                    <Send className="h-4 w-4 mr-2" />
                                    <span className="hidden sm:inline">
                                      Post
                                    </span>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Share post</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredPosts.length > 0 && (
                <div className="flex items-center justify-between mt-8 pb-8">
                  <div className="text-sm text-muted-foreground">
                    Showing {startIndex + 1} to{" "}
                    {Math.min(startIndex + postsPerPage, filteredPosts.length)}{" "}
                    of {filteredPosts.length} posts
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(1, prev - 1))
                      }
                      disabled={currentPage === 1}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <div className="flex items-center gap-1">
                      {[...Array(totalPages)].map((_, i) => (
                        <Button
                          key={i + 1}
                          variant={
                            currentPage === i + 1 ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() => setCurrentPage(i + 1)}
                          className={cn(
                            "h-8 w-8 p-0",
                            currentPage === i + 1 && "pointer-events-none"
                          )}
                        >
                          {i + 1}
                        </Button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="h-8 w-8 p-0"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default Page;
