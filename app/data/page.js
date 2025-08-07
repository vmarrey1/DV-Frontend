'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart3, Table, PieChart, Eye } from 'lucide-react'
import NavigationBar from '../../components/NavigationBar'
import DataTable from '../../components/DataTable'
import ScatterPlot from '../../components/ScatterPlot'
import Histogram from '../../components/Histogram'
import axios from 'axios'

const visualizationTypes = [
  { id: 'table', name: 'Data Table', icon: Table, color: 'bg-blue-500' },
  { id: 'scatter', name: 'Scatter Plot', icon: BarChart3, color: 'bg-green-500' },
  { id: 'histogram', name: 'Histogram', icon: PieChart, color: 'bg-purple-500' },
]

export default function DataPage() {
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])
  const [selectedVisualization, setSelectedVisualization] = useState('table')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [dataResponse, columnsResponse] = await Promise.all([
          axios.get('https://54.219.131.177/getData'),
          axios.get('https://54.219.131.177/getHeader')
        ])
        
        setData(dataResponse.data)
        setColumns(columnsResponse.data)
        setError(null)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Failed to load data. Please try uploading a file first.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const renderVisualization = () => {
    switch (selectedVisualization) {
      case 'table':
        return <DataTable data={data} columns={columns} />
      case 'scatter':
        return <ScatterPlot data={data} columns={columns} />
      case 'histogram':
        return <Histogram data={data} columns={columns} />
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavigationBar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading data...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavigationBar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="card">
            <div className="text-center py-8">
              <div className="text-red-500 mb-4">
                <Eye className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Data Available</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <a href="/" className="btn-primary">
                Upload Data
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Visualization</h1>
          <p className="text-gray-600">Explore your data with different visualization types</p>
        </div>

        {/* Visualization Type Selector */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            {visualizationTypes.map((type) => {
              const Icon = type.icon
              const isActive = selectedVisualization === type.id
              
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedVisualization(type.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                    isActive
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:border-primary-300 hover:bg-gray-50'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${type.color} text-white`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="font-medium">{type.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Data Summary */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">{data.length}</div>
                <div className="text-sm text-gray-600">Total Rows</div>
              </div>
            </div>
            <div className="card">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">{columns.length}</div>
                <div className="text-sm text-gray-600">Total Columns</div>
              </div>
            </div>
            <div className="card">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">
                  {columns.filter(col => 
                    data.some(row => {
                      const value = parseFloat(row[col])
                      return !isNaN(value)
                    })
                  ).length}
                </div>
                <div className="text-sm text-gray-600">Numeric Columns</div>
              </div>
            </div>
          </div>
        </div>

        {/* Visualization Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedVisualization}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderVisualization()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
