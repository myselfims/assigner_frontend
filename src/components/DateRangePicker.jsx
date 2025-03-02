import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { FaCalendarAlt } from "react-icons/fa";

export default function DateRangePicker({ dateFilter, setDateFilter }) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          {dateFilter?.from && dateFilter?.to
            ? `${format(dateFilter.from, "dd/MM/yyyy")} - ${format(
                dateFilter.to,
                "dd/MM/yyyy"
              )}`
            : <> <FaCalendarAlt /> Select Date Range</>}
          {dateFilter?.from && dateFilter?.to && (
            <X
              className="w-4 h-4 cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={(e) => {
                e.stopPropagation(); // Prevents the popover from opening when clicking the clear button
                setDateFilter(null);
              }}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <div className="flex flex-col items-center gap-2">
          <Calendar
            mode="range"
            selected={dateFilter}
            onSelect={setDateFilter}
            numberOfMonths={1}
          />
          {dateFilter?.from && dateFilter?.to && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setDateFilter(null)}
            >
              Clear Selection
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
