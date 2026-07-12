"use client";

export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 py-2">
      {/* AI Avatar */}
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-lg shadow-md">
        🤖
      </div>

      {/* Bubble */}
      <div className="rounded-3xl bg-slate-800 px-5 py-4 shadow-lg">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400"></span>

          <span
            className="h-2 w-2 animate-bounce rounded-full bg-blue-400"
            style={{ animationDelay: "0.2s" }}
          ></span>

          <span
            className="h-2 w-2 animate-bounce rounded-full bg-blue-400"
            style={{ animationDelay: "0.4s" }}
          ></span>
        </div>

        <p className="mt-3 text-sm text-slate-400">
          Sweety AI is thinking...
        </p>
      </div>
    </div>
  );
}