"use client";

import * as React from "react";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ImagePlus, X } from "lucide-react";

interface ImageUploadProps {
  value: string | null;
  onChange: (value: string | null) => void;
  className?: string;
}

export function ImageUpload({
  className,
  value,
  onChange,
  ...props
}: ImageUploadProps & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleImageUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setIsLoading(true);
        const reader = new FileReader();
        reader.onloadend = () => {
          onChange(reader.result as string);
          setIsLoading(false);
        };
        reader.readAsDataURL(file);
      }
    },
    [onChange]
  );

  const handleRemoveImage = useCallback(() => {
    onChange(null);
  }, [onChange]);

  return (
    <div className={cn("flex flex-col space-y-4", className)} {...props}>
      {value ? (
        <div className="relative rounded-lg border bg-muted/50 p-1">
          <Image
            src={value}
            alt="Post image"
            width={300}
            height={200}
            className="rounded-md object-cover w-full"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 h-6 w-6"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <label
            htmlFor="image-upload"
            className={cn(
              "flex h-32 w-full cursor-pointer flex-col items-center justify-center",
              "rounded-lg border-2 border-dashed border-muted-foreground/25",
              "px-5 py-4 text-center hover:bg-muted/25 transition-colors"
            )}
          >
            <ImagePlus className="h-8 w-8 text-muted-foreground/50" />
            <p className="mt-2 text-sm text-muted-foreground">
              Click to upload image
            </p>
            <span className="text-xs text-muted-foreground mt-1">
              PNG, JPG up to 10MB
            </span>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              disabled={isLoading}
            />
          </label>
          {isLoading && (
            <div className="mt-2">
              <Icons.spinner className="h-4 w-4 animate-spin" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
