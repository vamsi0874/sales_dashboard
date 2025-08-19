"use client"

import { useEffect, useState } from "react"
import { ChevronDown, X } from "lucide-react"
import axios from "axios"
import api from "@/api"


export default function MultiCustomerSelect() {
  const [customers, setCustomers] = useState<string[]>([])
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)

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

  const toggleCustomer = (cust: string) => {
    setSelectedCustomers((prev) => (prev.includes(cust) ? prev.filter((c) => c !== cust) : [...prev, cust]))
  }

  const removeCustomer = (cust: string) => {
    setSelectedCustomers((prev) => prev.filter((c) => c !== cust))
  }

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
  }

  return (
    <div
      className={`bg-gray-100 rounded-lg shadow-lg transition-all duration-300 ${
        selectedCustomers.length > 0 ? "w-full max-w-sm" : "w-64"
      }`}
    >
      <div className="p-3 border-b border-gray-100">
        <h3 className="text-base font-semibold text-gray-800">Select Customer(s)</h3>
      </div>

      <div className="p-3">
        <div
          className={`border-2 border-blue-200 rounded-lg bg-blue-50/30 transition-all duration-300 ${
            selectedCustomers.length > 0 ? "p-2 min-h-[60px] mb-3" : "p-1.5 min-h-[40px] mb-2"
          }`}
        >
          <div className="flex flex-wrap gap-1.5">
            {selectedCustomers.map((customer, idx) => (
              <div
                key={idx}
                className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1.5 shadow-sm hover:bg-blue-600 transition-colors"
              >
                <span className="font-medium">{truncateText(customer, 12)}</span>
                <button
                  onClick={() => removeCustomer(customer)}
                  className="hover:bg-blue-700 rounded-full p-0.5 transition-colors"
                  aria-label={`Remove ${customer}`}
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
          <div
            className={`flex justify-end transition-all duration-200 ${selectedCustomers.length > 0 ? "mt-2" : "mt-1"}`}
          >
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Toggle customer list"
            >
              <ChevronDown
                size={16}
                className={`transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>

        {isOpen && (
          <div
            className={`space-y-1 overflow-y-auto border border-gray-200 rounded-lg bg-white shadow-sm transition-all duration-300 ${
              selectedCustomers.length > 0 ? "max-h-48" : "max-h-32"
            }`}
          >
            {customers
              .filter((customer) => !selectedCustomers.includes(customer))
              .map((customer, idx) => (
                <button
                  key={idx}
                  onClick={() => toggleCustomer(customer)}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors first:rounded-t-lg last:rounded-b-lg border-b border-gray-100 last:border-b-0"
                >
                  <span className="font-medium">{customer}</span>
                </button>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
