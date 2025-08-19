"use client"

import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { useState, useEffect } from "react"
import api from "@/api"

export default function SalesTrendChart({
  branches,
  financialYears,
}: {
  branches: string[]
  financialYears: string[]
}) {
  const [salesTrendData, setSalesTrendData] = useState<any[]>([])

  const handleSalesTrendData = async () => {
    try {
      const response = await api.get("/sales-trend", {
        params: {
          branch: branches.length > 0 ? branches.join(",") : "All",
          financialYear: financialYears.length > 0 ? financialYears.join(",") : "All",
          week:'AllWeeks'
        },
      })

      // 🔹 Transform API response → Recharts format
      const transformed: Record<number, any> = {}
      response.data.forEach((series: any) => {
        const seriesKey = `${series._id.Branch}-${series._id.FinancialYear}`

        series.weeklyData.forEach((point: any) => {
          if (!transformed[point.week]) {
            transformed[point.week] = { week: point.week }
          }
          transformed[point.week][seriesKey] = point.totalSales
        })
      })

      setSalesTrendData(Object.values(transformed))
    } catch (error) {
      console.error("Error fetching sales trend data:", error)
    }
  }

  useEffect(() => {
    handleSalesTrendData()
  }, [branches, financialYears])

  // Nice color palette for multiple lines
  const colors = ["#3b82f6", "#ef4444", "#22c55e", "#a855f7", "#f59e0b", "#14b8a6"]

  return (
    <Card className="shadow-md rounded-2xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-gray-800">
          Sales Trend for Selected Range
        </CardTitle>
        <p className="text-sm text-gray-500">
          Weekly sales comparison across selected branches and years
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-96 bg-gray-50 rounded-xl p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="week" tick={{ fontSize: 12, fill: "#6b7280" }} />
              <YAxis
                tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                tick={{ fontSize: 12, fill: "#6b7280" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
                formatter={(value, name) => [
                  `$${Number(value).toLocaleString()}`,
                  name,
                ]}
              />
              <Legend wrapperStyle={{ paddingTop: "10px" }} />
              {/* Dynamically render lines */}
              {salesTrendData.length > 0 &&
                Object.keys(salesTrendData[0])
                  .filter((key) => key !== "week")
                  .map((key, idx) => (
                    <Line
                      key={key}
                      type="monotone"
                      dataKey={key}
                      stroke={colors[idx % colors.length]}
                      strokeWidth={2.5}
                      dot={{ r: 3 }}
                      activeDot={{ r: 6 }}
                    />
                  ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
