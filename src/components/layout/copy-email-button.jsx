"use client";

import { useState } from "react";

export default function CopyEmailButton({ email = "meowdes.studio@gmail.com" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="group relative w-fit text-left"
      aria-label="Скопировать email"
    >
      <span className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 whitespace-nowrap rounded-xl bg-[#850a25] px-3 py-2 text-base leading-6 text-[#fdfdfd] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {copied ? "Скопировано!" : "Скопировать"}
        <span className="absolute -bottom-[5px] left-1/2 h-0 w-0 -translate-x-1/2 border-x-[9px] border-t-[5px] border-x-transparent border-t-[#850a25]" />
      </span>

      <span className="block rounded-lg border border-transparent text-[24px] font-medium leading-[1.2] text-[#fdfdfd] transition-[border-color] duration-200 group-hover:border-[#ff1447] md:text-[40px] md:leading-[48px]">
        {email}
      </span>
    </button>
  );
}
