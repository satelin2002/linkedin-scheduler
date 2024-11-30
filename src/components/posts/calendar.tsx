"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalendarProps {
  currentDate: Date;
}

interface ScheduledPost {
  id: string;
  content: string;
  topics: string[];
  scheduledFor: Date;
}

export function Calendar({ currentDate }: CalendarProps) {
  const router = useRouter();

  // Mock scheduled posts with realistic content
  const scheduledPosts: ScheduledPost[] = [
    {
      id: "1",
      content:
        "Excited to announce our new AI-powered content scheduling feature! 🚀 #ProductLaunch #AI #Innovation",
      topics: ["Product Launch", "AI"],
      scheduledFor: new Date(2024, 11, 15, 10, 0),
    },
    {
      id: "2",
      content:
        "Join me at the upcoming Digital Marketing Summit where I'll be speaking about the future of social media strategy. Limited seats available! 🎯",
      topics: ["Event", "Marketing"],
      scheduledFor: new Date(2024, 11, 15, 14, 30),
    },
    {
      id: "3",
      content:
        "5 Tips for Building a Strong Personal Brand on LinkedIn:\n1. Consistent Content\n2. Authentic Voice\n3. Engage Daily\n4. Share Expertise\n5. Quality Network",
      topics: ["Personal Branding", "Tips"],
      scheduledFor: new Date(2024, 10, 18, 9, 0),
    },
    {
      id: "4",
      content:
        "We're hiring! Looking for a Senior Full Stack Developer to join our growing team. Remote work available. DM for details. #TechJobs #Hiring",
      topics: ["Hiring", "Tech"],
      scheduledFor: new Date(2024, 11, 20, 11, 0),
    },
    {
      id: "5",
      content:
        "Celebrating 5 years of innovation and growth! Thank you to our amazing team and clients who made this journey possible. 🎉 #Milestone #Growth",
      topics: ["Company News", "Celebration"],
      scheduledFor: new Date(2024, 2, 22, 13, 0),
    },
    {
      id: "6",
      content:
        "New blog post: 'The Impact of AI on Content Creation' - Read how AI is transforming the way we create and distribute content. Link in comments!",
      topics: ["Blog", "AI"],
      scheduledFor: new Date(2024, 10, 25, 15, 30),
    },
    {
      id: "7",
      content:
        "Weekly tech tip: Use keyboard shortcuts to boost your productivity. What's your favorite shortcut? Share below! 💻 #ProductivityTips #Tech",
      topics: ["Tech Tips", "Productivity"],
      scheduledFor: new Date(2024, 10, 28, 10, 30),
    },
    {
      id: "8",
      content:
        "Proud to be featured in @TechMagazine's '30 Under 30' list! Grateful for this recognition and excited for what's ahead. 🏆",
      topics: ["Achievement", "Recognition"],
      scheduledFor: new Date(2024, 10, 25, 16, 0),
    },
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handleEditPost = (postId: string) => {
    const post = scheduledPosts.find((p) => p.id === postId);
    if (post) {
      const encodedContent = encodeURIComponent(post.content);
      const encodedTopics = encodeURIComponent(JSON.stringify(post.topics));
      router.push(
        `/posts/create?content=${encodedContent}&topics=${encodedTopics}`
      );
    }
  };

  const handleDeletePost = (postId: string) => {
    // Implement delete functionality
    console.log("Delete post:", postId);
  };

  const renderPostActions = (post: ScheduledPost) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-2">
        <div className="flex flex-col gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onClick={() => handleEditPost(post.id)}
          >
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-destructive hover:text-destructive"
            onClick={() => handleDeletePost(post.id)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );

  const renderCalendarDays = () => {
    const days = [];
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-32 border border-border/50" />
      );
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      const postsForDay = scheduledPosts.filter(
        (post) => post.scheduledFor.toDateString() === date.toDateString()
      );

      days.push(
        <div key={day} className="h-32 border border-border/50 p-2">
          <div className="font-medium text-sm mb-2">{day}</div>
          <div className="space-y-1">
            {postsForDay.map((post) => (
              <div key={post.id} className="relative group">
                <div
                  className={cn(
                    "text-xs p-2 rounded bg-primary/10 cursor-pointer truncate pr-8",
                    "hover:bg-primary/20 transition-colors"
                  )}
                >
                  {post.content.slice(0, 50)}...
                </div>
                {renderPostActions(post)}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-7 gap-px">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="h-10 flex items-center justify-center font-medium text-sm"
          >
            {day}
          </div>
        ))}
        {renderCalendarDays()}
      </div>
    </div>
  );
}
