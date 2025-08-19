// "use client"

// import axios from "axios"
// import { useEffect, useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Slider } from "@/components/ui/slider"
// import { Badge } from "@/components/ui/badge"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { X, ChevronLeft, ChevronRight, Calendar } from "lucide-react"
// import { DatePickerWithRange } from "@/components/date-picker-with-range"
// import {
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts"

// const branches = ["NSW", "QLD", "WA"]
// const financialYears = ["18/19", "19/20", "20/21", "21/22", "22/23", "23/24", "24/25"]
// const quarters = ["All Quarters", "Q1 (Weeks 1-13)", "Q2 (Weeks 14-26)", "Q3 (Weeks 27-39)", "Q4 (Weeks 40-52)"]
// const weeks = Array.from({ length: 52 }, (_, i) => `Week ${i + 1}`)
// const customers = [
//   "A.H. Civil Engineering",
//   "ABM Landscaping",
//   "AGS Civil Pty Ltd",
//   "ALLDINA",
//   "MUR Constructions",
//   "BMD Urban Pty Ltd",
//   "Benno Plumbing & Civil",
//   "Bucci Group Pty Ltd",
//   "CATS Corporation (Australia)",
//   "Connect Site Services Pty Ltd",
// ]

// // Mock data
// const salesData = [
//   { sno: 1, branch: "NSW", financialYear: "23/24", week: 45, total: 125000 },
//   { sno: 2, branch: "QLD", financialYear: "23/24", week: 46, total: 98000 },
//   { sno: 3, branch: "WA", financialYear: "24/25", week: 1, total: 156000 },
//   { sno: 4, branch: "NSW", financialYear: "24/25", week: 2, total: 134000 },
//   { sno: 5, branch: "QLD", financialYear: "24/25", week: 3, total: 87000 },
// ]

// const financialYearSalesData = [
//   { year: "18/19", WA: 2500000, NSW: 500000, QLD: 300000 },
//   { year: "19/20", WA: 6000000, NSW: 800000, QLD: 400000 },
//   { year: "20/21", WA: 14500000, NSW: 1200000, QLD: 600000 },
//   { year: "21/22", WA: 21500000, NSW: 1800000, QLD: 800000 },
//   { year: "22/23", WA: 28500000, NSW: 2200000, QLD: 1000000 },
//   { year: "23/24", WA: 35200000, NSW: 2800000, QLD: 1200000 },
//   { year: "24/25", WA: 35800000, NSW: 3200000, QLD: 1400000 },
// ]

// const salesTrendData = [
//   { week: 1, sales: 450000 },
//   { week: 2, sales: 452000 },
//   { week: 3, sales: 458000 },
//   { week: 4, sales: 461000 },
//   { week: 5, sales: 465000 },
// ]

// const customerTrendsData = [
//   { customer: "A.H. Civil Engineering", "2024": 0, "2025": 2825.32 },
//   { customer: "ABM Landscaping", "2024": 0, "2025": 5910.84 },
//   { customer: "Alexanderson Plumbing Group", "2024": 0, "2025": 3699.83 },
//   { customer: "Alkimos Pipeline Alliance", "2024": 0, "2025": 8985.6 },
//   { customer: "BB Civil", "2024": 0, "2025": 23349.7 },
//   { customer: "BMD Urban Pty Ltd", "2024": 126984.3, "2025": 162207.8 },
//   { customer: "Benno Plumbing & Civil", "2024": 0, "2025": 19771.7 },
//   { customer: "Bucci Group Pty Ltd", "2024": 0, "2025": 4050.48 },
//   { customer: "CATS Corporation (Australia)", "2024": 0, "2025": 89565.07 },
//   { customer: "Connect Site Services Pty Ltd", "2024": 9199579, "2025": 10000465 },
// ]

