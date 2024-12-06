"use client";

import * as React from "react";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Settings2,
  Sparkles,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Application",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "My Posts",
          url: "/posts",
        },
        {
          title: "Popular Posts",
          url: "/posts/popular",
        },
        {
          title: "Calendar",
          url: "/posts/calendar",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/settings/general",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "/settings/billing",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const navItems = {
    ...data,
    navMain: data.navMain.map((section) => ({
      ...section,
      items: section.items.map((item) => ({
        ...item,
        isActive: item.url === pathname,
      })),
    })),
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={navItems.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems.navMain} />

        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col items-center gap-2 p-4 m-4 mb-12 rounded-lg border border-dashed border-primary/50 bg-gradient-to-b from-black to-black/70">
          <Sparkles className="h-8 w-8 text-white" />
          <h3 className="font-semibold text-white">Upgrade to Pro</h3>
          <p className="text-sm text-white/80 text-center">
            Get access to advanced features, priority support, unlimited posts,
            custom branding, and analytics
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Upgrade Now
          </Button>
        </div>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
