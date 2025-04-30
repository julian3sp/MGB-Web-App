"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../ui/Popover"

export function SRQDropdown({ options, value, setValue, error, clearError, placeholder, originalValue, width, styledOptions }: {
    options: string[];
    value: string;
    setValue: (value: string) => void;
    error?: string;
    clearError?: () => void;
    placeholder: string;
    styledOptions?: (option: string) => string;
    originalValue?: string;
    width?: string;
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
                        className={`w-full h-[48px] font-[Poppins] text-[14px] shadow font-normal justify-between ${value === "" && !open ? "text-gray-500" : "text-black"} ${width || 'w-[396px]'} ${styledOptions ? styledOptions(value) : ''}`}
                        onClick={() => console.log("Dropdown pressed")}
                    >
                        {value
                            ? options.find((option) => option === value)
                            : placeholder}
                        <ChevronDown className={`opacity-50 ${!open ? "text-gray-500" : "text-black"}`} />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[362px] max-h-[275px] p-0 font-[Poppins]">
                    <Command>
                        <CommandList>
                            <CommandGroup>
                                {options.map((option) => {
                                    const displayOption = (originalValue === value) ? `${option}*` : option;
                                    const optionStyle = styledOptions ? styledOptions(value) : '';
                                    return (
                                        <CommandItem
                                            key={option}
                                            value={option}
                                            onSelect={(currentValue) => {
                                                setValue(currentValue === value ? "" : currentValue);
                                                if (clearError) clearError(); // clear error when user selects an option
                                                setOpen(false);
                                            }}
                                        >
                                            {displayOption}
                                            <Check
                                                className={cn(
                                                    "ml-auto",
                                                    value === option ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    )
                                })}
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