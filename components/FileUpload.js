'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react'
import axios from 'axios'

export default function FileUpload() {
  const router = useRouter()
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0])
      setUploadStatus(null)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    multiple: false,
  })

  const handleUpload = async () => {
    if (!selectedFile) return

    setUploading(true)
    setUploadStatus(null)

    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      if (response.status === 200) {
        setUploadStatus('success')
        setTimeout(() => {
          router.push('/data')
        }, 1500)
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      setUploadStatus('error')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Data</h2>
          <p className="text-gray-600">Upload CSV, Excel, or other data files for analysis</p>
        </div>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-200 ${
            isDragActive
              ? 'border-primary-400 bg-primary-50'
              : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />
          
          <div className="flex flex-col items-center">
            {selectedFile ? (
              <div className="flex items-center space-x-2 text-primary-600">
                <FileText className="h-8 w-8" />
                <span className="font-medium">{selectedFile.name}</span>
              </div>
            ) : (
              <Upload className="h-12 w-12 text-gray-400 mb-4" />
            )}
            
            <p className="text-gray-600 mt-2">
              {isDragActive
                ? 'Drop the file here...'
                : selectedFile
                ? 'File selected. Click to change or drag another file.'
                : 'Drag and drop a file here, or click to select'}
            </p>
            
            {!selectedFile && (
              <p className="text-sm text-gray-500 mt-2">
                Supports CSV, Excel files
              </p>
            )}
          </div>
        </div>

        {selectedFile && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="btn-primary w-full flex items-center justify-center space-x-2"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  <span>Upload File</span>
                </>
              )}
            </button>
          </motion.div>
        )}

        {uploadStatus && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 p-4 rounded-lg flex items-center space-x-2 ${
              uploadStatus === 'success'
                ? 'bg-green-50 text-green-800'
                : 'bg-red-50 text-red-800'
            }`}
          >
            {uploadStatus === 'success' ? (
              <>
                <CheckCircle className="h-5 w-5" />
                <span>File uploaded successfully! Redirecting to data view...</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5" />
                <span>Failed to upload file. Please try again.</span>
              </>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
