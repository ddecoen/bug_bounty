'use client';

import { useRef } from 'react';
import { InvoiceData } from '@/app/page';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface InvoicePreviewProps {
  invoiceData: InvoiceData;
  onBack: () => void;
}

export default function InvoicePreview({ invoiceData, onBack }: InvoicePreviewProps) {
  const invoiceRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!invoiceRef.current) return;

    try {
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`bug-bounty-invoice-${invoiceData.invoiceName}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(parseFloat(amount));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <button
          onClick={onBack}
          className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
        >
          ← Back to Form
        </button>
        <button
          onClick={generatePDF}
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition duration-200"
        >
          Download PDF
        </button>
      </div>

      <div
        ref={invoiceRef}
        className="bg-white shadow-lg rounded-lg p-8 print:shadow-none print:rounded-none"
        style={{ minHeight: '800px' }}
      >
        {/* Invoice Header */}
        <div className="border-b-2 border-gray-200 pb-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">INVOICE</h1>
              <p className="text-lg text-gray-600">Bug Bounty Payment</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Invoice #</p>
              <p className="text-xl font-semibold text-gray-800">{invoiceData.invoiceName}</p>
              <p className="text-sm text-gray-600 mt-2">Date: {formatDate(invoiceData.invoiceDate)}</p>
            </div>
          </div>
        </div>

        {/* Bill To Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Bill To:</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium text-gray-800">{invoiceData.payeeName}</p>
            <div className="text-gray-600 mt-2 whitespace-pre-line">
              {invoiceData.payeeAddress}
            </div>
            <p className="text-gray-600 mt-2">{invoiceData.payeeEmail}</p>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Service Details:</h2>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Description</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Date Discovered</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-200">
                  <td className="px-4 py-4 text-sm text-gray-800">
                    <div className="font-medium mb-1">Security Vulnerability Discovery</div>
                    <div className="text-gray-600 whitespace-pre-line">{invoiceData.description}</div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {formatDate(invoiceData.bugDate)}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-800 text-right">
                    {formatCurrency(invoiceData.amount)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Total Section */}
        <div className="border-t-2 border-gray-200 pt-6">
          <div className="flex justify-end">
            <div className="w-64">
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium">{formatCurrency(invoiceData.amount)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-t border-gray-200">
                <span className="text-lg font-semibold text-gray-800">Total:</span>
                <span className="text-lg font-bold text-gray-800">{formatCurrency(invoiceData.amount)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="text-center text-sm text-gray-500">
            <p>Thank you for helping improve our security!</p>
            <p className="mt-2">This invoice was generated on {formatDate(new Date().toISOString().split('T')[0])}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
