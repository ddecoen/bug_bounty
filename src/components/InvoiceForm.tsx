'use client';

import { useState } from 'react';
import { InvoiceData } from '@/app/page';

interface InvoiceFormProps {
  onSubmit: (data: InvoiceData) => void;
}

export default function InvoiceForm({ onSubmit }: InvoiceFormProps) {
  const [formData, setFormData] = useState<InvoiceData>({
    amount: '',
    bugDate: '',
    description: '',
    invoiceDate: new Date().toISOString().split('T')[0],
    invoiceName: '',
    payeeName: '',
    payeeAddress: '',
    payeeEmail: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Create Bug Bounty Invoice</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              Amount ($)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="1000.00"
            />
          </div>

          <div>
            <label htmlFor="bugDate" className="block text-sm font-medium text-gray-700 mb-2">
              Date of Bug Discovery
            </label>
            <input
              type="date"
              id="bugDate"
              name="bugDate"
              value={formData.bugDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="invoiceDate" className="block text-sm font-medium text-gray-700 mb-2">
              Invoice Date
            </label>
            <input
              type="date"
              id="invoiceDate"
              name="invoiceDate"
              value={formData.invoiceDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="invoiceName" className="block text-sm font-medium text-gray-700 mb-2">
              Invoice Name/Number
            </label>
            <input
              type="text"
              id="invoiceName"
              name="invoiceName"
              value={formData.invoiceName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="INV-2024-001"
            />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Bug Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Detailed description of the bug found and its impact..."
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800">Payee Information</h3>
          
          <div>
            <label htmlFor="payeeName" className="block text-sm font-medium text-gray-700 mb-2">
              Payee Name
            </label>
            <input
              type="text"
              id="payeeName"
              name="payeeName"
              value={formData.payeeName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="payeeAddress" className="block text-sm font-medium text-gray-700 mb-2">
              Payee Address
            </label>
            <textarea
              id="payeeAddress"
              name="payeeAddress"
              value={formData.payeeAddress}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="123 Main St\nCity, State 12345\nCountry"
            />
          </div>

          <div>
            <label htmlFor="payeeEmail" className="block text-sm font-medium text-gray-700 mb-2">
              Payee Email
            </label>
            <input
              type="email"
              id="payeeEmail"
              name="payeeEmail"
              value={formData.payeeEmail}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="john.doe@example.com"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-200"
          >
            Generate Invoice
          </button>
        </div>
      </form>
    </div>
  );
}
