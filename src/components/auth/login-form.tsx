"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "../ui/icons";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [emailInput, setEmailInput] = React.useState<string>("");

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Button variant="outline" disabled={isLoading}>
            <Icons.google className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
          <Button variant="outline" disabled={isLoading}>
            <Icons.linkedin className="mr-2 h-4 w-4" />
            Continue with LinkedIn
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <Button disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Sign in with Email
        </Button>
      </div>
      <div className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <a
          href="/register"
          className="underline underline-offset-4 hover:text-primary"
        >
          Sign up
        </a>
      </div>
    </div>
  );
}
