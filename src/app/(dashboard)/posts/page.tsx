"use client";

import { useState, useEffect, useCallback } from "react";
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
  MoreVertical,
  PencilIcon,
  Clock10,
  AlarmClock,
  PenTool,
  PencilLine,
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
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CreatePostDialog } from "@/components/create-post-dialog";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Post, PostStatus } from "@prisma/client";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { toast } from "sonner";

type PaginatedResponse = {
  posts: Post[];
  pagination: {
    total: number;
    pages: number;
    page: number;
    limit: number;
  };
};

export function Page() {
  const router = useRouter();
  const [expandedPosts, setExpandedPosts] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const searchParams = useSearchParams();
  const [deletePostId, setDeletePostId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (searchParams.get("openDialog") === "true") {
      setIsDialogOpen(true);
    }
  }, [searchParams]);

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

  const handleSearch = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        setDebouncedQuery(searchQuery);
        setCurrentPage(1); // Reset to first page on new search
      }
    },
    [searchQuery]
  );

  const { data, isLoading, error, refetch } = useQuery<PaginatedResponse>({
    queryKey: ["posts", activeTab, currentPage, debouncedQuery],
    queryFn: async () => {
      const params = new URLSearchParams({
        status: activeTab === "all" ? "" : activeTab,
        page: currentPage.toString(),
        limit: postsPerPage.toString(),
        ...(debouncedQuery && { search: debouncedQuery }),
      });

      const response = await fetch(`/api/posts/get?${params}`);
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      return response.json();
    },
  });

  const handleDeletePost = async () => {
    if (!deletePostId) return;

    try {
      const response = await fetch(`/api/posts/${deletePostId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete post");

      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post deleted successfully");
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
    } finally {
      setDeletePostId(null);
    }
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
                      className="px-6 rounded-md data-[state=active]:bg-secondary/80 data-[state=active]:border-primary/70 data-[state=active]:font-semibold data-[state=active]:border data-[state=active]:text-primary"
                    >
                      <GalleryVerticalEnd className="h-4 w-4 mr-2" />
                      All Posts
                    </TabsTrigger>
                    <TabsTrigger
                      value="scheduled"
                      className="px-6 rounded-md data-[state=active]:bg-secondary/80 data-[state=active]:border-primary/70 data-[state=active]:font-semibold data-[state=active]:border data-[state=active]:text-primary"
                    >
                      <FolderClock className="h-4 w-4 mr-2" />
                      Scheduled
                    </TabsTrigger>
                    <TabsTrigger
                      value="published"
                      className="px-6 rounded-md data-[state=active]:bg-secondary/80 data-[state=active]:border-primary/70 data-[state=active]:font-semibold data-[state=active]:border data-[state=active]:text-primary"
                    >
                      <BookCheck className="h-4 w-4 mr-2" />
                      Published
                    </TabsTrigger>
                    <TabsTrigger
                      value="draft"
                      className="px-6 rounded-md data-[state=active]:bg-secondary/80 data-[state=active]:border-primary/70 data-[state=active]:font-semibold data-[state=active]:border data-[state=active]:text-primary"
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
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleSearch}
                      placeholder="Search posts and press ↵"
                      className="pl-9 h-9 w-full bg-white"
                    />
                  </div>
                  <CreatePostDialog
                    data-create-post
                    post={editingPost}
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    onClose={() => {
                      setEditingPost(null);
                      setIsDialogOpen(false);
                    }}
                  />
                </div>
              </div>

              {isLoading ? (
                <div className="grid gap-4 mt-4 w-full max-w-full">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="rounded-lg bg-slate-50/20 text-card-foreground shadow-sm h-20 animate-pulse"
                    >
                      <Skeleton className="h-full w-full" />
                    </div>
                  ))}
                </div>
              ) : error ? (
                <EmptyState
                  image="error"
                  title="Failed to load posts"
                  description="There was an error loading your posts. Please try refreshing the page."
                  className="my-8"
                  onContact={() =>
                    window.open("mailto:support@example.com", "_blank")
                  }
                />
              ) : data?.posts.length === 0 ? (
                <EmptyState
                  image={
                    activeTab === "scheduled"
                      ? "no-scheduled"
                      : activeTab === "published"
                      ? "no-published"
                      : activeTab === "draft"
                      ? "no-drafts"
                      : activeTab === "all"
                      ? "no-all-posts"
                      : "not-found"
                  }
                  title={
                    activeTab === "all"
                      ? "No posts found"
                      : `No ${activeTab} posts found`
                  }
                  description={
                    searchQuery
                      ? "We couldn't find any posts matching your search criteria."
                      : activeTab === "scheduled"
                      ? "You don't have any scheduled posts. Create a post and schedule it for later."
                      : activeTab === "published"
                      ? "You haven't published any posts yet. Start creating and publishing your content."
                      : activeTab === "drafts"
                      ? "No drafts found. Save your posts as drafts to continue working on them later."
                      : "Start creating your first post to share with your network."
                  }
                  className="my-8"
                  showCreatePost={!searchQuery}
                  showLearnMore={!searchQuery}
                  onCreatePost={() =>
                    document
                      .querySelector<HTMLButtonElement>("[data-create-post]")
                      ?.click()
                  }
                  onLearnMore={() =>
                    window.open("https://docs.example.com/posts", "_blank")
                  }
                />
              ) : (
                <>
                  <div className="grid gap-4 mt-4 w-full max-w-full">
                    {data?.posts.map((post, index) => (
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
                              <div className="flex-shrink-0 self-start sm:self-center">
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

                              <div className="flex-1 min-w-0 overflow-hidden space-y-3">
                                <div className="text-sm text-foreground overflow-hidden">
                                  <p className="truncate pr-4 pb-1 text-black">
                                    {post.content
                                      .split(" ")
                                      .slice(0, 15)
                                      .join(" ")}
                                    {post.content.split(" ").length > 15
                                      ? "..."
                                      : ""}
                                  </p>
                                </div>

                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                                  <span className="text-sm text-muted-foreground">
                                    {post.status === "published" && (
                                      <>
                                        Published on{" "}
                                        {format(
                                          new Date(post.publishedAt!),
                                          "MMM d"
                                        )}
                                      </>
                                    )}
                                    {post.status === "draft" && (
                                      <>
                                        Draft from{" "}
                                        {format(
                                          new Date(post.createdAt),
                                          "MMM d"
                                        )}
                                      </>
                                    )}
                                    {post.status === "scheduled" && (
                                      <>
                                        Scheduled for{" "}
                                        {format(
                                          new Date(post.scheduledFor!),
                                          "MMM d"
                                        )}
                                      </>
                                    )}
                                  </span>
                                  <div className="flex flex-wrap gap-2 min-w-0 overflow-hidden">
                                    {post.topics?.map((topic) => (
                                      <Badge
                                        key={topic}
                                        variant="secondary"
                                        className="rounded-lg text-sm"
                                      >
                                        {topic}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 flex-shrink-0 pt-3 mt-3 border-t sm:pt-0 sm:mt-0 sm:border-t-0 sm:border-l sm:pl-4 md:flex-row md:items-center md:gap-2 font-normal">
                                <div className="flex gap-1">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        // className="h-8 w-8 p-0 hover:bg-secondary hover:text-primary transition-colors duration-200"
                                      >
                                        <MoreVertical className="h-5 w-5 text-muted-foreground" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                      align="end"
                                      className="w-[140px] animate-in slide-in-from-right-5 duration-200"
                                    >
                                      <DropdownMenuItem
                                        className="flex items-center gap-2 cursor-pointer"
                                        onClick={() => {
                                          setEditingPost(post);
                                          setIsDialogOpen(true);
                                        }}
                                      >
                                        <PenSquare className="h-4 w-4 text-muted-foreground" />
                                        <span>Edit</span>
                                      </DropdownMenuItem>

                                      {post.status !== "published" && (
                                        <DropdownMenuItem
                                          className="flex items-center gap-2 cursor-pointer text-red-600 hover:text-red-700 focus:text-red-700"
                                          onClick={() =>
                                            setDeletePostId(post.id)
                                          }
                                        >
                                          <Trash2 className="h-4 w-4" />
                                          <span>Delete</span>
                                        </DropdownMenuItem>
                                      )}
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {data?.pagination && data.posts.length > 0 && (
                    <div className="flex items-center justify-between mt-8 pb-8">
                      <div className="text-sm text-muted-foreground">
                        Showing {(data.pagination.page - 1) * postsPerPage + 1}{" "}
                        to{" "}
                        {Math.min(
                          data.pagination.page * postsPerPage,
                          data.pagination.total
                        )}{" "}
                        of {data.pagination.total} posts
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
                          {[...Array(data.pagination.pages)].map((_, i) => (
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
                            setCurrentPage((prev) =>
                              Math.min(totalPages, prev + 1)
                            )
                          }
                          disabled={currentPage === totalPages}
                          className="h-8 w-8 p-0"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
      <ConfirmDialog
        open={!!deletePostId}
        onOpenChange={(open) => !open && setDeletePostId(null)}
        onConfirm={handleDeletePost}
        title="Delete Post"
        description="Are you sure you want to delete this post? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </SidebarProvider>
  );
}

export default Page;
