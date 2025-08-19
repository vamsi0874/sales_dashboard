"use client"

import axios from "axios"
import { use, useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, X } from "lucide-react"
import api from "@/api"

const quarters = ["All Quarters", "Q1 (Weeks 1-13)", "Q2 (Weeks 14-26)", "Q3 (Weeks 27-39)", "Q4 (Weeks 40-52)"]
const weeks = Array.from({ length: 52 }, (_, i) => `Week ${i + 1}`)

const salesDataTemp = [
  { index: 1, Branch: "NSW", FinancialYear: "23/24", week: 45, Total: 125000 },
  { index: 2, Branch: "QLD", FinancialYear: "23/24", week: 46, Total: 98000 },
  { index: 3, Branch: "WA", FinancialYear: "24/25", week: 1, Total: 156000 },
  { index: 4, Branch: "NSW", FinancialYear: "24/25", week: 2, Total: 134000 },
  { index: 5, Branch: "QLD", FinancialYear: "24/25", week: 3, Total: 87000 },
]

export default function AnnualSalesAnalysis({
  branches,
  financialYears,
}: {
  branches: string[];
  financialYears: string[];
}) {

  console.log('branches',branches)
  console.log('financialYears',financialYears)
  const [selectedQuarters, setSelectedQuarters] = useState<string[]>([])
  const [selectedWeeks, setSelectedWeeks] = useState<string[]>([])

  const [salesData, setSalesData] = useState<any[]>(salesDataTemp)

  const [totalSales, setTotalSales] = useState(0)

  const handleQuarterToggle = (quarter: string) => {
    setSelectedQuarters((prev) => (prev.includes(quarter) ? prev.filter((q) => q !== quarter) : [...prev, quarter]))
  }

  const handleWeekToggle = (week: string) => {
    setSelectedWeeks((prev) => (prev.includes(week) ? prev.filter((w) => w !== week) : [...prev, week]))
  }

  const handleSalesData = async () => {
    try {
      const response = await api.get("/sales", {
        params: {
          branch: branches.length > 0 ? branches.join(",") : "All",
          financialYear: financialYears.length > 0 ? financialYears.join(",") : "All",
          quarter: selectedQuarters.length > 0 ? selectedQuarters.join(",") : "AllQuaters",
          week: selectedWeeks.length > 0 ? selectedWeeks.join(",") : "AllWeeks",
        },
      });
      
      
      console.log("Fetched Sales Data:", response.data);

  

      // 👉 update state where you store table data
      setSalesData(response.data);
      setTotalSales(response.data.reduce((acc:number, curr:any) => acc + curr.Total, 0));

    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await handleSalesData();

   
    };
    fetchData();
  }, [branches, financialYears, selectedQuarters, selectedWeeks])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />📅 Annual Sales Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Quarter/Week Range Analysis */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Quarter/Week Range Analysis</h3>

          {/* Select Quarter(s) */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Quarter(s)</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedQuarters.map((quarter) => (
                <Badge key={quarter} variant="secondary" className="flex items-center gap-1">
                  {quarter}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => handleQuarterToggle(quarter)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <Select onValueChange={(value) => handleQuarterToggle(value)}>
              <SelectTrigger className="max-w-xs">
                <SelectValue placeholder="Choose quarters" />
              </SelectTrigger>
              <SelectContent>
                {quarters
                  .filter((quarter) => !selectedQuarters.includes(quarter))
                  .map((quarter) => (
                    <SelectItem key={quarter} value={quarter}>
                      {quarter}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Select Specific Week(s) */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Or, Select Specific Week(s)</label>
            <div className="flex flex-wrap gap-2 mb-2 max-h-20 overflow-y-auto">
              {selectedWeeks.map((week) => (
                <Badge key={week} variant="secondary" className="flex items-center gap-1">
                  {week}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => handleWeekToggle(week)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <Select onValueChange={(value) => handleWeekToggle(value)}>
              <SelectTrigger className="max-w-xs">
                <SelectValue placeholder="Choose weeks" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                {weeks
                  .filter((week) => !selectedWeeks.includes(week))
                  .map((week) => (
                    <SelectItem key={week} value={week}>
                      {week}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>
       
        {/* Detailed Sales Table */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Detailed Sales for Selected Range</h3>
            <div className="border rounded-lg max-h-96 overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-white z-10">
                  <TableRow>
                    <TableHead>S.No</TableHead>
                    <TableHead>Branch</TableHead>
                    <TableHead>Financial Year</TableHead>
                    <TableHead>Week</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salesData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.Branch}</TableCell>
                      <TableCell>{row.FinancialYear}</TableCell>
                      <TableCell>{row.Week}</TableCell>
                      <TableCell className="text-right">${row.Total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>


        {/* Total Sales Summary */}
        <div className="bg-muted p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Total Sales for Selected Range</h3>
          <p className="text-3xl font-bold text-green-600">${totalSales}</p>
        </div>
      </CardContent>
    </Card>
  )
}
