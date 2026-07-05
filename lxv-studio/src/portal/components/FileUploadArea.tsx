import React, { useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { FILE_CATEGORIES, type FileCategory } from "../domain/types";
import { Spinner } from "./ui";

const CATEGORY_LABELS: Record<FileCategory, string> = {
  logo: "Logo",
  images: "Images",
  documents: "Documents",
  "brand-guidelines": "Brand Guidelines",
  other: "Other",
};

interface FileUploadAreaProps {
  onUpload: (file: File, category: FileCategory) => Promise<void>;
}

/** Drag-and-drop upload zone with an asset-category selector. */
export function FileUploadArea({ onUpload }: FileUploadAreaProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState<FileCategory>("other");
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0 || busy) return;
    setBusy(true);
    setError(null);
    try {
      for (const file of Array.from(files)) {
        await onUpload(file, category);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed — please try again.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-2" role="radiogroup" aria-label="File category">
        {FILE_CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            role="radio"
            aria-checked={category === c}
            onClick={() => setCategory(c)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              category === c
                ? "border-neon-pink/60 bg-neon-pink/15 text-neon-pink"
                : "border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/20 hover:text-white",
            )}
          >
            {CATEGORY_LABELS[c]}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          void handleFiles(e.dataTransfer.files);
        }}
        disabled={busy}
        className={cn(
          "flex w-full flex-col items-center gap-2 rounded-2xl border border-dashed px-6 py-8 text-center transition-colors",
          dragging
            ? "border-neon-pink bg-neon-pink/10"
            : "border-white/15 bg-white/[0.02] hover:border-white/30",
          busy && "opacity-60",
        )}
      >
        {busy ? <Spinner /> : <UploadCloud className="h-6 w-6 text-gray-500" aria-hidden="true" />}
        <span className="text-sm font-medium text-gray-300">
          {busy ? "Uploading…" : "Drop files here or click to browse"}
        </span>
        <span className="text-xs text-gray-600">
          Uploads as {CATEGORY_LABELS[category]} · logos, images, documents & brand assets
        </span>
      </button>
      <input
        ref={inputRef}
        type="file"
        multiple
        className="sr-only"
        aria-label="Upload files"
        onChange={(e) => void handleFiles(e.target.files)}
      />
      {error && (
        <p role="alert" className="mt-2 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export { CATEGORY_LABELS };