// const purchaseRecordsData = [
//   { customer: "101 Construction", issueDate: "2023-11-16", branch: "WA", invoiceId: "24958", total: 444.76 },
//   { customer: "101 Construction", issueDate: "2023-11-23", branch: "WA", invoiceId: "25161", total: 1946.21 },
//   { customer: "101 Construction", issueDate: "2023-11-23", branch: "WA", invoiceId: "25162", total: 1278.76 },
//   { customer: "101 Construction", issueDate: "2023-11-30", branch: "WA", invoiceId: "25347", total: 1849.39 },
// ]

// const yearlyPurchaseData = [
//   { year: "2022.6", purchases: 0 },
//   { year: "2022.8", purchases: 0 },
//   { year: "2023", purchases: 5200 },
//   { year: "2023.2", purchases: 5200 },
//   { year: "2023.4", purchases: 5200 },
// ]

// const monthlyPurchaseData = [
//   { month: "Oct 2023", purchases: 5519.12 },
//   { month: "Nov 2023", purchases: 5519.12 },
//   { month: "Dec 2023", purchases: 0 },
//   { month: "Jan 2024", purchases: 0 },
//   { month: "Feb 2024", purchases: 0 },
// ]

// export default function Dashboard() {


//   const [selectedBranches, setSelectedBranches] = useState<string[]>([])
//   const [selectedFinancialYears, setSelectedFinancialYears] = useState<string[]>(["18/19"])
//   const [selectAllFinancialYears, setSelectAllFinancialYears] = useState(false)
//   const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])
//   const [selectedQuarters, setSelectedQuarters] = useState<string[]>([])
//   const [selectedWeeks, setSelectedWeeks] = useState<string[]>([])
//   const [selectedAnalysisCustomers, setSelectedAnalysisCustomers] = useState<string[]>([])
//   const [yearRange, setYearRange] = useState([2018, 2025])
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

//   const [salesData, setSalesData] = useState<any[]>([])
// const handleSalesData = async () => {
//   try {
//     const response = await axios.get("http://localhost:5000/api/sales", {
//       params: {
//         branch: selectedBranches.length > 0 ? selectedBranches.join(",") : "All",
//         financialYear: selectAllFinancialYears
//           ? "All"
//           : selectedFinancialYears.join(","),
//         quarter: selectedQuarters.length > 0 ? selectedQuarters.join(",") : "All",
//         week: selectedWeeks.length > 0 ? selectedWeeks.join(",") : "All",
        
//       },
//     });


//     setSalesData(response.data);

//     console.log("Fetched Sales Data:", response.data);


//     // 👉 update state where you store table data
//     // setSalesData(response.data);

//   } catch (error) {
//     console.error("Error fetching sales data:", error);
//   }
// };

//   const handleBranchToggle = (branch: string) => {
//     setSelectedBranches((prev) => (prev.includes(branch) ? prev.filter((b) => b !== branch) : [...prev, branch]))
//   }

//   const handleFinancialYearToggle = (year: string) => {
//     setSelectedFinancialYears((prev) => (prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]))
//   }

//   const handleSelectAllFinancialYears = (checked: boolean) => {
//     setSelectAllFinancialYears(checked)
//     if (checked) {
//       setSelectedFinancialYears(financialYears)
//     } else {
//       setSelectedFinancialYears([])
//     }
//   }

//   const handleQuarterToggle = (quarter: string) => {
//     setSelectedQuarters((prev) => (prev.includes(quarter) ? prev.filter((q) => q !== quarter) : [...prev, quarter]))
//   }

//   const handleWeekToggle = (week: string) => {
//     setSelectedWeeks((prev) => (prev.includes(week) ? prev.filter((w) => w !== week) : [...prev, week]))
//   }

//   const handleAnalysisCustomerToggle = (customer: string) => {
//     setSelectedAnalysisCustomers((prev) =>
//       prev.includes(customer) ? prev.filter((c) => c !== customer) : [...prev, customer],
//     )
//   }

//   useEffect(()=>{
//     handleSalesData()

