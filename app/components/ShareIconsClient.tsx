"use client";

import { useEffect, useState } from "react";

interface ShareIconsClientProps {
  title: string;
}

export default function ShareIconsClient({ title }: ShareIconsClientProps) {
  const [pageUrl, setPageUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPageUrl(window.location.href);
    }
  }, []);

  // Social Share Functions
  const shareOnFacebook = () => {
    if (!pageUrl) return;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
    window.open(url, "facebook-share", "width=600,height=400");
  };

  const shareOnTwitter = () => {
    if (!pageUrl) return;
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(title)}`;
    window.open(url, "twitter-share", "width=600,height=400");
  };

  const shareOnLinkedIn = () => {
    if (!pageUrl) return;
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;
    window.open(url, "linkedin-share", "width=600,height=400");
  };

  const shareOnWhatsApp = () => {
    if (!pageUrl) return;
    const text = `${title} ${pageUrl}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "whatsapp-share", "width=600,height=400");
  };

  const copyToClipboard = async () => {
    if (!pageUrl) return;
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex items-center gap-4 flex-wrap">
      {/* Share/Copy Link */}
      <button
        onClick={copyToClipboard}
        title={copied ? "Copied!" : "Copy link"}
        className="rounded flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer"
      >
        <img
          src="/assets/jt/elements/share-icon.png"
          alt={copied ? "Copied!" : "Share"}
          className="w-6 h-6"
        />
      </button>

      {/* LinkedIn */}
      <button
        onClick={shareOnLinkedIn}
        title="Share on LinkedIn"
        className="rounded flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer"
      >
        <img src="/assets/jt/elements/linkedin-icon.png" alt="LinkedIn" className="w-6 h-6" />
      </button>

      {/* Facebook */}
      <button
        onClick={shareOnFacebook}
        title="Share on Facebook"
        className="rounded flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer"
      >
        <img src="/assets/jt/elements/facebook-icon.png" alt="Facebook" className="w-6 h-6" />
      </button>

      {/* Instagram */}
      
      <a  href="https://www.instagram.com/jonespaintandglass/"
        target="_blank"
        rel="noopener noreferrer"
        title="Follow on Instagram"
        className="rounded flex items-center justify-center hover:opacity-70 transition-opacity"
      >
        <img src="/assets/jt/elements/instagram-icon.png" alt="Instagram" className="w-6 h-6" />
      </a>

      {/* Twitter/X */}
      <button
        onClick={shareOnTwitter}
        title="Share on Twitter"
        className="rounded flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer"
      >
        <img src="/assets/jt/elements/x-icon.png" alt="Twitter" className="w-6 h-6" />
      </button>

      {/* TikTok */}
     

      {/* Tooltip for copy feedback */}
      {copied && (
        <span className="text-[12px] text-green-500 font-semibold ml-2">
          Copied!
        </span>
      )}
    </div>
  );
}