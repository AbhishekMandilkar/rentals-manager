"use client";
import React from "react";

const PageHeader = (props: {
  headerTitle: string;
  headerSubtitle?: string;
  right?: React.ReactNode;
}) => {
  const { right, headerTitle, headerSubtitle } = props;
  return (
    <div className="flex items-center justify-between w-full py-2 px-4 mt-2">
      <div className="flex items-center gap-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight font-geist">{headerTitle}</h2>
          <p className="text-muted-foreground font-mono">{headerSubtitle}</p>
        </div>
      </div>
      {right}
    </div>
  );
};

export default PageHeader;
