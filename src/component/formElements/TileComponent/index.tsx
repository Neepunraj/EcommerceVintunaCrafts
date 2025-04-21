import { SizeTypes } from "@/utils";
import React, { MouseEventHandler } from "react";
interface DataItem {
  id: string;
  label: string;
}
interface TileComponentProps {
  selected: SizeTypes[];
  onClick: (item: DataItem) => void;
  data: DataItem[];
}
function TileComponent({ selected = [], onClick, data }: TileComponentProps) {
  return data && data.length > 0 ? (
    <div className="mt-3 flex flex-wrap items-center gap-1">
      {data.map((dataitem: any) => (
        <label
          onClick={() => onClick(dataitem)}
          key={dataitem.id}
          className={`cursor-pointer ${
            selected &&
            selected.length &&
            selected.map((item) => item.id).indexOf(dataitem.id) !== -1
              ? "bg-black"
              : ""
          }`}
        >
          <span
            className={`rounded-lg border border-black px-6 py-2 font-bold
            ${
              selected &&
              selected.length &&
              selected.map((item) => item.id).indexOf(dataitem.id) !== -1
                ? "text-white"
                : ""
            }
            
            `}
          >
            {dataitem.label}
          </span>
        </label>
      ))}
    </div>
  ) : null;
}

export default TileComponent;
