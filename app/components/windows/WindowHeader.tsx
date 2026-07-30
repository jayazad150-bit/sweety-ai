"use client";

type WindowHeaderProps = {
  title: string;

  closable?: boolean;

  onClose?: () => void;

  onMinimize?: () => void;

  onMaximize?: () => void;
};

export default function WindowHeader({
  title,
  closable = true,
  onClose,
  onMinimize,
  onMaximize,
}: WindowHeaderProps) {
  return (
    <header className="flex h-12 items-center justify-between border-b border-slate-700 bg-slate-800 px-4 select-none">
      <div className="flex items-center gap-3">
        <div className="h-3 w-3 rounded-full bg-cyan-400" />

        <span className="font-medium text-white">
          {title}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onMinimize}
          className="flex h-7 w-7 items-center justify-center rounded-md bg-yellow-500 text-xs font-bold text-black transition hover:scale-110"
          title="Minimize"
        >
          —
        </button>

        <button
          onClick={onMaximize}
          className="flex h-7 w-7 items-center justify-center rounded-md bg-green-500 text-xs font-bold text-black transition hover:scale-110"
          title="Maximize"
        >
          □
        </button>

        {closable && (
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-md bg-red-500 text-xs font-bold text-white transition hover:scale-110"
            title="Close"
          >
            ✕
          </button>
        )}
      </div>
    </header>
  );
}