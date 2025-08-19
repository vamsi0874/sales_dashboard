// "use client"

// import * as React from "react"
// import { CalendarIcon } from "lucide-react"
// import type { DateRange } from "react-day-picker"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// export function DatePickerWithRange({ className }: React.HTMLAttributes<HTMLDivElement>) {
//   const [date, setDate] = React.useState<DateRange | undefined>({
//     from: new Date(2018, 8, 5), // September 5, 2018
//     to: new Date(2025, 6, 17), // July 17, 2025
//   })

//   return (
//     <div className={cn("grid gap-2", className)}>
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button
//             id="date"
//             variant="outline"
//             className={cn(
//               "w-full justify-start text-left font-normal bg-sidebar-accent border-sidebar-border text-sidebar-foreground",
//               !date && "text-muted-foreground",
//             )}
//           >
//             <CalendarIcon className="mr-2 h-4 w-4" />
//             {date?.from ? (
//               date.to ? (
//                 <>
//                   {date.from.toLocaleDateString()} – {date.to.toLocaleDateString()}
//                 </>
//               ) : (
//                 date.from.toLocaleDateString()
//               )
//             ) : (
//               <span>Pick a date range</span>
//             )}
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-auto p-0" align="start">
//           <Calendar
//             initialFocus
//             mode="range"
//             defaultMonth={date?.from}
//             selected={date}
//             onSelect={setDate}
//             numberOfMonths={2}
//           />
//         </PopoverContent>
//       </Popover>
//     </div>
//   )
// }

"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type Props = {
  className?: string
  value?: DateRange
  onChange?: (range: DateRange | undefined) => void
}

export function DatePickerWithRange({ className, value, onChange }: Props) {
  const [date, setDate] = React.useState<DateRange | undefined>(
    value || {
      from: new Date(2018, 8, 5), // September 5, 2018
      to: new Date(2025, 6, 17), // July 17, 2025
    }
  )

  const handleSelect = (range: DateRange | undefined) => {
    setDate(range)
    onChange?.(range) // notify parent
    console.log("Date range selected:", range)
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal bg-sidebar-accent border-sidebar-border text-sidebar-foreground",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {date.from.toLocaleDateString()} – {date.to.toLocaleDateString()}
                </>
              ) : (
                date.from.toLocaleDateString()
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
