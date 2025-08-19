"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const monthlyPurchaseData = [
  { month: "Oct 2023", purchases: 5519.12 },
  { month: "Nov 2023", purchases: 5519.12 },
  { month: "Dec 2023", purchases: 0 },
  { month: "Jan 2024", purchases: 0 },
  { month: "Feb 2024", purchases: 0 },
]

export default function MonthlyPurchaseTrend() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>📈 Monthly Purchase Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyPurchaseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, "Purchases"]} />
              <Line type="monotone" dataKey="purchases" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
