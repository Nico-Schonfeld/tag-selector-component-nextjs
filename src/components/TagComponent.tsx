"use client";
import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const tags = [
  { tagEs: "Tag ES", tagEn: "Tag EN", tagId: 1 },
  { tagEs: "Hola", tagEn: "Hello", tagId: 2 },
];

interface TagSelectorProps {
  selectedLanguage: "es" | "en";
}

export default function TagSelector({ selectedLanguage }: TagSelectorProps) {
  const [open, setOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tagId: string) => {
    setSelectedTags((current) => {
      console.log("Current selectedTags:", current);
      if (!Array.isArray(current)) {
        console.error("selectedTags is not an array:", current);
        return [];
      }
      const newSelectedTags = current.includes(tagId)
        ? current.filter((id) => id !== tagId)
        : [...current, tagId];
      console.log("New selectedTags:", newSelectedTags);
      return newSelectedTags;
    });
  };

  const handleOpenChange = (isOpen: boolean) => {
    console.log("Popover open state:", isOpen);
    setOpen(isOpen);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-auto justify-between"
          >
            {selectedTags?.length > 0
              ? `${selectedTags?.length} tag${
                  selectedTags?.length > 1 ? "s" : ""
                } selected`
              : "Select tags..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command className="w-full">
            <CommandList className="w-full">
              <CommandEmpty>No tag found.</CommandEmpty>
              <CommandGroup className="w-full">
                {tags.map((tag) => (
                  <CommandItem
                    key={tag.tagId}
                    onSelect={() => toggleTag(tag.tagId.toString())}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedTags.includes(tag.tagId.toString())
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {selectedLanguage === "es" ? tag.tagEs : tag.tagEn}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
