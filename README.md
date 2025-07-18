# Bug Bounty Invoice Generator

A professional web application for generating bug bounty invoices with PDF export functionality. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 📝 **Professional Invoice Generation**: Create detailed invoices for bug bounty payments
- 💰 **Amount Tracking**: Specify payment amounts with automatic currency formatting
- 📅 **Date Management**: Track bug discovery dates and invoice dates
- 📄 **PDF Export**: Generate and download professional PDF invoices
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Clean UI**: Modern, professional interface built with Tailwind CSS

## Required Information

The application collects the following information for invoice generation:

- **Amount**: Payment amount in USD
- **Bug Discovery Date**: When the security vulnerability was discovered
- **Bug Description**: Detailed description of the security issue
- **Invoice Date**: Date the invoice is being generated
- **Invoice Name/Number**: Unique identifier for the invoice
- **Payee Name**: Name of the person receiving payment
- **Payee Address**: Complete mailing address
- **Payee Email**: Contact email address

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ddecoen/bug_bounty.git
   cd bug_bounty
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)

This application is optimized for Vercel deployment:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with zero configuration

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ddecoen/bug_bounty)

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Railway
- Render
- DigitalOcean App Platform

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **PDF Generation**: jsPDF + html2canvas
- **Deployment**: Vercel

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles
└── components/
    ├── InvoiceForm.tsx     # Invoice input form
    └── InvoicePreview.tsx  # Invoice preview and PDF generation
```

## Usage

1. **Fill out the form**: Enter all required information for the bug bounty payment
2. **Preview the invoice**: Review the generated invoice for accuracy
3. **Download PDF**: Click "Download PDF" to save the invoice as a PDF file
4. **Edit if needed**: Use the "Back to Form" button to make changes

## Features in Detail

### PDF Generation
- High-quality PDF output using jsPDF and html2canvas
- Professional invoice layout
- Automatic file naming based on invoice number
- Print-optimized styling

### Form Validation
- All fields are required
- Email format validation
- Date format validation
- Numeric amount validation

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support or questions, please open an issue on GitHub.
