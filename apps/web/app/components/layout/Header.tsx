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
    <header className="sticky top-0 z-50 flex min-h-16 items-center justify-between border-b border-white/10 bg-slate-950/75 px-4 backdrop-blur-2xl sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 text-lg shadow-lg shadow-blue-500/20">
          ✨
        </div>

        <div className="min-w-0">
          <h1 className="truncate text-base font-bold tracking-wide text-white sm:text-lg">
            Sweety Ultimate
          </h1>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/60" />
            <span>AI Online</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onExportChat}
          className="hidden rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/10 sm:block"
        >
          Export
        </button>

        <button
          type="button"
          onClick={onClearChat}
          className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/20"
        >
          Clear
        </button>
      </div>
    </header>
  );
}
