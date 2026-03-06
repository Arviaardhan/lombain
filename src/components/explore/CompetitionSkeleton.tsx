import { Skeleton } from "@/components/ui/skeleton";

export default function CompetitionSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 space-y-5">
      {/* Header: Campus & Category */}
      <div className="flex items-start justify-between">
        <div className="flex gap-2">
          <Skeleton className="h-6 w-28 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <Skeleton className="h-4 w-16 rounded-md" />
      </div>

      {/* Title & Desc */}
      <div className="space-y-3">
        <Skeleton className="h-7 w-3/4 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>

      {/* Looking For Section */}
      <div className="space-y-3">
        <Skeleton className="h-3 w-20" />
        {/* Row 1: Roles */}
        <div className="flex gap-2">
          <Skeleton className="h-6 w-24 rounded-md" />
          <Skeleton className="h-6 w-24 rounded-md" />
        </div>
        {/* Row 2: Skills */}
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20 rounded-md" />
          <Skeleton className="h-6 w-16 rounded-md" />
          <Skeleton className="h-6 w-20 rounded-md" />
        </div>
      </div>

      {/* Footer Stats */}
      <div className="flex items-center justify-between pt-5 border-t border-border/50">
        <div className="flex gap-5">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-24" />
        </div>
        <Skeleton className="h-5 w-5 rounded-full" />
      </div>
    </div>
  );
}