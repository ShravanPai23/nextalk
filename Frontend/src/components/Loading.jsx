import React from "react";

function Loading() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-800">
      <div className="flex w-52 flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="animate-pulse h-16 w-16 shrink-0 rounded-full bg-purple-500/20"></div>
          <div className="flex flex-col gap-4">
            <div className="animate-pulse h-4 w-20 rounded bg-purple-500/20"></div>
            <div className="animate-pulse h-4 w-28 rounded bg-purple-500/20"></div>
          </div>
        </div>
        <div className="animate-pulse h-32 w-full rounded bg-purple-500/20"></div>
      </div>
    </div>
  );
}

export default Loading;
