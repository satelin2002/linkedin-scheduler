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
  Calendar,
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
import { useState, useRef } from "react";
import { mockIdeas, availableTopics } from "@/lib/mock";
import { cn } from "@/lib/utils";
import LikeIcon from "./ui/like";
import HeartIcon from "./ui/hearts";
import ThumbsUpIcon from "./ui/thumbs-up";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

export function CreatePostDialog() {
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [generatedIdeas, setGeneratedIdeas] = useState<string[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<string>("");
  const [content, setContent] = useState<string>("");
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

  const previewWidth = {
    desktop: "w-full",
    tablet: "w-[768px]",
    mobile: "w-[380px]",
  };

  const handleGenerateIdeas = () => {
    setIsGeneratingIdeas(true);
    // Simulate API call
    setTimeout(() => {
      setGeneratedIdeas([
        `How to excel in ${selectedTopic}`,
        `Top 10 trends in ${selectedTopic}`,
        `The future of ${selectedTopic}`,
        `Why ${selectedTopic} matters in 2024`,
        `Essential ${selectedTopic} strategies`,
      ]);
      setIsGeneratingIdeas(false);
    }, 1000);
  };

  const handleGeneratePost = () => {
    setIsGeneratingPost(true);
    // Simulate API call
    setTimeout(() => {
      setContent(
        `# ${selectedIdea}\n\nHere's an engaging post about ${selectedIdea} in the context of ${selectedTopic}...\n\n🔑 Key Points:\n- Point 1\n- Point 2\n- Point 3\n\n💡 Pro Tip: Consider these factors when thinking about ${selectedTopic}...`
      );
      setIsGeneratingPost(false);
    }, 1500);
  };

  const handleCopyContent = async () => {
    await navigator.clipboard.writeText(content);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleGenerateFromCustom = async () => {
    if (!customContent.trim()) return;

    setIsGenerating(true);
    // Simulate API call for content generation
    try {
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setContent(
        `Based on your input: "${customContent}"\n\n🎯 Key Points:\n• Point 1\n• Point 2\n• Point 3\n\n💡 Insights:\nYour custom content generated insights here...\n\n#CustomContent #Insights`
      );
    } catch (error) {
      console.error("Failed to generate content:", error);
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
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          status: "draft",
          images: uploadedImages,
          visibility: "anyone", // default visibility
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save draft");
      }

      const savedPost = await response.json();
      toast.success("Post saved as draft");

      // Close the dialog
      document.getElementById("close-dialog")?.click();
    } catch (error) {
      console.error("Error saving draft:", error);
      toast.error("Failed to save draft");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Post
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[76vh] p-0 flex flex-col">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>Create New Post</DialogTitle>
          <DialogDescription>
            Create and share your post with your network.
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
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableTopics.map((topic) => (
                            <SelectItem key={topic} value={topic}>
                              {topic}
                            </SelectItem>
                          ))}
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
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select an idea" />
                          </SelectTrigger>
                          <SelectContent>
                            {generatedIdeas.map((idea) => (
                              <SelectItem key={idea} value={idea}>
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
                              Generating...
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
                        placeholder="Enter your topic or ideas here..."
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

              {/* Content Area with Action Icons */}
              <div className="space-y-2 mt-4">
                <h3 className="text-sm font-medium flex items-center">
                  Content
                  <CircleHelp className="ml-2 h-4 w-4 text-muted-foreground" />
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Review and customize your post content before publishing
                  </p>

                  <div className="flex items-center gap-2">
                    {/* Hidden file input */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="hidden"
                      multiple
                    />

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={handleImageClick}
                          >
                            <ImagePlus className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Upload image</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
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
                            className="h-8 w-8 p-0"
                            onClick={handleCopyContent}
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

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Save className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Save as draft</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                {/* Uploaded Images Preview */}
                {uploadedImages.length > 0 && (
                  <div className="mb-4">
                    <div className="grid grid-cols-4 gap-4">
                      {uploadedImages.map((image, index) => (
                        <div
                          key={index}
                          className="relative group aspect-square"
                        >
                          <img
                            src={image}
                            alt={`Uploaded ${index + 1}`}
                            className="w-full h-full object-cover rounded-md"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full min-h-[270px] p-3 rounded-md border"
                  placeholder="Write your post content..."
                />
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
                                      className="text-primary hover:text-primary/90 inline-block ml-1"
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
              onClick={() => document.getElementById("close-dialog")?.click()}
            >
              Cancel
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleSaveAsDraft}
                disabled={!content && uploadedImages.length === 0}
              >
                <Save className="h-4 w-4 mr-2" />
                Save as Draft
              </Button>
              <Button>
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
