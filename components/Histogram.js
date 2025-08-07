'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function Histogram({ data, columns }) {
  const [chartData, setChartData] = useState(null)
  const [selectedColumn, setSelectedColumn] = useState('')
  const [availableColumns, setAvailableColumns] = useState([])
  const [binCount, setBinCount] = useState(10)

  useEffect(() => {
    if (columns && columns.length > 0) {
      const numericColumns = columns.filter(column => {
        return data.some(row => {
          const value = parseFloat(row[column])
          return !isNaN(value)
        })
      })
      setAvailableColumns(numericColumns)
      if (numericColumns.length > 0) {
        setSelectedColumn(numericColumns[0])
      }
    }
  }, [columns, data])

  useEffect(() => {
    if (data && data.length > 0 && selectedColumn) {
      const numericData = data
        .map(row => parseFloat(row[selectedColumn]))
        .filter(value => !isNaN(value))

      if (numericData.length > 0) {
        const min = Math.min(...numericData)
        const max = Math.max(...numericData)
        const binSize = (max - min) / binCount

        const bins = Array.from({ length: binCount }, (_, i) => {
          const binStart = min + i * binSize
          const binEnd = min + (i + 1) * binSize
          const count = numericData.filter(value => 
            value >= binStart && value < (i === binCount - 1 ? binEnd + 0.001 : binEnd)
          ).length
          return {
            label: `${binStart.toFixed(2)} - ${binEnd.toFixed(2)}`,
            count
          }
        })

        setChartData({
          labels: bins.map(bin => bin.label),
          datasets: [
            {
              label: `Frequency`,
              data: bins.map(bin => bin.count),
              backgroundColor: 'rgba(59, 130, 246, 0.8)',
              borderColor: 'rgba(59, 130, 246, 1)',
              borderWidth: 1,
            },
          ],
        })
      }
    }
  }, [data, selectedColumn, binCount])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Histogram',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Frequency: ${context.parsed.y}`
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: selectedColumn,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Frequency',
        },
        beginAtZero: true,
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
          <p className="text-gray-500">No data available for histogram</p>
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
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Histogram Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Column
            </label>
            <select
              value={selectedColumn}
              onChange={(e) => setSelectedColumn(e.target.value)}
              className="input-field"
            >
              {availableColumns.map((column) => (
                <option key={column} value={column}>
                  {column}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Bins
            </label>
            <input
              type="number"
              min="5"
              max="50"
              value={binCount}
              onChange={(e) => setBinCount(parseInt(e.target.value))}
              className="input-field"
            />
          </div>
        </div>
      </div>

      <div className="h-96">
        {chartData ? (
          <Bar data={chartData} options={options} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select a numeric column to create histogram</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
