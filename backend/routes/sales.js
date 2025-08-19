// routes/sales.js
import express from "express";
import Invoice from "../models/invoice.js";
import HistoricalSales from "../models/historicalSales.js";

const router = express.Router();

const quarterWeeks = {
  Q1: [1, 13],
  Q2: [14, 26],
  Q3: [27, 39],
  Q4: [40, 52],
};

router.get("/sales", async (req, res) => {
  try {

    console.log('queryyyyyy',req.query);
    const { branch, financialYear, quarter, week } = req.query;

    let filters = {};

    // 🔹 Branches (multiple)
    if (branch && branch !== "All") {
      const branches = branch.split(","); // e.g. NSW,QLD,WA
      filters.Branch = { $in: branches };
    }

    // 🔹 Financial Years (multiple)
    if (financialYear && financialYear !== "All") {
      const years = financialYear.split(","); // e.g. 22/23,23/24
      filters.FinancialYear = { $in: years };
    }

    // 🔹 Quarters (multiple → week ranges)
   // 🔹 Quarters (multiple → week ranges)
if (quarter && quarter !== "AllQuaters") {
  const quarters = quarter.split(","); // e.g. ["Q1 (Weeks 1-13)", "Q3 (Weeks 27-39)"]
  let weekConditions = [];

  quarters.forEach((q) => {
    // Strip label and keep only Q1/Q2/Q3/Q4
    const qKey = q.split(" ")[0];
    if (quarterWeeks[qKey]) {
      const [start, end] = quarterWeeks[qKey];
      weekConditions.push({ Week: { $gte: start, $lte: end } });
    }
  });

  if (weekConditions.length > 0) {
    filters.$or = weekConditions;
  }
}


    // 🔹 Weeks (multiple → overrides quarters if provided)
    if (week && week !== "AllWeeks") {
      const weeks = week.split(",").map((w) => parseInt(w.replace("Week ", ""), 10));
      filters.Week = { $in: weeks };
      delete filters.$or; // remove quarter filter if weeks are selected
    }

    const sales = await HistoricalSales.find(filters).sort({
      FinancialYear: 1,
      Week: 1,
    });

    res.json(sales);
  } catch (error) {
    console.error("Error fetching sales data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/sales-trend", async (req, res) => {
  try {

    console.log('hiiii')
    const { branch, financialYear, week } = req.query;

    let filters = {};

    // 🔹 Branch filter
    if (branch && branch !== "All") {
      const branches = branch.split(","); // e.g. NSW,QLD,WA
      filters.Branch = { $in: branches };
    }

    // 🔹 Financial Year filter
    if (financialYear && financialYear !== "All") {
      const years = financialYear.split(","); // e.g. 22/23,23/24
      filters.FinancialYear = { $in: years };
    }

    // 🔹 Weeks filter
    if (week && week !== "AllWeeks") {
      const weeks = week.split(",").map((w) => parseInt(w.replace("Week ", ""), 10));
      filters.Week = { $in: weeks };
    }

    // 🔹 MongoDB Aggregation
    const sales = await HistoricalSales.aggregate([
      { $match: filters },
      {
        $group: {
          _id: {
            Branch: "$Branch",
            FinancialYear: "$FinancialYear",
            Week: "$Week",
          },
          totalSales: { $sum: "$Total" },
        },
      },
      {
        $sort: {
          "_id.FinancialYear": 1,
          "_id.Week": 1,
        },
      },
      {
        $group: {
          _id: { Branch: "$_id.Branch", FinancialYear: "$_id.FinancialYear" },
          weeklyData: {
            $push: {
              week: "$_id.Week",
              totalSales: "$totalSales",
            },
          },
        },
      },
    ]);

    res.json(sales);
  } catch (error) {
    console.error("Error fetching sales trend:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// GET total sales per year by branch
// GET total sales per year by branch
router.get("/sales/summary", async (req, res) => {
  try {
    const { branch, startYear, endYear } = req.query;

    const filters = {};
    if (branch && branch !== "All") {
      const branches = branch.split(","); // e.g. NSW,QLD,WA
      filters.Branch = { $in: branches };
    }

    const sales = await HistoricalSales.aggregate([
      { $match: filters },
      {
        $group: {
          _id: {
            Branch: "$Branch",
            FinancialYear: "$FinancialYear", // e.g. "22/23"
          },
          totalSales: { $sum: "$Total" },
        },
      },
      { $sort: { "_id.FinancialYear": 1 } },
    ]);

    // ✅ reshape into chart-friendly format
    const result = {};

    sales.forEach((item) => {
      const { Branch, FinancialYear } = item._id;

      // convert "22/23" → 2022
      const yearStart = parseInt(FinancialYear.split("/")[0]) + 2000;

      // apply year range filter
      if (startYear && endYear) {
        if (yearStart < parseInt(startYear) || yearStart > parseInt(endYear)) {
          return; // skip out of range
        }
      }

      if (!result[FinancialYear]) {
        result[FinancialYear] = { year: FinancialYear }; // keep "22/23" for chart
      }

      result[FinancialYear][Branch] = item.totalSales;
    });

    res.json(Object.values(result)); // return as array
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET monthly sales by branch
router.get("/sales/monthly", async (req, res) => {
  try {
    const { branch, startDate, endDate } = req.query;

    // ✅ convert input dates into Year + Month
    const start = new Date(startDate);
    const end = new Date(endDate);
    const startYear = start.getFullYear();
    const endYear = end.getFullYear();

    const filters = {};

    // ✅ branch filter
    if (branch && branch !== "All") {
      const branches = branch.split(","); // e.g. NSW,QLD,WA
      filters.Branch = { $in: branches };
    }

    // ✅ financial year filter (works with "22/23" style)
    filters.$expr = {
      $and: [
        {
          $gte: [
            { $add: [2000, { $toInt: { $substr: ["$FinancialYear", 0, 2] } }] },
            startYear,
          ],
        },
        {
          $lte: [
            { $add: [2000, { $toInt: { $substr: ["$FinancialYear", 3, 2] } }] },
            endYear,
          ],
        },
      ],
    };

    const sales = await HistoricalSales.aggregate([
      { $match: filters },
      {
        $group: {
          _id: {
            Branch: "$Branch",
            FinancialYear: "$FinancialYear",
          },
          totalSales: { $sum: "$Total" },
        },
      },
      { $sort: { "_id.FinancialYear": 1 } },
    ]);

    // ✅ reshape for frontend
    const result = sales.map((item) => {
      const { Branch, FinancialYear } = item._id;
      return {
        financialYear: FinancialYear, // e.g. "22/23"
        branch: Branch,
        sales: item.totalSales,
      };
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/customers
router.get("/customers", async (req, res) => {
  try {
    // Get distinct customer names only
    const customers = await Invoice.distinct("customer");

    res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
router.get("/customers/invoices", async (req, res) => {
  try {
    let { customers, startDate, endDate } = req.query;

    // Build query object dynamically
    let query = {};

    // Customers filter (optional)
    if (customers && customers.trim() !== "") {
      const customerArray = customers.split(",").map((c) => c.trim());
      query.customer = { $in: customerArray };
    }

    // Date filter (optional)
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      query.issueDate = { $gte: start, $lte: end };
    }

    // Fetch invoices
    const invoices = await Invoice.find(query).lean();

    // Transform response
    const result = invoices.map((inv) => ({
      customer: inv.customer,
      issueDate: new Date(inv.issueDate).toISOString().split("T")[0], // YYYY-MM-DD
      branch: inv.branch || "",
      invoiceId: inv.invoiceId,
      total: inv.total,
    }));

    res.json(result);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ error: "Server error" });
  }
});


export default router;
