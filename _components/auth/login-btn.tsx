// src/components/auth/login-button.tsx
"use client";

import * as React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export function LoginButton({ loading, children, className = "", ...rest }: Props) {
  return (
    <button
      {...rest}
      disabled={loading || rest.disabled}
      className={`relative inline-flex w-full items-center justify-center rounded-md px-4 py-2
      font-medium text-white bg-black hover:bg-black/90 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-black/30 ${className}`}
    >
      {/* Button label fades out when loading */}
      <span className={`${loading ? "opacity-0" : "opacity-100"} transition-opacity`}>
        {children}
      </span>

      {/* Spinner overlay */}
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg
            className="h-5 w-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            {/* background ring */}
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            {/* spinning arc */}
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        </span>
      )}
    </button>
  );
}
