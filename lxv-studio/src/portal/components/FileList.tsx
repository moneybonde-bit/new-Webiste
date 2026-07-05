import React, { useState } from "react";
import { Download, FileText, FolderOpen, Image as ImageIcon, Palette } from "lucide-react";
import type { FileAsset, FileCategory } from "../domain/types";
import { getRepository } from "../data";
import { CATEGORY_LABELS } from "./FileUploadArea";
import { EmptyState, formatBytes, formatDate } from "./ui";

const CATEGORY_ICONS: Record<FileCategory, React.ComponentType<{ className?: string }>> = {
  logo: Palette,
  images: ImageIcon,
  documents: FileText,
  "brand-guidelines": Palette,
  other: FolderOpen,
};

/** File table grouped by category, with signed-URL downloads. */
export function FileList({ files }: { files: FileAsset[] }) {
  const [downloading, setDownloading] = useState<string | null>(null);

  if (files.length === 0) {
    return (
      <EmptyState
        icon={FolderOpen}
        title="No files yet"
        hint="Logos, images, documents and brand assets will appear here."
      />
    );
  }

  const download = async (file: FileAsset) => {
    setDownloading(file.id);
    try {
      const url = await getRepository().getFileUrl(file);
      if (url) window.open(url, "_blank", "noopener,noreferrer");
    } finally {
      setDownloading(null);
    }
  };

  const grouped = new Map<FileCategory, FileAsset[]>();
  for (const f of files) {
    grouped.set(f.category, [...(grouped.get(f.category) ?? []), f]);
  }

  return (
    <div className="divide-y divide-white/[0.06]">
      {Array.from(grouped.entries()).map(([category, items]) => {
        const Icon = CATEGORY_ICONS[category];
        return (
          <div key={category} className="px-5 py-4">
            <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              {CATEGORY_LABELS[category]}
            </p>
            <ul className="space-y-1.5">
              {items.map((file) => (
                <li key={file.id} className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm text-white">{file.name}</p>
                    <p className="text-xs text-gray-600">
                      {formatBytes(file.sizeBytes)} · {formatDate(file.createdAt)} ·{" "}
                      {file.uploadedBy === "admin" ? "Luxavian" : "you"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => void download(file)}
                    disabled={downloading === file.id}
                    aria-label={`Download ${file.name}`}
                    className="rounded-lg border border-white/10 p-2 text-gray-400 transition-colors hover:border-white/25 hover:text-white disabled:opacity-50"
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
