'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Scatter } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function ScatterPlot({ data, columns }) {
  const [chartData, setChartData] = useState(null)
  const [selectedX, setSelectedX] = useState('')
  const [selectedY, setSelectedY] = useState('')
  const [availableColumns, setAvailableColumns] = useState([])
  const [numericColumns, setNumericColumns] = useState([])

  useEffect(() => {
    if (columns && columns.length > 0) {
      setAvailableColumns(columns)
      
      // Identify numeric columns
      const numeric = columns.filter(col => 
        data && data.some(row => {
          const value = parseFloat(row[col])
          return !isNaN(value)
        })
      )
      setNumericColumns(numeric)
      
      if (columns.length >= 2) {
        setSelectedX(columns[0])
        setSelectedY(columns[1])
      }
    }
  }, [columns, data])

  useEffect(() => {
    if (data && data.length > 0 && selectedX && selectedY) {
      const numericData = data.filter(row => {
        const xVal = parseFloat(row[selectedX])
        const yVal = parseFloat(row[selectedY])
        return !isNaN(xVal) && !isNaN(yVal)
      })

      if (numericData.length > 0) {
        setChartData({
          datasets: [
            {
              label: `${selectedY} vs ${selectedX}`,
              data: numericData.map(row => ({
                x: parseFloat(row[selectedX]),
                y: parseFloat(row[selectedY])
              })),
              backgroundColor: 'rgba(59, 130, 246, 0.6)',
              borderColor: 'rgba(59, 130, 246, 1)',
              borderWidth: 1,
              pointRadius: 4,
              pointHoverRadius: 6,
            },
          ],
        })
      }
    }
  }, [data, selectedX, selectedY])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Scatter Plot',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${selectedX}: ${context.parsed.x}, ${selectedY}: ${context.parsed.y}`
          }
        }
      }
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: selectedX,
        },
      },
      y: {
        title: {
          display: true,
          text: selectedY,
        },
      },
    },
  }

  if (!data || data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="text-center py-8">
          <p className="text-gray-500">No data available for scatter plot</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Scatter Plot Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              X Axis
            </label>
            <select
              value={selectedX}
              onChange={(e) => setSelectedX(e.target.value)}
              className="input-field"
            >
              {availableColumns.map((column) => (
                <option key={column} value={column}>
                  {column}{numericColumns.includes(column) ? ' (numeric)' : ''}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Y Axis
            </label>
            <select
              value={selectedY}
              onChange={(e) => setSelectedY(e.target.value)}
              className="input-field"
            >
              {availableColumns.map((column) => (
                <option key={column} value={column}>
                  {column}{numericColumns.includes(column) ? ' (numeric)' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="h-96">
        {chartData ? (
          <Scatter data={chartData} options={options} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select numeric columns to create scatter plot</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
