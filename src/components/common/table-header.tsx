import React from "react";
import { ArrowUpDownIcon } from "lucide-react";

const TableHeaderView = (props: {
  title: string;
  onSortClick?: () => void;
}) => {
  const { title, onSortClick } = props;
  return (
    <div className="flex items-center justify-between">
      {title}
      {onSortClick && (
        <ArrowUpDownIcon
          onClick={onSortClick}
          className="px cursor-pointer size-4"
        />
      )}
    </div>
  );
};

export default TableHeaderView;
