"use client";

import { useEffect, useState } from "react";

interface ShareIconsClientProps {
  title: string;
}

export default function ShareIconsClient({ title }: ShareIconsClientProps) {
  const [pageUrl, setPageUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [instaHint, setInstaHint] = useState(false);

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

  // Instagram has no web share endpoint — links can't be posted from a browser.
  // On mobile the native share sheet lists Instagram; on desktop we copy the
  // link and open Instagram so the user can paste it into a story or DM.
  const shareOnInstagram = async () => {
    if (!pageUrl) return;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url: pageUrl });
        return;
      } catch {
        // User dismissed the sheet — fall through to the copy behaviour
      }
    }

    try {
      await navigator.clipboard.writeText(pageUrl);
    } catch (err) {
      console.error("Failed to copy:", err);
    }

    setInstaHint(true);
    setTimeout(() => setInstaHint(false), 3000);
    window.open("https://www.instagram.com/jonespaintandglass/", "_blank", "noopener,noreferrer");
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
      <button
        onClick={shareOnInstagram}
        title="Share on Instagram"
        className="rounded flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer"
      >
        <img src="/assets/jt/elements/instagram-icon.png" alt="Instagram" className="w-6 h-6" />
      </button>

      {/* Twitter/X */}
      <button
        onClick={shareOnTwitter}
        title="Share on Twitter"
        className="rounded flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer"
      >
        <img src="/assets/jt/elements/x-icon.png" alt="Twitter" className="w-6 h-6" />
      </button>

      {/* Copy feedback */}
      {copied && (
        <span className="text-[12px] text-green-500 font-semibold ml-2">
          Copied!
        </span>
      )}

      {/* Instagram feedback */}
      {instaHint && (
        <span className="text-[12px] text-green-500 font-semibold ml-2">
          Link copied — paste it in your Instagram story
        </span>
      )}
    </div>
  );
}