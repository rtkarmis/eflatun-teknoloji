import * as React from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@radix-ui/react-select";
import { cn } from "@/lib/utils";

export interface ProductSelectProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const ProductSelect: React.FC<ProductSelectProps> = ({ options, value, onChange, placeholder }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={cn("w-full border rounded-md px-3 py-2 bg-white")}> 
        <SelectValue placeholder={placeholder || "Ürün Seçiniz"} />
      </SelectTrigger>
      <SelectContent>
        {options.map(opt => (
          <SelectItem key={opt.value} value={opt.value} className="cursor-pointer px-3 py-2">
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
