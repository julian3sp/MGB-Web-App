"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../ui/Popover"

export function Combobox({options, value, setValue, error, clearError, placeholder} : {
    options: string[];
    value: string;
    setValue: (value: string) => void;
    placeholder: string;
    error?: string;
    clearError?: ()=>void;
}) {
    const [open, setOpen] = React.useState(false)

    return (
        <div className="relative flex flex-col">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={`w-full h-[48px] bg-white font-[Poppins] text-[13pt] font-normal shadow justify-between ${value == "" && !open ? "text-gray-500" : "text-black"}`}
                    >
                        {value
                            ? options.find((option) => option === value)
                            : placeholder}
                        <ChevronDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[362px] p-0 font-[Poppins]">
                    <Command>
                        <CommandInput placeholder="Search languages..." className="h-9" />
                        <CommandList className={"max-h-[240px] overflow-y-auto"}>
                            <CommandEmpty>No language found.</CommandEmpty>
                            <CommandGroup>
                                {options.map((option) => (
                                    <CommandItem
                                        key={option}
                                        value={option}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue)
                                            setOpen(false)
                                        }}
                                    >
                                        {option}
                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                value === option ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            {error && (
                <div className="text-red-500 text-[14px] mt-1 font-[Poppins]">
                    * {error}
                </div>
            )}
        </div>
    )
}