//   },[selectAllFinancialYears, selectedBranches, selectedCustomers, selectedFinancialYears, selectedQuarters, selectedWeeks])
//   return (
//     <div className="flex h-screen bg-background">
//       {/* Sidebar - keeping existing code */}
//       <div
//         className={`${sidebarCollapsed ? "w-12" : "w-80"} bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col`}
//       >
//         {/* Sidebar Header */}
//         <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
//           {!sidebarCollapsed && <h2 className="text-lg font-semibold text-sidebar-foreground">Filters</h2>}
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
//             className="text-sidebar-foreground hover:bg-sidebar-accent"
//           >
//             {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
//           </Button>
//         </div>

//         {/* Sidebar Content */}
//         {!sidebarCollapsed && (
//           <div className="flex-1 overflow-y-auto p-4 space-y-6">
//             {/* Select Branch(es) */}
//             <div className="space-y-2">
//               <label className="text-sm font-medium text-sidebar-foreground">Select Branch(es)</label>
//               <div className="flex flex-wrap gap-2 mb-2">
//                 {selectedBranches.map((branch) => (
//                   <Badge key={branch} variant="destructive" className="flex items-center gap-1">
//                     {branch}
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="h-4 w-4 p-0 hover:bg-transparent"
//                       onClick={() => handleBranchToggle(branch)}
//                     >
//                       <X className="h-3 w-3" />
//                     </Button>
//                   </Badge>
//                 ))}
//               </div>
//               <Select onValueChange={(value) => handleBranchToggle(value)}>
//                 <SelectTrigger className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground">
//                   <SelectValue placeholder="Choose options" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {branches
//                     .filter((branch) => !selectedBranches.includes(branch))
//                     .map((branch) => (
//                       <SelectItem key={branch} value={branch}>
//                         {branch}
//                       </SelectItem>
//                     ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Select All Financial Years */}
//             <div className="flex items-center space-x-2">
//               <Checkbox
//                 id="select-all-fy"
//                 checked={selectAllFinancialYears}
//                 onCheckedChange={handleSelectAllFinancialYears}
//               />
//               <label htmlFor="select-all-fy" className="text-sm text-sidebar-foreground">
//                 Select All Financial Years
//               </label>
//             </div>

//             {/* Select Financial Year(s) */}
//             <div className="space-y-2">
//               <label className="text-sm font-medium text-sidebar-foreground">
//                 Select Financial Year(s) (Historical Data)
//               </label>
//               <div className="flex flex-wrap gap-2 mb-2">
//                 {selectedFinancialYears.map((year) => (
//                   <Badge key={year} variant="destructive" className="flex items-center gap-1">
//                     {year}
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       className="h-4 w-4 p-0 hover:bg-transparent"
//                       onClick={() => handleFinancialYearToggle(year)}
//                     >
//                       <X className="h-3 w-3" />
//                     </Button>
//                   </Badge>
//                 ))}
//               </div>
//               <Select onValueChange={(value) => handleFinancialYearToggle(value)}>
//                 <SelectTrigger className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground">
//                   <SelectValue placeholder="Choose options" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {financialYears
//                     .filter((year) => !selectedFinancialYears.includes(year))
//                     .map((year) => (
//                       <SelectItem key={year} value={year}>
//                         {year}
//                       </SelectItem>
//                     ))}
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Select Customer(s) */}
//             <div className="space-y-2">
//               <label className="text-sm font-medium text-sidebar-foreground">Select Customer(s)</label>
//               <Select>
//                 <SelectTrigger className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground">
//                   <SelectValue placeholder="Choose options" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="customer1">Customer 1</SelectItem>
//                   <SelectItem value="customer2">Customer 2</SelectItem>
//                   <SelectItem value="customer3">Customer 3</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Select Year Range */}
//             <div className="space-y-4">
//               <label className="text-sm font-medium text-sidebar-foreground">Select Year Range</label>
//               <div className="px-2">
//                 <Slider
//                   value={yearRange}
//                   onValueChange={setYearRange}
//                   max={2025}
//                   min={2018}
//                   step={1}
//                   className="w-full"
//                 />
//                 <div className="flex justify-between text-sm text-sidebar-foreground mt-2">
//                   <span className="text-red-400">{yearRange[0]}</span>
//                   <span className="text-red-400">{yearRange[1]}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Filter by Issue Date Range */}
//             <div className="space-y-2">
//               <label className="text-sm font-medium text-sidebar-foreground">Filter by Issue Date Range</label>
//               <DatePickerWithRange />
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <header className="bg-card border-b border-border p-4">
//           <h1 className="text-2xl font-bold text-foreground">📊 Invoice & Customer Analysis Dashboard</h1>
//           <p className="text-muted-foreground">Comprehensive business analytics and customer insights</p>
//         </header>

