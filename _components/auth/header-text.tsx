// src/components/auth/header-text.tsx
"use client";

export function HeaderText({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <h1 className="text-2xl font-semibold">{label}</h1>
    </div>
  );
}
