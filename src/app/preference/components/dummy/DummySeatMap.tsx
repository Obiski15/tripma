import { Skeleton } from "@/components/ui/skeleton";

function DummySeatMap() {
  return (
    <div className="h-full w-full flex flex-col gap-5 p-5">
      <Skeleton className="w-full h-20" />
      <Skeleton className="w-full h-20" />
      <Skeleton className="w-full h-20" />
    </div>
  );
}

export default DummySeatMap;
