"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const yearlyPurchaseData = [
  { year: "2022.6", purchases: 0 },
  { year: "2022.8", purchases: 0 },
  { year: "2023", purchases: 5200 },
  { year: "2023.2", purchases: 5200 },
  { year: "2023.4", purchases: 5200 },
]

export default function YearwisePurchaseTotals() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>📊 Year-wise Purchase Totals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={yearlyPurchaseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, "Purchases"]} />
              <Bar dataKey="purchases" fill="#06b6d4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
