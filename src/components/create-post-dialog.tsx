"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Wand2,
  Sparkles,
  Copy,
  Eye,
  Save,
  Send,
  Monitor,
  Tablet,
  Smartphone,
  CircleHelp,
  Loader2,
  Hash,
  FileUser,
  ImagePlus,
  X,
  CalendarIcon,
  Calendar1Icon,
  Calendar,
  CheckCircle2,
  CalendarClock,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useRef, useEffect } from "react";
import { mockIdeas, availableTopics } from "@/lib/mock";
import { cn } from "@/lib/utils";
import LikeIcon from "./ui/like";
import HeartIcon from "./ui/hearts";
import ThumbsUpIcon from "./ui/thumbs-up";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { Post } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useQueryClient } from "@tanstack/react-query";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

interface CreatePostDialogProps {
  post?: Post | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
}

const FormSchema = z.object({
  scheduledDate: z.date().optional(),
});

export function CreatePostDialog({
  post,
  open,
  onOpenChange,
  onClose,
}: CreatePostDialogProps) {
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [generatedIdeas, setGeneratedIdeas] = useState<string[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<string>("");
  const [content, setContent] = useState(post?.content || "");
  const [isGeneratingIdeas, setIsGeneratingIdeas] = useState(false);
  const [isGeneratingPost, setIsGeneratingPost] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [customTopic, setCustomTopic] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");
  const [activePreview, setActivePreview] = useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");
  const [isExpanded, setIsExpanded] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [customContent, setCustomContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showSaved, setShowSaved] = useState(false);
  const [currentDraftId, setCurrentDraftId] = useState<string | null>(
    post?.id || null
  );
  const [topicSearch, setTopicSearch] = useState("");
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [postTopics, setPostTopics] = useState<string[]>([]);
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(
    undefined
  );
  const [isScheduling, setIsScheduling] = useState(false);
  const [hasContentChanged, setHasContentChanged] = useState(false);
  const initialContent = useRef<string>("");
  const [isSaving, setIsSaving] = useState(false);

  const previewWidth = {
    desktop: "w-full",
    tablet: "w-[768px]",
    mobile: "w-[380px]",
  };

  const queryClient = useQueryClient();

  useEffect(() => {
    if (post) {
      setContent(post.content);
      setCurrentDraftId(post.id);
      initialContent.current = post.content;
      setHasContentChanged(false);
    }
  }, [post]);

  const handleGenerateIdeas = async () => {
    if (!selectedTopic) return;

    setIsGeneratingIdeas(true);
    try {
      const response = await fetch("/api/generate/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: selectedTopic }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate ideas");
      }

      const data = await response.json();
      setGeneratedIdeas(data.ideas);
    } catch (error) {
      console.error("Failed to generate ideas:", error);
      toast.error("Failed to generate ideas");
    } finally {
      setIsGeneratingIdeas(false);
    }
  };

  const handleGeneratePost = async () => {
    if (!selectedTopic || !selectedIdea) {
      toast.error("Please select both a topic and an idea");
      return;
    }

    setIsGeneratingPost(true);
    try {
      const response = await fetch("/api/generate/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: selectedTopic,
          idea: selectedIdea,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.details || data.error || "Failed to generate post"
        );
      }

      setContent(data.content);
      setPostTopics(data.topics);
      toast.success("Post content generated successfully!");
    } catch (error: any) {
      console.error("Failed to generate post:", error);
      toast.error(error.message || "Failed to generate post content");

      // Reset states if needed
      if (error.message?.includes("AI generation failed")) {
        // Handle AI-specific errors
        toast.error(
          "AI service is temporarily unavailable. Please try again later."
        );
      }
    } finally {
      setIsGeneratingPost(false);
    }
  };

  const handleCopyContent = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopySuccess(true);
      toast.success("Content copied to clipboard");
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error("Failed to copy content:", error);
      toast.error("Failed to copy content");
    }
  };

  const handleGenerateFromCustom = async () => {
    if (!customContent.trim()) return;

    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: "Custom",
          idea: customContent,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate content");
      }

      const data = await response.json();
      setContent(data.content);
      setPostTopics(data.topics);
      toast.success("Post content generated successfully!");
    } catch (error) {
      console.error("Failed to generate content:", error);
      toast.error("Failed to generate content");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setUploadedImages((prev) => [...prev, ...newImages]);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const removeImage = (indexToRemove: number) => {
    setUploadedImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSaveAsDraft = async () => {
    setIsScheduling(true);
    try {
      const endpoint = currentDraftId
        ? `/api/posts/${currentDraftId}`
        : "/api/posts";
      const method = currentDraftId ? "PUT" : "POST";

      console.log("Saving draft with topics:", postTopics);

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          status: "draft",
          images: uploadedImages,
          visibility: "anyone",
          topics: postTopics,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save draft");
      }

      const savedPost = await response.json();
      setCurrentDraftId(savedPost.id);
      queryClient.invalidateQueries({ queryKey: ["posts"] });

      // Just set saved status without timeout
      setShowSaved(true);
    } catch (error) {
      console.error("Error auto-saving:", error);
      toast.error("Failed to save draft");
    } finally {
      setIsScheduling(false);
    }
  };

  const handleOpenDialog = () => {
    // Reset all states to initial values
    setContent("");
    setCurrentDraftId(null);
    setSelectedTopic("");
    setGeneratedIdeas([]);
    setSelectedIdea("");
    setUploadedImages([]);
    setPostTopics([]);
    setCustomContent("");
    setIsExpanded(false);
    setShowPreview(false);
    setPreviewDevice("desktop");
    setTopicSearch("");
    // Reset form values including scheduledDate
    form.reset({
      scheduledDate: undefined,
    });
  };

  const handleCloseDialog = () => {
    onClose?.();
    setContent("");
    setCurrentDraftId(null);
  };

  const filteredTopics = availableTopics.filter((topic) =>
    topic.toLowerCase().includes(topicSearch.toLowerCase())
  );

  const handleGenerateImage = async () => {
    if (!selectedTopic || !selectedIdea) {
      toast.error("Please select both a topic and an idea first");
      return;
    }

    setIsGeneratingImage(true);
    try {
      const response = await fetch("/api/generate/image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: selectedTopic,
          idea: selectedIdea,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.details || data.error || "Failed to generate image"
        );
      }

      // Add the generated image to uploadedImages
      setUploadedImages((prev) => [...prev, data.imageUrl]);
      toast.success("Image generated successfully!");
    } catch (error: any) {
      console.error("Failed to generate image:", error);
      toast.error(error.message || "Failed to generate image");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handlePublish = async () => {
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          status: "published",
          images: uploadedImages,
          visibility: "anyone",
          topics: postTopics,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to publish post");
      }

      // Invalidate and refetch posts
      queryClient.invalidateQueries({ queryKey: ["posts"] });

      toast.success("Post published successfully");
      onOpenChange?.(false); // Close dialog after publishing
    } catch (error) {
      console.error("Error publishing post:", error);
      toast.error("Failed to publish post");
    }
  };

  const handleSchedulePost = async (date: Date) => {
    setIsScheduling(true);
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          status: "scheduled",
          scheduledFor: date.toISOString(),
          images: uploadedImages,
          visibility: "anyone",
          topics: postTopics,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to schedule post");
      }

      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post scheduled successfully");
    } catch (error) {
      console.error("Error scheduling post:", error);
      toast.error("Failed to schedule post");
      form.reset({ scheduledDate: undefined });
    } finally {
      setIsScheduling(false);
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      scheduledDate: undefined,
    },
  });

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setHasContentChanged(e.target.value !== initialContent.current);
  };

  useEffect(() => {
    const autoSave = async () => {
      if (!hasContentChanged) return;
      if (!content && uploadedImages.length === 0) return;

      setIsSaving(true);
      try {
        const endpoint = currentDraftId
          ? `/api/posts/${currentDraftId}`
          : "/api/posts";
        const method = currentDraftId ? "PUT" : "POST";

        const response = await fetch(endpoint, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content,
            status: "draft",
            images: uploadedImages,
            visibility: "anyone",
            topics: postTopics,
          }),
        });

        if (!response.ok) throw new Error("Failed to save draft");

        const savedPost = await response.json();
        setCurrentDraftId(savedPost.id);
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        setShowSaved(true);
      } catch (error) {
        console.error("Error auto-saving:", error);
        toast.error("Failed to save draft");
      } finally {
        setIsSaving(false);
      }
    };

    const timeoutId = setTimeout(autoSave, 1000);
    return () => clearTimeout(timeoutId);
  }, [content, uploadedImages, postTopics, hasContentChanged]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          onClick={handleOpenDialog}
          className="bg-black text-white hover:bg-black/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Post
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[80vh] p-0 flex flex-col">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>{post ? "Edit Post" : "Create New Post"}</DialogTitle>
          <DialogDescription>
            {post
              ? "Edit and update your post."
              : "Create and share your post with your network."}
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable main content */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex gap-6 py-2 px-6">
            {/* Left side - Editor */}
            <div className="flex-1 min-w-[45%]">
              <Tabs defaultValue="default" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-white border rounded-lg p-0">
                  <TabsTrigger
                    value="default"
                    className="px-6 rounded-md data-[state=active]:bg-secondary/80 data-[state=active]:border-primary/70 data-[state=active]:font-semibold data-[state=active]:border data-[state=active]:text-primary"
                  >
                    <Hash className="h-4 w-4 mr-2" />
                    Topics
                  </TabsTrigger>
                  <TabsTrigger
                    value="custom"
                    className="px-6 rounded-md data-[state=active]:bg-secondary/80 data-[state=active]:border-primary/70 data-[state=active]:font-semibold data-[state=active]:border data-[state=active]:text-primary"
                  >
                    <FileUser className="h-4 w-4 mr-2" />
                    Custom Topics
                  </TabsTrigger>
                </TabsList>

                {/* Description based on active tab */}
                <div className="mt-4 text-sm text-muted-foreground">
                  <TabsContent value="default">
                    <p>Select a topic to generate ideas for your post.</p>
                  </TabsContent>
                  <TabsContent value="custom">
                    <p>Create a custom topic to tailor your post content.</p>
                  </TabsContent>
                </div>

                <TabsContent value="default" className="space-y-6 pt-2">
                  {/* Step 1: Topic Selection */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium flex items-center">
                      1. Choose a Topic
                      <CircleHelp className="ml-2 h-4 w-4 text-muted-foreground" />
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Select a topic that resonates with your audience and
                      expertise
                    </p>
                    <div className="flex gap-2">
                      <Select
                        value={selectedTopic}
                        onValueChange={setSelectedTopic}
                      >
                        <SelectTrigger className="w-[415px]">
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent>
                          <div className="p-2">
                            <Input
                              placeholder="Search topics..."
                              value={topicSearch}
                              onChange={(e) => setTopicSearch(e.target.value)}
                              className="mb-2"
                            />
                          </div>
                          {filteredTopics.length > 0 ? (
                            filteredTopics.map((topic) => (
                              <SelectItem
                                key={topic}
                                value={topic}
                                className="whitespace-normal py-3 min-h-[2.5rem] flex items-start"
                              >
                                {topic}
                              </SelectItem>
                            ))
                          ) : (
                            <div className="py-6 text-center text-sm text-muted-foreground">
                              No topics found
                            </div>
                          )}
                        </SelectContent>
                      </Select>
                      <Button
                        onClick={handleGenerateIdeas}
                        disabled={!selectedTopic || isGeneratingIdeas}
                        className="w-[180px] bg-black text-white hover:bg-black/90"
                      >
                        {isGeneratingIdeas ? (
                          <>
                            <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Wand2 className="h-4 w-4 mr-2" />
                            Generate Ideas
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Step 2: Idea Selection */}
                  {generatedIdeas.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium flex items-center">
                        2. Choose an Idea
                        <CircleHelp className="ml-2 h-4 w-4 text-muted-foreground" />
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Pick an AI-generated idea to create engaging content for
                        your post
                      </p>
                      <div className="flex gap-2">
                        <Select
                          value={selectedIdea}
                          onValueChange={setSelectedIdea}
                        >
                          <SelectTrigger className="w-[415px]">
                            <SelectValue placeholder="Select an idea" />
                          </SelectTrigger>
                          <SelectContent>
                            {generatedIdeas.map((idea) => (
                              <SelectItem
                                key={idea}
                                value={idea}
                                className="whitespace-pre-line py-3 cursor-pointer"
                              >
                                {idea}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          onClick={handleGeneratePost}
                          disabled={!selectedIdea || isGeneratingPost}
                          className="w-[180px] bg-black text-white hover:bg-black/90"
                        >
                          {isGeneratingPost ? (
                            <>
                              <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                              <span className="animate-pulse">
                                Generating...
                              </span>
                            </>
                          ) : (
                            <>
                              <Wand2 className="h-4 w-4 mr-2" />
                              Generate Post
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </TabsContent>

                {/* Custom Topics Tab Content */}
                <TabsContent value="custom" className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2 flex items-center">
                        Your Topic
                        <CircleHelp className="ml-2 h-4 w-4 text-muted-foreground" />
                      </h3>
                      <Textarea
                        value={customContent}
                        onChange={(e) => setCustomContent(e.target.value)}
                        className="w-full min-h-[50px] p-3 rounded-md border"
                        placeholder="Enter your topic or ideas here...Ex (How Generative AI is Redefining Customer Experience in E-commerce)"
                      />
                    </div>

                    <Button
                      onClick={handleGenerateFromCustom}
                      disabled={!customContent.trim() || isGenerating}
                      className="w-full bg-black text-white hover:bg-black/90"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 className="mr-2 h-4 w-4" />
                          Generate Post Content
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Add separator and spacing */}
              <div className="my-4">
                {/* Content Area with Action Icons */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium flex items-center">
                    Content
                    <CircleHelp className="ml-2 h-4 w-4 text-muted-foreground" />
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Review and customize your post content
                  </p>

                  {/* Hidden file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                    multiple
                  />

                  {/* Uploaded Images Preview */}
                  {uploadedImages.length > 0 && (
                    <div className="mb-4">
                      <div className="grid grid-cols-4 gap-2 max-h-[120px]">
                        {uploadedImages.map((image, index) => (
                          <div
                            key={index}
                            className="relative group aspect-square h-[120px]"
                          >
                            <img
                              src={image}
                              alt={`Uploaded ${index + 1}`}
                              className="w-full h-full object-cover rounded-md"
                            />
                            <button
                              onClick={() => removeImage(index)}
                              className="absolute -top-1 -right-1 p-1 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Textarea
                    placeholder="Write your post content..."
                    value={content}
                    onChange={handleContentChange}
                    className="min-h-[200px] resize-none whitespace-pre-wrap font-[inherit]"
                  />

                  {/* Action Icons moved below textarea */}
                  <div className="flex items-center justify-between pt-2 mt-2">
                    <div className="flex items-center gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleImageClick}
                              disabled={isScheduling || !content}
                              className="h-8 w-8 p-0"
                            >
                              <ImagePlus className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Upload image from device</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleGenerateImage}
                              disabled={
                                isGeneratingImage || isScheduling || !content
                              }
                              className={cn(
                                "h-8 flex items-center gap-2",
                                "bg-gradient-to-r from-blue-400 to-indigo-400",
                                "hover:from-blue-500 hover:to-indigo-600",
                                "text-white border-[#86efac]",
                                "transition-all duration-300"
                              )}
                            >
                              {isGeneratingImage ? (
                                <>
                                  <Sparkles className="h-4 w-4 animate-spin" />
                                  <span className="animate-pulse">
                                    Generating...
                                  </span>
                                </>
                              ) : (
                                <>
                                  <Wand2 className="h-4 w-4" />
                                  <span>Generate AI Image</span>
                                </>
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Generate image using AI</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    <div className="flex items-center gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={handleCopyContent}
                              disabled={isScheduling || !content}
                            >
                              <Copy
                                className={cn(
                                  "h-4 w-4",
                                  copySuccess
                                    ? "text-green-500"
                                    : "text-muted-foreground"
                                )}
                              />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{copySuccess ? "Copied!" : "Copy content"}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>

                  {/* Display topics */}
                  {postTopics.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <h3 className="text-sm font-medium"># HashTags</h3>
                      <div className="flex flex-wrap gap-2">
                        {postTopics.map((topic, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs py-1 px-3 font-medium"
                          >
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right side - Preview with enhanced styling */}
            <div className="flex-1 min-w-0 max-w-[45%]">
              <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 shadow-sm p-4">
                <div className="rounded-sm border bg-card text-card-foreground">
                  <div className="border-b p-2 relative bg-white overflow-x-auto">
                    <div className="flex items-center justify-between px-2">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Mobile preview
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="overflow-x-auto p-4 bg-slate-50 h-[550px] overflow-y-auto">
                    <div className="w-[380px] mx-auto bg-background transition-all duration-200">
                      <div className="rounded-lg border bg-card shadow-sm">
                        {/* Post Header */}
                        <div className="p-4 border-b">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src="https://github.com/shadcn.png" />
                              <AvatarFallback>LW</AvatarFallback>
                            </Avatar>
                            <div className="text-sm">
                              <div className="font-semibold text-sm">
                                Luke Winter
                                <span className="text-gray-500 text-sm font-normal">
                                  {" "}
                                  • 3rd+
                                </span>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Growing the best brands with engaging video
                              </div>
                              <div className="text-sm text-muted-foreground">
                                2d
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Post Content with Image */}
                        <div className="prose prose-sm max-w-none text-sm pb-4">
                          {content || uploadedImages.length > 0 ? (
                            <div className="space-y-2">
                              <div className="whitespace-pre-wrap px-4 pt-4">
                                {isExpanded
                                  ? content
                                  : content.split("\n").slice(0, 3).join("\n")}
                                {!isExpanded &&
                                  content.split("\n").length > 2 && (
                                    <button
                                      onClick={() => setIsExpanded(true)}
                                      className="text-primary hover:text-orange-5r/90 inline-block ml-1"
                                    >
                                      ...more
                                    </button>
                                  )}
                              </div>
                              {uploadedImages.length > 0 && (
                                <div className="mt-4 grid gap-2">
                                  {uploadedImages.map((image, index) => (
                                    <img
                                      key={index}
                                      src={image}
                                      alt={`Post image ${index + 1}`}
                                      className="object-cover w-full"
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="text-muted-foreground text-center py-8">
                              Your post preview will appear here
                            </div>
                          )}
                        </div>

                        {/* Post Footer */}
                        <div className="p-4 border-t flex items-center justify-between gap-4 text-sm text-muted-foreground">
                          <button className="flex items-center gap-1.5 hover:text-blue-500 transition-colors group">
                            <div className="flex -space-x-1">
                              <div className="w-4 h-4 transition-transform group-hover:scale-110">
                                <ThumbsUpIcon />
                              </div>
                              <div className="w-4 h-4 transition-transform group-hover:scale-110">
                                <HeartIcon />
                              </div>
                              <div className="w-4 h-4 transition-transform group-hover:scale-110">
                                <LikeIcon />
                              </div>
                            </div>
                            <span>166</span>
                          </button>
                          <div className="flex items-center">
                            <div className="flex items-center gap-1 mr-2">
                              <span>12 comments</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span>2 reposts</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed footer */}
        <div className="mt-auto border-t bg-muted/30">
          <div className="p-6 flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => {
                onOpenChange?.(false);
                handleCloseDialog();
              }}
            >
              Cancel
            </Button>
            <div className="flex items-center gap-4">
              {isSaving ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving Post...
                </div>
              ) : showSaved ? (
                <div className="flex items-center gap-2 text-sm text-green-600 border border-green-200 bg-green-50 px-3 py-1.5 rounded-md">
                  <CheckCircle2 className="h-4 w-4" />
                  Post Saved
                </div>
              ) : null}

              <Form {...form}>
                <FormField
                  control={form.control}
                  name="scheduledDate"
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "max-w-[250px] pl-3 text-left font-normal relative group",
                              !field.value && "text-muted-foreground",
                              field.value &&
                                "bg-blue-50 border-blue-200 text-blue-700",
                              isScheduling && "opacity-70"
                            )}
                            disabled={
                              (!content && uploadedImages.length === 0) ||
                              isScheduling
                            }
                          >
                            {field.value ? (
                              <div className="flex items-center gap-2">
                                <CalendarClock className="h-4 w-4 text-blue-500" />
                                <span>
                                  Scheduled for{" "}
                                  <span className="font-semibold">
                                    {format(field.value, "MMM d, yyyy")}
                                  </span>
                                </span>
                                <X
                                  className="h-4 w-4 ml-auto transition-opacity cursor-pointer text-blue-600 hover:text-blue-700"
                                  onClick={async (e) => {
                                    e.stopPropagation();
                                    setIsScheduling(true);
                                    try {
                                      const response = await fetch(
                                        "/api/posts",
                                        {
                                          method: "POST",
                                          headers: {
                                            "Content-Type": "application/json",
                                          },
                                          body: JSON.stringify({
                                            content,
                                            status: "draft",
                                            images: uploadedImages,
                                            visibility: "anyone",
                                            topics: postTopics,
                                          }),
                                        }
                                      );

                                      if (!response.ok)
                                        throw new Error(
                                          "Failed to save as draft"
                                        );

                                      queryClient.invalidateQueries({
                                        queryKey: ["posts"],
                                      });
                                      field.onChange(undefined);
                                      toast.success("Post saved as draft");
                                    } catch (error) {
                                      console.error(
                                        "Error saving draft:",
                                        error
                                      );
                                      toast.error("Failed to save as draft");
                                    } finally {
                                      setIsScheduling(false);
                                    }
                                  }}
                                />
                              </div>
                            ) : isScheduling ? (
                              <span className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                                <span>Scheduling...</span>
                              </span>
                            ) : (
                              <span className="flex items-center gap-2">
                                <CalendarClock className="h-4 w-4" />
                                Schedule Post
                              </span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="end">
                        <CalendarComponent
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            if (date) {
                              field.onChange(date);
                              handleSchedulePost(date);
                            }
                          }}
                          disabled={(date: Date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
              </Form>

              <Button
                disabled={
                  (!content && uploadedImages.length === 0) || isScheduling
                }
                onClick={handlePublish}
              >
                <Send className="h-4 w-4 mr-2" />
                Publish Post
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
