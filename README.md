# DV Frontend - Modern Data Visualization Platform

A modern, responsive data visualization platform built with Next.js, featuring drag-and-drop file uploads, interactive charts, and beautiful UI components.

## 🚀 Features

- **Modern UI/UX**: Built with Next.js 14, Tailwind CSS, and Framer Motion
- **Drag & Drop Upload**: Easy file upload with visual feedback
- **Interactive Visualizations**: 
  - Sortable data tables with pagination
  - Configurable scatter plots
  - Customizable histograms
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Real-time Data**: Live data fetching and visualization updates
- **Smooth Animations**: Beautiful transitions and micro-interactions

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: Lucide React
- **File Upload**: React Dropzone
- **HTTP Client**: Axios

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎨 Key Components

### File Upload
- Drag and drop interface
- File type validation
- Upload progress feedback
- Error handling

### Data Table
- Sortable columns
- Pagination
- Responsive design
- Hover effects

### Scatter Plot
- Configurable X and Y axes
- Interactive tooltips
- Smooth animations
- Data filtering

### Histogram
- Adjustable bin count
- Column selection
- Real-time updates
- Professional styling

## 🎯 Usage

1. **Upload Data**: Drag and drop your CSV or Excel file on the home page
2. **View Data**: Navigate to the Data page to explore your uploaded data
3. **Visualize**: Choose between table, scatter plot, or histogram views
4. **Configure**: Customize your visualizations with the provided controls

## 🔧 Configuration

The platform connects to a backend API at `https://54.219.131.177` for:
- File uploads (`/upload`)
- Data retrieval (`/getData`)
- Column headers (`/getHeader`)

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🎨 Design System

- **Colors**: Primary blue theme with semantic color usage
- **Typography**: Inter font family
- **Spacing**: Consistent 8px grid system
- **Components**: Reusable card and button components
- **Animations**: Smooth transitions and micro-interactions

## 🚀 Performance

- Server-side rendering with Next.js
- Optimized bundle size
- Lazy loading of components
- Efficient data handling

## 📄 License

This project is licensed under the MIT License.
