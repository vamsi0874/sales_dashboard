"use client"
import axios from "axios"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import api from "@/api"

export default function FinancialYearComparison({
  branch,
  yearRange,
}: {
  branch: string[]
  yearRange: number[]
}) {
  const [financialYearSalesData, setFinancialYearSalesData] = useState<any[]>([])

  const handleFinancialYear = async () => {
    try {
      const response = await api.get("/sales/summary", {
        params: {
          branch:'All',
          startYear: yearRange[0],
          endYear: yearRange[1],
        },
      })

      console.log("Fetched Financial Year Data:", response.data)

      // 🔄 transform API response to chart format
      const formattedData = response.data.map((item: any) => ({
        year: item.year,
        WA: item.WA || 0,
        NSW: item.NSW || 0,
        QLD: item.QLD || 0,
      }))

      setFinancialYearSalesData(formattedData)
    } catch (error) {
      console.error("Error fetching financial year data:", error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await handleFinancialYear()
    }
    fetchData()
  }, [branch, yearRange])

  return (
    <Card>
      <CardHeader>
        <CardTitle>📅 Financial Year Total Sales Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={financialYearSalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, ""]} />
              <Legend />
              <Bar dataKey="WA" fill="#3b82f6" name="WA" />
              <Bar dataKey="NSW" fill="#1d4ed8" name="NSW" />
              <Bar dataKey="QLD" fill="#ef4444" name="QLD" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
