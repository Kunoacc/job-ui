import Head from "next/head";
import React, { HTMLAttributes } from "react";

export const siteTitle = 'Torre UI: Getting torre to work!'

interface LayoutParameters extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  isHome?: boolean;
  title?: string;
}

export default function Layout({children, isHome = true, title, ...data}: LayoutParameters) {
  return (
    <div className="w-full">
      <Head>
        <title>{title ?? siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`relative ${isHome ? `bg-white` : `bg-gray-400`} overflow-hidden min-h-screen ${data.className}`} {...data}>
        {children}
      </div>
    </div>
  )
}