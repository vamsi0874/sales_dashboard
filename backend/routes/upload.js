const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const XLSX = require('xlsx');
const Invoice = require('../models/invoice');
const HistoricalSales = require('../models/historicalSales');

// Helper to convert DD.MM.YYYY to JS Date
const parseDate = (dateStr) => {
  if (!dateStr) return null;
  const [day, month, year] = dateStr.split('.').map(Number);
  if (!day || !month || !year) return null;
  return new Date(year, month - 1, day);
};

// Function to process a single CSV file using streams
const processCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const invoicesBatch = [];
    const BATCH_SIZE = 500;

    const branchName = path.basename(filePath, '.csv').split('.')[0];
    console.log(branchName);

    const stream = fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', async (row) => {
        invoicesBatch.push({
          entityName: row['Entity Name'],
          branchRegion: row['Branch Region'],
          branch: branchName,
          division: row['Division'],
          dueDate: parseDate(row['Due Date']),
          topLevelCustomerId: row['Top Level Customer ID'] ? Number(row['Top Level Customer ID']) : null,
          topLevelCustomerName: row['Top Level Customer Name'],
          customerId: row['Customer ID'] ? Number(row['Customer ID']) : null,
          customer: row['Customer'],
          billingGroupId: row['Billing Group ID'] ? Number(row['Billing Group ID']) : null,
          billingGroup: row['Billing Group'],
          invoiceId: row['Invoice ID'] ? Number(row['Invoice ID']) : null,
          invoiceNumber: row['Invoice #'],
          issueDate: parseDate(row['Issue Date']),
          total: row['Total'] ? parseFloat(row['Total'].replace(/,/g, '')) : 0,
          outstanding: row['Outstanding'] ? parseFloat(row['Outstanding'].replace(/,/g, '')) : 0,
          delivery: row['Delivery'],
          status: row['Status']
        });

        if (invoicesBatch.length >= BATCH_SIZE) {
          stream.pause();
          await Invoice.insertMany(invoicesBatch.splice(0, invoicesBatch.length));
          stream.resume();
        }
      })
      .on('end', async () => {
        if (invoicesBatch.length > 0) {
          await Invoice.insertMany(invoicesBatch);
        }
        console.log(`${branchName} uploaded successfully`);
        resolve();
      })
      .on('error', (err) => {
        console.error(`Error processing ${branchName}:`, err);
        reject(err);
      });
  });
};

// Helper function to process a sheet
const processSheet = (workbook, sheetName) => {
  const sheet = workbook.Sheets[sheetName];
  const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  const headerRow0 = rawData[0];
  const salesYearIndices = headerRow0
    .map((val, idx) => (typeof val === 'string' && val.includes('/') ? idx : -1))
    .filter(idx => idx !== -1);

  const newColumnNames = ['Week', ...salesYearIndices.map(idx => String(headerRow0[idx]))];
  const dataRows = rawData.slice(2).map(row => [row[0], ...salesYearIndices.map(idx => row[idx])]);
  const filteredRows = dataRows.filter(row => /^Week\s\d+/.test(String(row[0])));

  const records = [];
  filteredRows.forEach(row => {
    const week = parseInt(String(row[0]).replace('Week ', ''), 10);
    salesYearIndices.forEach((_, i) => {
      const total = parseFloat(String(row[i + 1]).replace(/,/g, '')) || 0;
      records.push({
        Week: week,
        FinancialYear: newColumnNames[i + 1],
        Total: total,
        Branch: sheetName
      });
    });
  });

  return records;
};


// Route to process all CSV files in 'data' folder
router.get('/upload-csv', async (req, res) => {
  const folderPath = path.join(__dirname, '../data');
  const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.CSV'));

  try {
    for (const file of files) {
      const filePath = path.join(folderPath, file);
      await processCSV(filePath); // Process sequentially
    }
    res.send('All CSV files uploaded successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error uploading CSV files');
  }
});

router.get('/upload-excel', async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../data/HISTORICAL_REPORT.xlsx');
    const workbook = XLSX.readFile(filePath);

    const sheetNames = ['WA', 'QLD', 'NSW'];
    const allRecords = [];

    sheetNames.forEach(sheetName => {
      const sheetRecords = processSheet(workbook, sheetName);
      allRecords.push(...sheetRecords);
    });

    if (allRecords.length > 0) {
      await HistoricalSales.insertMany(allRecords);
    }

    res.send('Historical Excel data uploaded successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error uploading Excel data.');
  }
});

module.exports = router;
