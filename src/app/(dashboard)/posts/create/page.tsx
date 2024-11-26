"use client";

import { useState, useCallback } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import HeartIcon from "@/components/ui/hearts";
import LikeIcon from "@/components/ui/like";
import ThumbsUpIcon from "@/components/ui/thumbs-up";
import { Separator } from "@/components/ui/separator";
import { Send, Save, Plus, X, ImagePlus } from "lucide-react";
import { Input } from "@/components/ui/input";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Copy,
  Lightbulb,
  RefreshCw,
  Trash2,
  Eye,
  Wand2,
  Monitor,
  Smartphone,
  Tablet,
  RotateCw,
  Hash,
  Sparkles,
  PenLine,
  Bookmark,
  Check,
  Eraser,
} from "lucide-react";
import {
  TypographyH4,
  TypographyH3,
  TypographyMuted,
} from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { availableTopics, mockIdeas } from "@/lib/mock";
import { ImageUpload } from "@/components/posts/image-upload";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
export default function CreatePostPage() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [generatedIdeas, setGeneratedIdeas] = useState<string[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<string>("");
  const [content, setContent] = useState("");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activePreview, setActivePreview] = useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");
  const [isExpanded, setIsExpanded] = useState(false);
  const [customTopic, setCustomTopic] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("topics");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"predefined" | "custom">(
    "predefined"
  );

  const handleTopicSelect = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleAddCustomTopic = () => {
    if (customTopic.trim() && !selectedTopics.includes(customTopic.trim())) {
      handleTopicSelect(customTopic.trim());
      setCustomTopic("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddCustomTopic();
    }
  };

  const handleGenerateIdeas = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedIdeas(mockIdeas);
      setIsGenerating(false);
      setActiveSection("ideas");
    }, 1000);
  };

  const handleGeneratePost = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setContent(
        `# ${selectedIdea}\n\n🎯 Here's a generated post about ${selectedIdea}...`
      );
      setIsGenerating(false);
      setActiveSection("content");
    }, 1500);
  };

  // Handle copy to clipboard
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }, [content]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImages((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Add gradient background */}
        <div className="relative min-h-screen w-full overflow-hidden">
          <div className="absolute inset-0  mix-blend-overlay" />
          <div className="absolute inset-0  mix-blend-multiply" />

          {/* Existing content wrapped in relative container */}
          <div className="relative z-10">
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
                        <BreadcrumbPage>Create New Post</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </div>
            </header>

            <div className="px-4 pb-4">
              <TypographyMuted className="mt-4">
                Fill in the details below to create your post. Use AI to help
                generate content or write your own.
              </TypographyMuted>
            </div>

            <div className="flex flex-col lg:flex-row flex-1 gap-6 p-4 pt-0">
              {/* Left Column - Topics and Ideas */}
              <div className="w-full lg:w-[500px] space-y-6">
                {/* Topics Section */}
                <div className="rounded-lg border bg-card text-card-foreground p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Hash className="h-5 w-5 text-primary" />
                      <TypographyH4>Select Topics</TypographyH4>
                    </div>
                    <div className="text-sm text-muted-foreground mb-4">
                      Choose from our default topics or create your own custom
                      topic to categorize your post
                    </div>

                    <Tabs defaultValue="predefined" className="w-full">
                      <TabsList className="mb-2">
                        <TabsTrigger value="predefined">
                          <Hash className="h-4 w-4 mr-2" />
                          Default Topics
                        </TabsTrigger>
                        <TabsTrigger value="custom">
                          <PenLine className="h-4 w-4 mr-2" />
                          Custom Topic
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent
                        value="predefined"
                        className="data-[state=active]:animate-in data-[state=active]:fade-in-50 data-[state=active]:slide-in-from-bottom-3"
                      >
                        <div className="space-y-4">
                          <div className="text-sm text-muted-foreground mb-4">
                            Select a topic to generate post ideas based on your
                            interests.
                          </div>
                          <Select
                            onValueChange={(value) => handleTopicSelect(value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Choose a topic" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableTopics.map((topic) => (
                                <SelectItem key={topic} value={topic}>
                                  {topic}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          {selectedTopics.length > 0 && (
                            <Button
                              onClick={handleGenerateIdeas}
                              className="w-full"
                              disabled={isGenerating}
                            >
                              {isGenerating ? (
                                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                              ) : (
                                <Wand2 className="h-4 w-4 mr-2" />
                              )}
                              Generate Ideas
                            </Button>
                          )}
                        </div>

                        {/* Generated Ideas Section - Hide completely when Custom tab is selected */}
                        {activeTab !== "custom" &&
                          generatedIdeas.length > 0 && (
                            <div className="space-y-4 mt-6">
                              <div className="flex items-center gap-2 mb-6">
                                <Sparkles className="h-5 w-5 text-primary" />
                                <TypographyH4>Generated Ideas</TypographyH4>
                              </div>
                              <div className="text-sm text-muted-foreground mb-4">
                                Here are some AI-generated post ideas based on
                                your selected topics. Click on any idea to
                                select it, then generate a complete post.
                              </div>

                              {/* Ideas List */}
                              <div className="space-y-3">
                                {generatedIdeas.map((idea) => (
                                  <div
                                    key={idea}
                                    onClick={() => setSelectedIdea(idea)}
                                    className={cn(
                                      "p-2 rounded-lg border-2 cursor-pointer transition-all",
                                      "text-sm flex items-center gap-3",
                                      selectedIdea === idea
                                        ? "bg-primary/10 border-primary text-primary"
                                        : "hover:bg-primary/5 hover:border-primary/50 border-border"
                                    )}
                                  >
                                    <Lightbulb
                                      className={cn(
                                        "h-4 w-4 flex-shrink-0",
                                        selectedIdea === idea
                                          ? "text-primary"
                                          : "text-muted-foreground"
                                      )}
                                    />
                                    <span className="flex-1">{idea}</span>
                                    {selectedIdea === idea && (
                                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                                    )}
                                  </div>
                                ))}
                              </div>

                              {/* Generate Post Button - Only show when idea is selected */}
                              {selectedIdea && (
                                <Button
                                  onClick={handleGeneratePost}
                                  className="w-full mt-4"
                                  disabled={isGenerating}
                                >
                                  {isGenerating ? (
                                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                  ) : (
                                    <PenLine className="h-4 w-4 mr-2" />
                                  )}
                                  Generate Post
                                </Button>
                              )}
                            </div>
                          )}
                      </TabsContent>

                      <TabsContent
                        value="custom"
                        className="data-[state=active]:animate-in data-[state=active]:fade-in-50 data-[state=active]:slide-in-from-bottom-3"
                      >
                        <div className="space-y-4">
                          <div className="text-sm text-muted-foreground mb-4">
                            Enter a custom topic to generate post ideas based on
                            your interests.
                          </div>
                          <Textarea
                            value={customTopic}
                            onChange={(e) => setCustomTopic(e.target.value)}
                            placeholder="e.g. 'AI in marketing'"
                            className="min-h-[100px] resize-none"
                          />
                          <Button
                            onClick={handleGeneratePost}
                            className="w-full"
                            disabled={!customTopic.trim()}
                          >
                            <Wand2 className="h-4 w-4 mr-2" />
                            Generate Post
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>

              {/* Right Column - Content and Preview */}
              <div className="flex-1 min-w-0">
                {/* Content Section */}
                <div
                  className={cn(
                    "rounded-lg border bg-card text-card-foreground p-6",
                    isPreviewMode ? "hidden" : "block"
                  )}
                >
                  <div className="space-y-4">
                    {/* Content Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <PenLine className="h-5 w-5 text-primary" />
                        <TypographyH4>Content</TypographyH4>
                      </div>
                      <div className="flex items-center gap-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <Save className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-black text-white border-black">
                              <span className="text-xs">Save draft</span>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsPreviewMode(true)}
                                className="h-8 w-8 p-0"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-black text-white border-black">
                              <span className="text-xs">Preview post</span>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleCopy()}
                                className="h-8 w-8 p-0"
                              >
                                {copySuccess ? (
                                  <Check className="h-4 w-4" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-black text-white border-black">
                              <span className="text-xs">Copy content</span>
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
                                <Calendar className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-black text-white border-black">
                              <span className="text-xs">Schedule post</span>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setContent("");
                                  setUploadedImages([]);
                                }}
                                className="h-8 w-8 p-0"
                              >
                                <Eraser className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-black text-white border-black">
                              <span className="text-xs">Clear all content</span>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>

                    {/* Content Editor */}
                    <div className="space-y-4">
                      {/* Uploaded Images Display */}
                      {uploadedImages.length > 0 && (
                        <div className="flex flex-wrap gap-2 pb-4">
                          {uploadedImages.map((image, index) => (
                            <div key={index} className="relative group">
                              <Image
                                src={image}
                                alt={`Uploaded image ${index + 1}`}
                                width={80}
                                height={80}
                                className="rounded-md object-cover"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute -top-2 -right-2 h-6 w-6 bg-background opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeImage(index)}
                              >
                                <X className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Text Area */}
                      <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your post content here..."
                        className="min-h-[300px]"
                      />

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-14 w-14 rounded-full hover:bg-muted border-muted border-2"
                                  onClick={() =>
                                    document
                                      .getElementById("image-upload")
                                      ?.click()
                                  }
                                >
                                  <ImagePlus className="h-5 w-5" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent
                                side="top"
                                className="bg-black text-white border-black"
                              >
                                <p>Add image to post</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                            <Send className="mr-2 h-4 w-4" />
                            Publish Post
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preview Section */}
                <div
                  className={cn(
                    "rounded-lg border bg-card text-card-foreground",
                    isPreviewMode ? "block" : "hidden"
                  )}
                >
                  <div className="border-b p-2 relative bg-white overflow-x-auto">
                    <div className="flex items-center justify-between px-2">
                      <div className="flex gap-1 overflow-x-auto">
                        <Button
                          variant={
                            activePreview === "desktop" ? "secondary" : "ghost"
                          }
                          size="sm"
                          onClick={() => setActivePreview("desktop")}
                          className="h-8 w-8 p-0 flex-shrink-0"
                        >
                          <Monitor className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={
                            activePreview === "tablet" ? "secondary" : "ghost"
                          }
                          size="sm"
                          onClick={() => setActivePreview("tablet")}
                          className="h-8 w-8 p-0 flex-shrink-0"
                        >
                          <Tablet className="h-4 w-4" />
                        </Button>
                        <Button
                          variant={
                            activePreview === "mobile" ? "secondary" : "ghost"
                          }
                          size="sm"
                          onClick={() => setActivePreview("mobile")}
                          className="h-8 w-8 p-0 flex-shrink-0"
                        >
                          <Smartphone className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsPreviewMode(false)}
                        className="h-8 w-8 p-0"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="overflow-x-auto p-4 bg-slate-50">
                    <div
                      className={cn(
                        "mx-auto bg-background transition-all duration-200 overflow-auto",
                        {
                          "min-w-[555px] w-[555px]":
                            activePreview === "desktop",
                          "min-w-[471px] w-[471px]": activePreview === "tablet",
                          "min-w-[409px] w-[409px]": activePreview === "mobile",
                        }
                      )}
                    >
                      <div className="rounded-lg border bg-card shadow-sm">
                        {/* Post Header */}
                        <div className="p-4 border-b">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src="https://github.com/shadcn.png" />
                              <AvatarFallback>CN</AvatarFallback>
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
                        <div className="p-4 prose prose-sm max-w-none text-sm">
                          {content ? (
                            <div className="space-y-4">
                              <div className="whitespace-pre-wrap">
                                {isExpanded
                                  ? content
                                  : content.split("\n").slice(0, 2).join("\n")}
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
                                    <Image
                                      key={index}
                                      src={image}
                                      alt={`Post image ${index + 1}`}
                                      width={500}
                                      height={300}
                                      className="rounded-lg object-cover w-full"
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
      </SidebarInset>
    </SidebarProvider>
  );
}
