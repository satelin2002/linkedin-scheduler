"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Bookmark,
  Send,
  Calendar,
  Lightbulb,
} from "lucide-react";
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

// Mock data structure
interface PopularPost {
  id: string;
  author: {
    name: string;
    image: string;
    title: string;
    connection: string;
  };
  content: string;
  topics: string[];
  stats: {
    likes: number;
    comments: number;
    reposts: number;
  };
  timestamp: string;
}

interface TopicSection {
  name: string;
  posts: PopularPost[];
}

const popularTopics: TopicSection[] = [
  {
    name: "Personal Branding",
    posts: [
      {
        id: "1",
        author: {
          name: "Luke Winter",
          image: "https://github.com/shadcn.png",
          title: "Growing the best brands with engaging video",
          connection: "3rd+",
        },
        content:
          "🚀 Here's a simple truth that took me 10 years to learn: Personal branding isn't about you. It's about the value you bring to others. Focus on solving problems and sharing insights that genuinely help your audience.",
        topics: ["Personal Branding", "Career Growth"],
        stats: {
          likes: 166,
          comments: 12,
          reposts: 2,
        },
        timestamp: "2d",
      },
      // Add 4 more posts for "Personal Branding"
      {
        id: "2",
        author: {
          name: "Jane Doe",
          image: "https://example.com/jane.png",
          title: "Building a personal brand from scratch",
          connection: "1st",
        },
        content:
          "Your personal brand is your reputation. It's what people say about you when you're not in the room. Build it with intention and authenticity.",
        topics: ["Personal Branding"],
        stats: {
          likes: 200,
          comments: 30,
          reposts: 5,
        },
        timestamp: "1d",
      },
      {
        id: "3",
        author: {
          name: "John Smith",
          image: "https://example.com/john.png",
          title: "The power of personal branding in the digital age",
          connection: "2nd",
        },
        content:
          "💡 In today's digital world, your personal brand is more important than ever. Here are 5 key strategies I've learned:\n\n1. Be authentic\n2. Share your journey\n3. Provide value first\n4. Stay consistent\n5. Engage meaningfully\n\nRemember: Your personal brand is a marathon, not a sprint. Build it day by day, interaction by interaction.",
        topics: ["Personal Branding", "Digital Marketing"],
        stats: {
          likes: 300,
          comments: 45,
          reposts: 10,
        },
        timestamp: "3d",
      },
      {
        id: "4",
        author: {
          name: "Emily Clark",
          image: "https://example.com/emily.png",
          title: "How to create a personal brand that stands out",
          connection: "3rd+",
        },
        content:
          "Creating a personal brand that stands out requires authenticity and consistency...",
        topics: ["Personal Branding", "Career Growth"],
        stats: {
          likes: 250,
          comments: 20,
          reposts: 8,
        },
        timestamp: "4d",
      },
      {
        id: "5",
        author: {
          name: "Michael Brown",
          image: "https://example.com/michael.png",
          title: "Personal branding tips for professionals",
          connection: "1st",
        },
        content:
          "Here are some personal branding tips that every professional should know...",
        topics: ["Personal Branding"],
        stats: {
          likes: 180,
          comments: 25,
          reposts: 6,
        },
        timestamp: "5d",
      },
    ],
  },
  {
    name: "Technology",
    posts: [
      {
        id: "6",
        author: {
          name: "Alice Johnson",
          image: "https://example.com/alice.png",
          title: "The future of AI in technology",
          connection: "2nd",
        },
        content:
          "AI is transforming the technology landscape in unprecedented ways...",
        topics: ["Technology", "AI"],
        stats: {
          likes: 500,
          comments: 60,
          reposts: 15,
        },
        timestamp: "1d",
      },
      // Add 4 more posts for "Technology"
      {
        id: "7",
        author: {
          name: "Bob Lee",
          image: "https://example.com/bob.png",
          title: "Blockchain: The next big thing in tech",
          connection: "3rd+",
        },
        content:
          "Blockchain technology is set to revolutionize various industries...",
        topics: ["Technology", "Blockchain"],
        stats: {
          likes: 450,
          comments: 50,
          reposts: 12,
        },
        timestamp: "2d",
      },
      {
        id: "8",
        author: {
          name: "Cathy Green",
          image: "https://example.com/cathy.png",
          title: "The impact of 5G on technology",
          connection: "1st",
        },
        content:
          "5G technology is expected to bring about significant changes in connectivity...",
        topics: ["Technology", "5G"],
        stats: {
          likes: 400,
          comments: 40,
          reposts: 10,
        },
        timestamp: "3d",
      },
      {
        id: "9",
        author: {
          name: "David White",
          image: "https://example.com/david.png",
          title: "Cybersecurity in the modern age",
          connection: "2nd",
        },
        content:
          "As technology advances, so do the threats to cybersecurity...",
        topics: ["Technology", "Cybersecurity"],
        stats: {
          likes: 350,
          comments: 35,
          reposts: 9,
        },
        timestamp: "4d",
      },
      {
        id: "10",
        author: {
          name: "Eva Black",
          image: "https://example.com/eva.png",
          title: "The rise of quantum computing",
          connection: "3rd+",
        },
        content:
          "Quantum computing is poised to change the face of technology...",
        topics: ["Technology", "Quantum Computing"],
        stats: {
          likes: 300,
          comments: 30,
          reposts: 8,
        },
        timestamp: "5d",
      },
    ],
  },
  // Add more topics with 5 posts each...
  {
    name: "Health & Wellness",
    posts: [
      {
        id: "11",
        author: {
          name: "Fiona Blue",
          image: "https://example.com/fiona.png",
          title: "The benefits of a balanced diet",
          connection: "1st",
        },
        content: "A balanced diet is crucial for maintaining good health...",
        topics: ["Health & Wellness", "Nutrition"],
        stats: {
          likes: 220,
          comments: 28,
          reposts: 7,
        },
        timestamp: "1d",
      },
      {
        id: "12",
        author: {
          name: "George Red",
          image: "https://example.com/george.png",
          title: "Mental health awareness",
          connection: "2nd",
        },
        content:
          "Raising awareness about mental health is more important than ever...",
        topics: ["Health & Wellness", "Mental Health"],
        stats: {
          likes: 210,
          comments: 26,
          reposts: 6,
        },
        timestamp: "2d",
      },
      {
        id: "13",
        author: {
          name: "Hannah Yellow",
          image: "https://example.com/hannah.png",
          title: "The importance of regular exercise",
          connection: "3rd+",
        },
        content:
          "Regular exercise is key to maintaining a healthy lifestyle...",
        topics: ["Health & Wellness", "Fitness"],
        stats: {
          likes: 230,
          comments: 30,
          reposts: 8,
        },
        timestamp: "3d",
      },
      {
        id: "14",
        author: {
          name: "Ian Purple",
          image: "https://example.com/ian.png",
          title: "Stress management techniques",
          connection: "1st",
        },
        content:
          "Managing stress effectively can improve your overall well-being...",
        topics: ["Health & Wellness", "Stress Management"],
        stats: {
          likes: 240,
          comments: 32,
          reposts: 9,
        },
        timestamp: "4d",
      },
      {
        id: "15",
        author: {
          name: "Julia Orange",
          image: "https://example.com/julia.png",
          title: "The role of sleep in health",
          connection: "2nd",
        },
        content: "Quality sleep is essential for good health and well-being...",
        topics: ["Health & Wellness", "Sleep"],
        stats: {
          likes: 250,
          comments: 34,
          reposts: 10,
        },
        timestamp: "5d",
      },
    ],
  },
];

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
