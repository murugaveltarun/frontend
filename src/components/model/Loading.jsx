import { Loader2 } from "lucide-react";
import React from "react";

function Loading() {
  return (
    <div className="flex justify-center items-center mt-20 gap-5">
      <Loader2 className="animate-spin h-10 w-10 text-accent dark:text-gradient-mid-color" />
      <p className="text-xl">Loading...</p>
    </div>
  );
}

export default Loading;
