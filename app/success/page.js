'use client'

import { useEffect, useState } from 'react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function SuccessPage() {
  const [sessionId, setSessionId] = useState('')

  useEffect(() => {
    // Get session ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search)
    const session = urlParams.get('session_id')
    setSessionId(session)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <CheckCircleIcon className="mx-auto h-12 w-12 text-green-600" />
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              Payment Successful!
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Thank you for your purchase. Your subscription has been activated.
            </p>
            
            {sessionId && (
              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-gray-500">Session ID: {sessionId}</p>
              </div>
            )}
            
            <div className="mt-6 space-y-3">
              <Link
                href="/"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Return to Dashboard
              </Link>
              
              <Link
                href="/pricing"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                View Plans
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
