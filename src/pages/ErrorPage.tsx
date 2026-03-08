"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

const errorMessages: Record<string, { title: string; description: string }> = {
  "403": {
    title: "Access forbidden",
    description: "You don’t have permission to view this resource.",
  },
  "404": {
    title: "Page not found",
    description: "The page you’re looking for doesn’t exist or has been moved.",
  },
  "500": {
    title: "Internal server error",
    description: "Something went wrong on our side. Please try again later.",
  },
};

export default function ErrorPage({
  code = "500",
}: {
  code?: keyof typeof errorMessages;
}) {
  const router = useRouter();
  const { title, description } = errorMessages[code] ?? errorMessages["500"];

  return (
    <div className="grid min-h-screen place-items-center px-6">
      <div className="grid grid-cols-[auto_1px_1fr] items-center gap-8">
        <div className="text-[9rem] font-bold leading-none text-muted-foreground/30">
          {code}
        </div>

        <div className="h-24 w-px bg-border" />

        <div className="space-y-4">
          <div>
            <p className="text-2xl font-semibold">{title}</p>
            <p className="text-muted-foreground">{description}</p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>

            <Button onClick={() => router.push("/")} className="gap-2">
              <Home className="h-4 w-4" />
              Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
