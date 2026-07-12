"use client";

type HeaderProps = {
  onClearChat: () => void;
  onExportChat: () => void;
};

export default function Header({
  onClearChat,
  onExportChat,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-800 bg-slate-950/90 px-6 py-4 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-2xl shadow-xl">
          🤖
        </div>

        <div>
          <h1 className="text-xl font-bold tracking-wide text-white">
            Sweety AI Pro
          </h1>

          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span>AI Ready</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onExportChat}
          className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-slate-800 hover:scale-105"
        >
          📤 Export
        </button>

        <button
          onClick={onClearChat}
          className="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-red-500 hover:scale-105"
        >
          🗑 Clear
        </button>
      </div>
    </header>
  );
}