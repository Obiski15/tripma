import { Skeleton } from "@/components/ui/skeleton";

function DummyFareBreakdown() {
  return (
    <div className="w-full flex-1 flex flex-col gap-3 bg-background p-5 md:w-auto md:min-h-screen">
      <Skeleton className="w-full h-20" />

      <div className="flex justify-between">
        <Skeleton className="w-40 h-10" />
        <Skeleton className="w-40 h-10" />
      </div>

      <div className="flex flex-col gap-3">
        <Skeleton className="w-40 h-10" />

        <Skeleton className="w-full h-20" />
        <Skeleton className="w-full h-20" />

        <div className="flex justify-between items-center gap-4">
          <Skeleton className="flex-1 w-10 h-10" />
          <Skeleton className="flex-1 w-10 h-10" />
        </div>
      </div>

      <div className="flex justify-end items-center">
        <Skeleton className="w-20 h-10" />
      </div>
    </div>
  );
}

export default DummyFareBreakdown;
