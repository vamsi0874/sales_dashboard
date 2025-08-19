"use client"

import { useEffect, useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { X } from "lucide-react"
import { DatePickerWithRange } from "@/components/date-picker-with-range"
import axios from "axios"
import { DateRange } from "react-day-picker"
import api from "@/api"

export default function CustomerPurchaseDetail() {
  const [selectedAnalysisCustomers, setSelectedAnalysisCustomers] = useState<string[]>([])
  const [customers, setCustomers] = useState<any>([])
  const [purchaseRecordsData, setPurchaseRecordsData] = useState<any[]>([])
  const [range, setRange] = useState<DateRange | undefined>()

  const handleAnalysisCustomerToggle = (customer: string) => {
    setSelectedAnalysisCustomers((prev) =>
      prev.includes(customer) ? prev.filter((c) => c !== customer) : [...prev, customer],
    )
  }

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const res = await api.get("/customers")
        setCustomers(res.data)
      } catch (err) {
        console.error("Error fetching customers:", err)
      }
    }
    fetchCustomers()
  }, [])

  const getSelectedAnalysisCustomersData = async () => {
    const res = await api.get("/customers/invoices", {
      params: {
        customers: selectedAnalysisCustomers.join(",") || undefined,
        startDate: range?.from?.toISOString(),
        endDate: range?.to?.toISOString(),
      },
    })

    setPurchaseRecordsData(res.data)
  }

  useEffect(() => {
    getSelectedAnalysisCustomersData()
  }, [selectedAnalysisCustomers, range])

  // 🔹 Calculate total dynamically
  const totalPurchase = useMemo(() => {
    return purchaseRecordsData.reduce((sum, row) => sum + (row.total || 0), 0)
  }, [purchaseRecordsData])

  return (
    <Card>
      <CardHeader>
        <CardTitle>🧾 Customer-wise Purchase Detail</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Select Customer(s) to Analyze */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Customer(s) to Analyze</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {selectedAnalysisCustomers.map((customer) => (
              <Badge key={customer} variant="secondary" className="flex items-center gap-1">
                {customer}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 hover:bg-transparent"
                  onClick={() => handleAnalysisCustomerToggle(customer)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
          <Select onValueChange={(value) => handleAnalysisCustomerToggle(value)}>
            <SelectTrigger className="max-w-xs">
              <SelectValue placeholder="Choose customers" />
            </SelectTrigger>
            <SelectContent>
              {customers
                .filter((customer: any) => !selectedAnalysisCustomers.includes(customer))
                .map((customer: any) => (
                  <SelectItem key={customer} value={customer}>
                    {customer}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date Range for Purchase Analysis */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Date Range for Purchase Analysis</label>
          <DatePickerWithRange value={range} onChange={setRange} />
        </div>

        {/* Filtered Purchase Records */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Filtered Purchase Records</h3>
          <div className="border rounded-lg max-h-[400px] overflow-y-auto">
            {/* 🔹 Internally scrollable table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchaseRecordsData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{row.customer}</TableCell>
                    <TableCell>{new Date(row.issueDate).toLocaleDateString()}</TableCell>
                    <TableCell>{row.branch}</TableCell>
                    <TableCell>{row.invoiceId}</TableCell>
                    <TableCell className="text-right">${row?.total?.toFixed(2) || 0}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* 🔹 Dynamic Total */}
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Total Purchase for Filtered Records</h3>
            <p className="text-2xl font-bold text-green-600">${totalPurchase.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
