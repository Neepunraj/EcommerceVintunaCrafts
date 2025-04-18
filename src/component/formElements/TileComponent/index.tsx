import { SizeTypes } from "@/utils";
import React from "react";

interface TileComponentProps {
  selected: SizeTypes[];
  onClick: () => void;
  data: any;
}
function TileComponent({ selected = [], onClick, data }: TileComponentProps) {
  return data && data.length > 0 ? (
    <div>
      {data.map((dataitem: any) => (
        <label key={dataitem.id}>
          <span>{dataitem.label}</span>
        </label>
      ))}
    </div>
  ) : null;
}

export default TileComponent;
