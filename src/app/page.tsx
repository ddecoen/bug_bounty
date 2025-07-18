'use client';

import { useState } from 'react';
import InvoiceForm from '@/components/InvoiceForm';
import InvoicePreview from '@/components/InvoicePreview';

export interface InvoiceData {
  amount: string;
  bugDate: string;
  description: string;
  invoiceDate: string;
  invoiceName: string;
  payeeName: string;
  payeeAddress: string;
  payeeEmail: string;
}

export default function Home() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleFormSubmit = (data: InvoiceData) => {
    setInvoiceData(data);
    setShowPreview(true);
  };

  const handleBackToForm = () => {
    setShowPreview(false);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Bug Bounty Invoice Generator
        </h1>
        
        {!showPreview ? (
          <InvoiceForm onSubmit={handleFormSubmit} />
        ) : (
          <InvoicePreview 
            invoiceData={invoiceData!} 
            onBack={handleBackToForm}
          />
        )}
      </div>
    </main>
  );
}
