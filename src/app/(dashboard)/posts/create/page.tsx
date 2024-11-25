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
            <header className="flex h-16 shrink-0 items-center gap-2">
              <div className="flex items-center justify-between w-full gap-2 px-4">
                <div className="flex items-center gap-2">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <TypographyH3>Create Posts</TypographyH3>
                </div>
              </div>
            </header>

            <div className="px-4 pb-4">
              <TypographyMuted className="mt-1">
                Fill in the details below to create your post. Use AI to help
                generate content or write your own.
              </TypographyMuted>
            </div>

            <div className="flex flex-1 gap-4 p-4 pt-0">
              <div className="flex-1 max-w-4xl space-y-6">
                {/* Topics Section */}
                <div className="rounded-lg border bg-card text-card-foreground p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-6">
                      <Hash className="h-5 w-5 text-primary" />
                      <TypographyH4>Select Topics</TypographyH4>
                    </div>

                    {/* Topics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
                      {availableTopics.map((topic) => (
                        <button
                          key={topic}
                          onClick={() => handleTopicSelect(topic)}
                          className={cn(
                            "flex items-center gap-2 p-3 rounded-lg border-2 transition-all hover:shadow-sm",
                            "text-sm font-medium",
                            selectedTopics.includes(topic)
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border hover:border-primary/50 hover:bg-primary/5"
                          )}
                        >
                          <span className="truncate">{topic}</span>
                          {selectedTopics.includes(topic) && (
                            <Check className="h-4 w-4 text-primary flex-shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Custom Topic Input */}
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">
                        Add custom topic
                      </label>
                      <div className="flex gap-2">
                        <Input
                          value={customTopic}
                          onChange={(e) => setCustomTopic(e.target.value)}
                          onKeyDown={handleKeyPress}
                          placeholder="Enter custom topic..."
                          className="flex-1"
                        />
                        <Button
                          variant="outline"
                          size="default"
                          onClick={handleAddCustomTopic}
                          disabled={!customTopic.trim()}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Topic
                        </Button>
                      </div>
                    </div>

                    {/* Selected Topics and Generate Ideas Button */}
                    {selectedTopics.length > 0 && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm text-muted-foreground">
                            Selected topics
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {selectedTopics.map((topic) => (
                              <Badge
                                key={topic}
                                variant="default"
                                className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer px-3 py-1.5"
                                onClick={() => handleTopicSelect(topic)}
                              >
                                {topic}
                                <X className="h-3 w-3 ml-2" />
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Generate Ideas Button */}
                        <div className="flex justify-end pt-2">
                          <Button
                            onClick={handleGenerateIdeas}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground"
                            disabled={isGenerating}
                          >
                            {isGenerating ? (
                              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <Wand2 className="h-4 w-4 mr-2" />
                            )}
                            Generate Ideas
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Generated Ideas Section - Only shown when ideas exist */}
                {generatedIdeas.length > 0 && (
                  <div className="rounded-lg border bg-card text-card-foreground p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-6">
                        <Sparkles className="h-5 w-5 text-primary" />
                        <TypographyH4>Generated Ideas</TypographyH4>
                      </div>

                      {/* Ideas List */}
                      {generatedIdeas.map((idea) => (
                        <div
                          key={idea}
                          onClick={() => setSelectedIdea(idea)}
                          className={cn(
                            "p-4 rounded-lg border-2 cursor-pointer transition-all",
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

                      {/* Generate Post Button */}
                      {selectedIdea && (
                        <div className="flex justify-end pt-4">
                          <Button
                            onClick={handleGeneratePost}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground"
                            disabled={isGenerating}
                          >
                            {isGenerating ? (
                              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            ) : (
                              <Wand2 className="h-4 w-4 mr-2" />
                            )}
                            Generate Post
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Content Section */}
                <div className="rounded-lg border bg-card text-card-foreground p-6">
                  <div className="space-y-4">
                    {/* Content Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <PenLine className="h-5 w-5 text-primary" />
                        <TypographyH4>Content</TypographyH4>
                      </div>
                      <div className="flex gap-2">
                        {/* Copy button */}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleCopy}
                                className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
                                disabled={!content}
                              >
                                {copySuccess ? (
                                  <Check className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-black text-white border-black">
                              {copySuccess ? "Copied!" : "Copy to clipboard"}
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        {/* Preview button */}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setIsPreviewMode(!isPreviewMode)}
                                className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-black text-white border-black">
                              Toggle preview
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        {/* Clear button */}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setContent("")}
                                className="h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
                                disabled={!content}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-black text-white border-black">
                              Clear content
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
                                width={120}
                                height={120}
                                className="rounded-md object-cover"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute -top-2 -right-2 h-6 w-6 bg-background opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => removeImage(index)}
                              >
                                <X className="h-4 w-4" />
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
                                  className="h-14 w-14 rounded-full hover:bg-muted"
                                  onClick={() =>
                                    document
                                      .getElementById("image-upload")
                                      ?.click()
                                  }
                                >
                                  <ImagePlus className="h-7 w-7" />
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
                          <Button
                            variant="outline"
                            className="hover:bg-primary/10 hover:text-primary border-primary"
                          >
                            <Save className="mr-2 h-4 w-4" />
                            Save Draft
                          </Button>
                          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                            <Send className="mr-2 h-4 w-4" />
                            Publish Post
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview Panel */}
              {isPreviewMode && (
                <div className="hidden lg:flex flex-col w-[600px] rounded-lg bg-slate-50 border bg-card text-card-foreground shadow-sm relative overflow-hidden">
                  <div className="border-b p-2 relative bg-white">
                    <div className="flex items-center justify-between px-2">
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "transition-all",
                            activePreview === "desktop"
                              ? "bg-blue-500/10 text-blue-500"
                              : "hover:bg-blue-500/10 hover:text-blue-500"
                          )}
                          onClick={() => setActivePreview("desktop")}
                        >
                          <Monitor className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "transition-all",
                            activePreview === "tablet"
                              ? "bg-blue-500/10 text-blue-500"
                              : "hover:bg-blue-500/10 hover:text-blue-500"
                          )}
                          onClick={() => setActivePreview("tablet")}
                        >
                          <Tablet className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "transition-all",
                            activePreview === "mobile"
                              ? "bg-blue-500/10 text-blue-500"
                              : "hover:bg-blue-500/10 hover:text-blue-500"
                          )}
                          onClick={() => setActivePreview("mobile")}
                        >
                          <Smartphone className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm">
                        <RotateCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-auto p-4">
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
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
