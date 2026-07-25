"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "./CodeBlock";

type Props = {
  content: string;
};

export default function MarkdownRenderer({ content }: Props) {
  return (
    <div className="prose prose-invert max-w-none break-words">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ className, children }) {
            const match = /language-(\w+)/.exec(className || "");

            const code = String(children).replace(/\n$/, "");

            if (!match) {
              return (
                <code className="rounded bg-slate-800 px-1 py-0.5 text-pink-300">
                  {children}
                </code>
              );
            }

            return (
              <CodeBlock
                language={match[1]}
                code={code}
              />
            );
          },

          h1: ({ children }) => (
            <h1 className="mt-6 mb-4 text-3xl font-bold">
              {children}
            </h1>
          ),

          h2: ({ children }) => (
            <h2 className="mt-5 mb-3 text-2xl font-bold">
              {children}
            </h2>
          ),

          h3: ({ children }) => (
            <h3 className="mt-4 mb-2 text-xl font-semibold">
              {children}
            </h3>
          ),

          p: ({ children }) => (
            <p className="mb-3 leading-7">
              {children}
            </p>
          ),

          ul: ({ children }) => (
            <ul className="list-disc pl-6 space-y-2">
              {children}
            </ul>
          ),

          ol: ({ children }) => (
            <ol className="list-decimal pl-6 space-y-2">
              {children}
            </ol>
          ),

          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-slate-300">
              {children}
            </blockquote>
          ),

          table: ({ children }) => (
            <div className="overflow-x-auto">
              <table className="w-full border border-slate-700">
                {children}
              </table>
            </div>
          ),

          th: ({ children }) => (
            <th className="border border-slate-700 bg-slate-800 p-2">
              {children}
            </th>
          ),

          td: ({ children }) => (
            <td className="border border-slate-700 p-2">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}