"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface Tab {
  id: string;
  label: string;
  code: string;
  language: string;
}

interface TabbedCodeProps {
  tabs: Tab[];
  className?: string;
}

export function TabbedCode({ tabs, className = "" }: TabbedCodeProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "");
  const [copied, setCopied] = useState(false);

  const activeTabData = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  const handleCopy = async () => {
    if (activeTabData) {
      await navigator.clipboard.writeText(activeTabData.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`glass overflow-hidden flex flex-col ${className}`}>
      {/* Tabs */}
      <div className="flex items-center border-b border-white/5 bg-white/[0.01] flex-shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-6 py-4 text-xs uppercase tracking-wider font-medium transition-colors ${
              activeTab === tab.id
                ? "text-white"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Code Content - Fixed height with scroll */}
      <div className="relative group h-[500px] overflow-hidden">
        {/* Copy button - positioned absolutely */}
        <button
          onClick={handleCopy}
          className="absolute top-4 right-4 z-20 px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-white/10 transition-all duration-200 flex items-center gap-2 opacity-0 group-hover:opacity-100"
          aria-label="Copy code"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="copied"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-green-400 flex items-center gap-1.5"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 3L4.5 8.5L2 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Copied
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-1.5"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 2C4 1.44772 4.44772 1 5 1H9C9.55228 1 10 1.44772 10 2V6C10 6.55228 9.55228 7 9 7"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                  <rect
                    x="2"
                    y="5"
                    width="5"
                    height="5"
                    rx="0.5"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </svg>
                Copy
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Scrollable code area */}
        <div className="h-full overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <SyntaxHighlighter
                language={activeTabData.language}
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  padding: "1.5rem",
                  background: "transparent",
                  fontSize: "0.875rem",
                  lineHeight: "1.5"
                }}
                showLineNumbers={false}
              >
                {activeTabData.code}
              </SyntaxHighlighter>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
