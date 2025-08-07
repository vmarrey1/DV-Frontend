'use client'

import { motion } from 'framer-motion'
import { BarChart3, Table, PieChart, TrendingUp, Database, Zap } from 'lucide-react'

const features = [
  {
    icon: Database,
    title: 'Data Upload',
    description: 'Upload CSV, Excel, and other data formats with drag-and-drop functionality.',
    color: 'bg-blue-500',
  },
  {
    icon: Table,
    title: 'Data Tables',
    description: 'View and explore your data in interactive, sortable tables.',
    color: 'bg-green-500',
  },
  {
    icon: BarChart3,
    title: 'Scatter Plots',
    description: 'Create scatter plots to visualize relationships between variables.',
    color: 'bg-purple-500',
  },
  {
    icon: PieChart,
    title: 'Histograms',
    description: 'Generate histograms to understand data distribution patterns.',
    color: 'bg-orange-500',
  },
  {
    icon: TrendingUp,
    title: 'Analytics',
    description: 'Get insights and statistical analysis of your data.',
    color: 'bg-red-500',
  },
  {
    icon: Zap,
    title: 'Fast Processing',
    description: 'Lightning-fast data processing and visualization generation.',
    color: 'bg-yellow-500',
  },
]

export default function FeatureCards() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            Powerful Data Visualization Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Upload your data and explore it with our comprehensive suite of visualization tools
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card hover:shadow-xl transition-shadow duration-300"
              >
                <div className={`inline-flex p-3 rounded-lg ${feature.color} text-white mb-4`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
