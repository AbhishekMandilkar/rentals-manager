"use client";
import React from "react";

const PageHeader = (props: {
  headerTitle: string;
  headerSubtitle?: string;
  right?: React.ReactNode;
}) => {
  const { right, headerTitle } = props;
  return (
    <div className="flex items-center w-full">
      <div className="flex flex-col space-y-1">
        <h2 className="text-3xl font-bold tracking-tight">{headerTitle}</h2>
      </div>
      <div className="flex-1" />
      {right}
    </div>
  );
};

export default PageHeader;
