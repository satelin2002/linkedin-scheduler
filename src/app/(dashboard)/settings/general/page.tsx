"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
export default function GeneralSettingsPage() {
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
                        <BreadcrumbLink href="#">Settings</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>General</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
              </div>
            </header>
            <div className="space-y-6 p-10 pb-16">
              <div className="space-y-0.5">
                <p className="text-muted-foreground">
                  Manage your account settings and preferences.
                </p>
              </div>

              <div className="grid gap-6">
                {/* Profile Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Profile</h3>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Display Name</Label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input id="bio" placeholder="Tell us about yourself" />
                    </div>
                  </div>
                </div>

                {/* Preferences Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Preferences</h3>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive email updates about your activity
                        </p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Post Analytics</Label>
                        <p className="text-sm text-muted-foreground">
                          Get detailed insights about your posts
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                {/* Timezone Settings */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Timezone</h3>
                  <div className="grid gap-2">
                    <Label>Default Timezone</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>UTC</option>
                      <option>EST</option>
                      <option>PST</option>
                    </select>
                  </div>
                </div>

                <Button className="w-fit">Save Changes</Button>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
