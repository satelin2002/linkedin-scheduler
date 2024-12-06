"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CreditCard, Check, Zap } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function BillingSettingsPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
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
                    <BreadcrumbPage>Billing</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
        </header>

        <div className="space-y-6 p-10 pb-16">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Billing</h2>
            <p className="text-muted-foreground">
              Manage your subscription and billing details
            </p>
          </div>

          {/* Current Plan */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Current Plan</h3>
            <div className="rounded-lg border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Free Plan</h4>
                  <p className="text-sm text-muted-foreground">
                    Basic features for personal use
                  </p>
                </div>
                <Button variant="outline">Upgrade Plan</Button>
              </div>
            </div>
          </div>

          {/* Plan Comparison */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Available Plans</h3>
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Pro Plan */}
              <div className="rounded-lg border p-6 space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Pro Plan</h4>
                  <p className="text-sm text-muted-foreground">
                    For professional content creators
                  </p>
                  <div className="text-3xl font-bold">$19/month</div>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    Unlimited posts
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    Advanced analytics
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    Priority support
                  </li>
                </ul>
                <Button className="w-full">
                  <Zap className="h-4 w-4 mr-2" />
                  Upgrade to Pro
                </Button>
              </div>

              {/* Enterprise Plan */}
              <div className="rounded-lg border p-6 space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Enterprise Plan</h4>
                  <p className="text-sm text-muted-foreground">
                    For large teams and organizations
                  </p>
                  <div className="text-3xl font-bold">Custom pricing</div>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    Everything in Pro
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    Custom branding
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    Dedicated support
                  </li>
                </ul>
                <Button variant="outline" className="w-full">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Payment Method</h3>
            <div className="rounded-lg border p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <CreditCard className="h-6 w-6" />
                  <div>
                    <p className="font-medium">Add payment method</p>
                    <p className="text-sm text-muted-foreground">
                      Add a credit card to upgrade to a paid plan
                    </p>
                  </div>
                </div>
                <Button variant="outline">Add Method</Button>
              </div>
            </div>
          </div>

          {/* Billing History */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Billing History</h3>
            <div className="rounded-lg border">
              <div className="p-4 text-center text-sm text-muted-foreground">
                No billing history available
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
