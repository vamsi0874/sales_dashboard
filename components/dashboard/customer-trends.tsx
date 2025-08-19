import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const customerTrendsData = [
  { customer: "A.H. Civil Engineering", "2024": 0, "2025": 2825.32 },
  { customer: "ABM Landscaping", "2024": 0, "2025": 5910.84 },
  { customer: "Alexanderson Plumbing Group", "2024": 0, "2025": 3699.83 },
  { customer: "Alkimos Pipeline Alliance", "2024": 0, "2025": 8985.6 },
  { customer: "BB Civil", "2024": 0, "2025": 23349.7 },
  { customer: "BMD Urban Pty Ltd", "2024": 126984.3, "2025": 162207.8 },
  { customer: "Benno Plumbing & Civil", "2024": 0, "2025": 19771.7 },
  { customer: "Bucci Group Pty Ltd", "2024": 0, "2025": 4050.48 },
  { customer: "CATS Corporation (Australia)", "2024": 0, "2025": 89565.07 },
  { customer: "Connect Site Services Pty Ltd", "2024": 9199579, "2025": 10000465 },
]

export default function CustomerTrends() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Trends (Drop vs Rise)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg max-h-96 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className="text-right">2024</TableHead>
                <TableHead className="text-right">2025</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customerTrendsData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{row.customer}</TableCell>
                  <TableCell className="text-right">{row["2024"].toLocaleString()}</TableCell>
                  <TableCell className="text-right">{row["2025"].toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