//         <main className="flex-1 overflow-y-auto p-6 space-y-8">
//           {/* Annual Sales Analysis */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Calendar className="h-5 w-5" />📅 Annual Sales Analysis
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {/* Quarter/Week Range Analysis */}
//               <div className="space-y-4">
//                 <h3 className="text-lg font-semibold">Quarter/Week Range Analysis</h3>

//                 {/* Select Quarter(s) */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">Select Quarter(s)</label>
//                   <div className="flex flex-wrap gap-2 mb-2">
//                     {selectedQuarters.map((quarter) => (
//                       <Badge key={quarter} variant="secondary" className="flex items-center gap-1">
//                         {quarter}
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="h-4 w-4 p-0 hover:bg-transparent"
//                           onClick={() => handleQuarterToggle(quarter)}
//                         >
//                           <X className="h-3 w-3" />
//                         </Button>
//                       </Badge>
//                     ))}
//                   </div>
//                   <Select onValueChange={(value) => handleQuarterToggle(value)}>
//                     <SelectTrigger className="max-w-xs">
//                       <SelectValue placeholder="Choose quarters" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {quarters
//                         .filter((quarter) => !selectedQuarters.includes(quarter))
//                         .map((quarter) => (
//                           <SelectItem key={quarter} value={quarter}>
//                             {quarter}
//                           </SelectItem>
//                         ))}
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 {/* Select Specific Week(s) */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium">Or, Select Specific Week(s)</label>
//                   <div className="flex flex-wrap gap-2 mb-2 max-h-20 overflow-y-auto">
//                     {selectedWeeks.map((week) => (
//                       <Badge key={week} variant="secondary" className="flex items-center gap-1">
//                         {week}
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           className="h-4 w-4 p-0 hover:bg-transparent"
//                           onClick={() => handleWeekToggle(week)}
//                         >
//                           <X className="h-3 w-3" />
//                         </Button>
//                       </Badge>
//                     ))}
//                   </div>
//                   <Select onValueChange={(value) => handleWeekToggle(value)}>
//                     <SelectTrigger className="max-w-xs">
//                       <SelectValue placeholder="Choose weeks" />
//                     </SelectTrigger>
//                     <SelectContent className="max-h-60">
//                       {weeks
//                         .filter((week) => !selectedWeeks.includes(week))
//                         .map((week) => (
//                           <SelectItem key={week} value={week}>
//                             {week}
//                           </SelectItem>
//                         ))}
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               {/* Detailed Sales Table */}
//               <div className="space-y-4">
//                 <h3 className="text-lg font-semibold">Detailed Sales for Selected Range</h3>
//                 <div className="border rounded-lg">
//                   <Table>
//                     <TableHeader>
//                       <TableRow>
//                         <TableHead>S.No</TableHead>
//                         <TableHead>Branch</TableHead>
//                         <TableHead>Financial Year</TableHead>
//                         <TableHead>Week</TableHead>
//                         <TableHead className="text-right">Total</TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {salesData.map((row) => (
//                         <TableRow key={row.sno}>
//                           <TableCell>{row.sno}</TableCell>
//                           <TableCell>{row.branch}</TableCell>
//                           <TableCell>{row.financialYear}</TableCell>
//                           <TableCell>{row.week}</TableCell>
//                           <TableCell className="text-right">${row.total.toLocaleString()}</TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </div>
//               </div>

//               {/* Total Sales Summary */}
//               <div className="bg-muted p-4 rounded-lg">
//                 <h3 className="text-lg font-semibold mb-2">Total Sales for Selected Range</h3>
//                 <p className="text-3xl font-bold text-green-600">$4,750,606.00</p>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Sales Trend Chart */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Sales Trend for Selected Range</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="h-80">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart data={salesTrendData}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="week" />
//                     <YAxis />
//                     <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, "Sales"]} />
//                     <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Financial Year Total Sales Comparison */}
//           <Card>
//             <CardHeader>
//               <CardTitle>📅 Financial Year Total Sales Comparison</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="h-96">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={financialYearSalesData}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="year" />
//                     <YAxis />
//                     <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, ""]} />
//                     <Legend />
//                     <Bar dataKey="WA" fill="#3b82f6" name="WA" />
//                     <Bar dataKey="NSW" fill="#1d4ed8" name="NSW" />
//                     <Bar dataKey="QLD" fill="#ef4444" name="QLD" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Monthly Branch Sales */}
//           <Card>
//             <CardHeader>
//               <CardTitle>📅 Monthly Branch Sales</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="h-80">
//                 <img
//                   src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/monthly_sales_branch-ejE712gtdKJEG2Zp4ni0iMGwa5f4eL.png"
//                   alt="Monthly Sales by Branch"
//                   className="w-full h-full object-contain rounded-lg"
//                 />
//               </div>
//             </CardContent>
//           </Card>

//           {/* Customer Trends */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Customer Trends (Drop vs Rise)</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="border rounded-lg max-h-96 overflow-y-auto">
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Customer</TableHead>
//                       <TableHead className="text-right">2024</TableHead>
//                       <TableHead className="text-right">2025</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {customerTrendsData.map((row, index) => (
//                       <TableRow key={index}>
//                         <TableCell className="font-medium">{row.customer}</TableCell>
//                         <TableCell className="text-right">{row["2024"].toLocaleString()}</TableCell>
//                         <TableCell className="text-right">{row["2025"].toLocaleString()}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Customer-wise Purchase Detail */}
//           <Card>
//             <CardHeader>
//               <CardTitle>🧾 Customer-wise Purchase Detail</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {/* Select Customer(s) to Analyze */}
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Select Customer(s) to Analyze</label>
//                 <div className="flex flex-wrap gap-2 mb-2">
//                   {selectedAnalysisCustomers.map((customer) => (
//                     <Badge key={customer} variant="secondary" className="flex items-center gap-1">
//                       {customer}
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         className="h-4 w-4 p-0 hover:bg-transparent"
//                         onClick={() => handleAnalysisCustomerToggle(customer)}
//                       >
//                         <X className="h-3 w-3" />
//                       </Button>
//                     </Badge>
//                   ))}
//                 </div>
//                 <Select onValueChange={(value) => handleAnalysisCustomerToggle(value)}>
//                   <SelectTrigger className="max-w-xs">
//                     <SelectValue placeholder="Choose customers" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {customers
//                       .filter((customer) => !selectedAnalysisCustomers.includes(customer))
//                       .map((customer) => (
//                         <SelectItem key={customer} value={customer}>
//                           {customer}
//                         </SelectItem>
//                       ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               {/* Date Range for Purchase Analysis */}
//               <div className="space-y-2">
//                 <label className="text-sm font-medium">Select Date Range for Purchase Analysis</label>
//                 <DatePickerWithRange />
//               </div>

//               {/* Filtered Purchase Records */}
//               <div className="space-y-4">
//                 <h3 className="text-lg font-semibold">Filtered Purchase Records</h3>
//                 <div className="border rounded-lg">
//                   <Table>
//                     <TableHeader>
//                       <TableRow>
//                         <TableHead>Customer</TableHead>
//                         <TableHead>Issue Date</TableHead>
//                         <TableHead>Branch</TableHead>
//                         <TableHead>Invoice ID</TableHead>
//                         <TableHead className="text-right">Total</TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {purchaseRecordsData.map((row, index) => (
//                         <TableRow key={index}>
//                           <TableCell className="font-medium">{row.customer}</TableCell>
//                           <TableCell>{new Date(row.issueDate).toLocaleDateString()}</TableCell>
//                           <TableCell>{row.branch}</TableCell>
//                           <TableCell>{row.invoiceId}</TableCell>
//                           <TableCell className="text-right">${row.total.toFixed(2)}</TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </div>
//                 <div className="bg-muted p-4 rounded-lg">
//                   <h3 className="text-lg font-semibold mb-2">Total Purchase for Filtered Records</h3>
//                   <p className="text-2xl font-bold text-green-600">$5,519.12</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Year-wise Purchase Totals */}
//           <Card>
//             <CardHeader>
//               <CardTitle>📊 Year-wise Purchase Totals</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="h-80">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={yearlyPurchaseData}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="year" />
//                     <YAxis />
//                     <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, "Purchases"]} />
//                     <Bar dataKey="purchases" fill="#06b6d4" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Monthly Purchase Trend */}
//           <Card>
//             <CardHeader>
//               <CardTitle>📈 Monthly Purchase Trend</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="h-80">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart data={monthlyPurchaseData}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="month" />
//                     <YAxis />
//                     <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, "Purchases"]} />
//                     <Line type="monotone" dataKey="purchases" stroke="#10b981" strokeWidth={2} />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             </CardContent>
//           </Card>
//         </main>
//       </div>
//     </div>
//   )
// }


"use client"

import { use, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { DatePickerWithRange } from "@/components/date-picker-with-range"
import DashboardHeader from "@/components/dashboard/dashboard-header"
import AnnualSalesAnalysis from "@/components/dashboard/annual-sales-analysis"
import SalesTrendChart from "@/components/dashboard/sales-trend-chart"
import FinancialYearComparison from "@/components/dashboard/financial-year-comparison"
import MonthlyBranchSales from "@/components/dashboard/monthly-branch-sales"
import CustomerTrends from "@/components/dashboard/customer-trends"
import CustomerPurchaseDetail from "@/components/dashboard/customer-purchase-detail"
import YearwisePurchaseTotals from "@/components/dashboard/yearwise-purchase-totals"
import MonthlyPurchaseTrend from "@/components/dashboard/monthly-purchase-trend"
import { DateRange } from "react-day-picker"
import axios from "axios"
import MultiCustomerSelect from "@/components/multi-select-customer"
import api from "@/api"

const branches = ["NSW", "QLD", "WA"]
const financialYears = ["18/19", "19/20", "20/21", "21/22", "22/23", "23/24", "24/25"]

export default function Dashboard() {
  const [selectedBranches, setSelectedBranches] = useState<string[]>([])
  const [selectedFinancialYears, setSelectedFinancialYears] = useState<string[]>([])
  const [selectAllFinancialYears, setSelectAllFinancialYears] = useState(false)
  const [yearRange, setYearRange] = useState([2018, 2025])
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [range, setRange] = useState<DateRange | undefined>()
 

  const handleBranchToggle = (branch: string) => {
    setSelectedBranches((prev) => (prev.includes(branch) ? prev.filter((b) => b !== branch) : [...prev, branch]))
  }

  const handleFinancialYearToggle = (year: string) => {
    setSelectedFinancialYears((prev) => (prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]))
  }

  const handleSelectAllFinancialYears = (checked: boolean) => {
    setSelectAllFinancialYears(checked)
    if (checked) {
      setSelectedFinancialYears(financialYears)
    } else {
      setSelectedFinancialYears([])
    }
  }
 const [customers, setCustomers] = useState<string[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const res = await api.get("/customers") // API from backend
        setCustomers(res.data) // assuming response is ["Kelco Constructions", "ABC Builders", ...]
      } catch (err) {
        console.error("Error fetching customers:", err)
      }
    }
    fetchCustomers()
  }, [])

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`${sidebarCollapsed ? "w-12" : "w-80"} bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
          {!sidebarCollapsed && <h2 className="text-lg font-semibold text-sidebar-foreground">Filters</h2>}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Sidebar Content */}
        {!sidebarCollapsed && (
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Select Branch(es) */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-sidebar-foreground">Select Branch(es)</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedBranches.map((branch) => (
                  <Badge key={branch} variant="destructive" className="flex items-center gap-1">
                    {branch}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => handleBranchToggle(branch)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <Select onValueChange={(value) => handleBranchToggle(value)}>
                <SelectTrigger className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground">
                  <SelectValue placeholder="Choose options" />
                </SelectTrigger>
                <SelectContent>
                  {branches
                    .filter((branch) => !selectedBranches.includes(branch))
                    .map((branch) => (
                      <SelectItem key={branch} value={branch}>
                        {branch}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* Select All Financial Years */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="select-all-fy"
                checked={selectAllFinancialYears}
                onCheckedChange={handleSelectAllFinancialYears}
              />
              <label htmlFor="select-all-fy" className="text-sm text-sidebar-foreground">
                Select All Financial Years
              </label>
            </div>

            {/* Select Financial Year(s) */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-sidebar-foreground">
                Select Financial Year(s) (Historical Data)
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedFinancialYears.map((year) => (
                  <Badge key={year} variant="destructive" className="flex items-center gap-1">
                    {year}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-transparent"
                      onClick={() => handleFinancialYearToggle(year)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <Select onValueChange={(value) => handleFinancialYearToggle(value)}>
                <SelectTrigger className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground">
                  <SelectValue placeholder="Choose options" />
                </SelectTrigger>
                <SelectContent>
                  {financialYears
                    .filter((year) => !selectedFinancialYears.includes(year))
                    .map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {/* Select Customer(s) */}
            {/* <div className="space-y-2">
              <label className="text-sm font-medium text-sidebar-foreground">Select Customer(s)</label>
              <Select>
                <SelectTrigger className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground">
                  <SelectValue placeholder="Choose options" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer1">Customer 1</SelectItem>
                  <SelectItem value="customer2">Customer 2</SelectItem>
                  <SelectItem value="customer3">Customer 3</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
          <MultiCustomerSelect/>

            {/* Select Year Range */}
            <div className="space-y-4">
              <label className="text-sm font-medium text-sidebar-foreground">Select Year Range</label>
              <div className="px-2">
                <Slider
                  value={yearRange}
                  onValueChange={setYearRange}
                  max={2025}
                  min={2018}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-sidebar-foreground mt-2">
                  <span className="text-red-400">{yearRange[0]}</span>
                  <span className="text-red-400">{yearRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Filter by Issue Date Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-sidebar-foreground">Filter by Issue Date Range</label>
                 <DatePickerWithRange value={range} onChange={setRange} /> </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />

        <main className="flex-1 overflow-y-auto p-6 space-y-8">
          <AnnualSalesAnalysis branches= {selectedBranches} financialYears={selectedFinancialYears} />
          <SalesTrendChart branches= {selectedBranches} financialYears={selectedFinancialYears} />
          <FinancialYearComparison branch = {selectedBranches} yearRange={yearRange} />
          {/* <MonthlyBranchSales branch={selectedBranches}
          startDate={range?.from!}
          endDate={range?.to!} /> */}
          <CustomerTrends />
          <CustomerPurchaseDetail />
          <YearwisePurchaseTotals />
          <MonthlyPurchaseTrend />
        </main>
      </div>
    </div>
  )
}
