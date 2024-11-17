import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <div className="flex flex-col gap-1 items-center justify-center rounded-lg bg-gray-50 h-screen">
      <Skeleton className="h-[150px] w-[1100px] rounded-xl mt-2" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[900px]" />
        <Skeleton className="h-3 w-[800px]" />
        <Skeleton className="h-3 w-[700px]" />
        <Skeleton className="h-3 w-[600px]" />
      </div>
      <Skeleton className="h-[150px] w-[1100px] rounded-xl mt-2" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[900px]" />
        <Skeleton className="h-3 w-[800px]" />
        <Skeleton className="h-3 w-[700px]" />
        <Skeleton className="h-3 w-[600px]" />
      </div>
      <Skeleton className="h-[150px] w-[1100px] rounded-xl mt-2" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[900px]" />
        <Skeleton className="h-3 w-[800px]" />
        <Skeleton className="h-3 w-[700px]" />
        <Skeleton className="h-3 w-[600px]" />
      </div>
    </div>
  );
}

export default Loading;
