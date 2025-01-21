import { Skeleton } from "@/components/ui/skeleton";

function loading() {
  return (
    <div className="p-5 flex flex-col gap-10 min-h-screen">
      <div className="w-full flex justify-between items-center gap-2">
        <Skeleton className="w-[100px] h-10" />

        <div className="hidden md:flex md:justify-between md:items-center md:gap-2">
          <Skeleton className="w-20 h-10" />
          <Skeleton className="w-20 h-10" />
          <Skeleton className="w-20 h-10" />
          <Skeleton className="w-20 h-10" />
        </div>

        <Skeleton className="md:hidden w-10 h-10" />
      </div>

      <div className="w-full flex flex-col justify-between items-start gap-10 md:flex-row md:gap-5">
        <div className="w-full flex flex-col justify-start items-start gap-5 md:w-[60%]">
          <Skeleton className="w-full h-20" />
          <Skeleton className="w-full h-20" />
          <Skeleton className="w-full h-20" />
          <Skeleton className="w-full h-20" />
        </div>

        <div className="w-full flex flex-col justify-start items-end gap-5 md:w-[40%]">
          <Skeleton className="w-full h-10 md:w-[300px]" />
          <Skeleton className="w-full h-10 md:w-[300px]" />
          <Skeleton className="w-full h-10 md:w-[300px]" />
          <Skeleton className="w-full h-10 md:w-[300px]" />
        </div>
      </div>

      <div className="flex justify-between items-start gap-5">
        <Skeleton className="flex-1 h-20" />
        <Skeleton className="flex-1 h-20" />
      </div>
    </div>
  );
}

export default loading;
