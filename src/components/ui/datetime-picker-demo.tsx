
"use client";

import * as React from "react";
import { format, add } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { TimePicker } from "@/components/ui/datetime-picker";

// Basic DateTimePicker that can be used in forms
export function DateTimePicker() {
  const [date, setDate] = React.useState<Date>();

  const handleSelect = (newDay: Date | undefined) => {
    if (!newDay) return;
    if (!date) {
      setDate(newDay);
      return;
    }
    const diff = newDay.getTime() - date.getTime();
    const diffInDays = diff / (1000 * 60 * 60 * 24);
    const newDateFull = add(date, { days: Math.ceil(diffInDays) });
    setDate(newDateFull);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP HH:mm:ss") : <span>Choisir une date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => handleSelect(d)}
          initialFocus
        />
        <div className="p-3 border-t border-border">
          <TimePicker setDate={setDate} date={date} />
        </div>
      </PopoverContent>
    </Popover>
  );
}

// Form example with date time picker
export function DateTimePickerForm() {
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Date soumise:", selectedDate);
  }

  return (
    <form
      className="flex items-end gap-4 justify-center"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col">
        <label className="text-left text-sm mb-2">Date et Heure</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !selectedDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? (
                format(selectedDate, "PPP HH:mm:ss")
              ) : (
                <span>Choisir une date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
            />
            <div className="p-3 border-t border-border">
              <TimePicker
                setDate={setSelectedDate}
                date={selectedDate}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <Button type="submit">Soumettre</Button>
    </form>
  );
}

// Simple TimePicker component isolated from calendar
export function TimePickerDemo({ date, setDate }: { date: Date | undefined; setDate: (date: Date | undefined) => void }) {
  return (
    <div className="flex flex-col gap-4">
      <TimePicker date={date} setDate={setDate} />
    </div>
  );
}
