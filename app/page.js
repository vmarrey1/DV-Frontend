import NavigationBar from '../components/NavigationBar'
import FileUpload from '../components/FileUpload'
import FeatureCards from '../components/FeatureCards'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Data Visualization
            <span className="text-primary-600"> Platform</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Upload your data and explore it with powerful visualization tools. 
            Create scatter plots, histograms, and interactive tables with ease.
          </p>
        </div>

        {/* File Upload Section */}
        <div className="mb-16">
          <FileUpload />
        </div>

        {/* Features Section */}
        <FeatureCards />
      </main>
    </div>
  )
}
