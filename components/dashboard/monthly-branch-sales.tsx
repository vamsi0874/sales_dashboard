"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts"
import { useEffect, useState } from "react"
import axios from "axios"
import api from "@/api"

export default function YearlyBranchSales({
  branch,
  startDate,
  endDate,
}: {
  branch: string[]
  startDate: Date
  endDate: Date
}) {
  const [data, setData] = useState<any[]>([])
  const [branches, setBranches] = useState<string[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("/sales/monthly", {
          params: {
            branch: branch.join(",") || "All",
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          },
        })

        const json = res.data

        // collect all unique branches
        const branchSet = new Set<string>()
        json.forEach((item: any) => branchSet.add(item.branch))

        // reshape data for Recharts (group by financialYear)
        const grouped: Record<string, any> = {}
        json.forEach(({ financialYear, branch, sales }: any) => {
          if (!grouped[financialYear]) grouped[financialYear] = { financialYear }
          grouped[financialYear][branch] = sales
        })

        setData(Object.values(grouped))
        setBranches(Array.from(branchSet))
      } catch (error) {
        console.error("Error fetching yearly sales data:", error)
      }
    }
    fetchData()
  }, [branch, startDate, endDate])

  return (
    <Card>
      <CardHeader>
        <CardTitle>📊 Financial Year Sales by Branch</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="financialYear" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`$${Number(value).toLocaleString()}`, "Sales"]}
              />
              <Legend />
              {branches.map((b, i) => (
                <Bar key={b} dataKey={b} fill={["#3b82f6", "#1d4ed8", "#ef4444", "#10b981", "#f59e0b"][i % 5]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
