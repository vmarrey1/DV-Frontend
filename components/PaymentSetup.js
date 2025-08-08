'use client'

import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const PaymentForm = ({ email, onSuccess }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    
    if (!stripe || !elements) {
      return
    }

    setLoading(true)
    setError('')

    try {
      // Create payment method
      const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      })

      if (paymentMethodError) {
        setError(paymentMethodError.message)
        setLoading(false)
        return
      }

      // Setup payment method on backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/setup-payment-method`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          payment_method_id: paymentMethod.id
        }),
      })

      const data = await response.json()

      if (data.error) {
        setError(data.error)
      } else {
        onSuccess(data)
      }
    } catch (err) {
      setError('An error occurred while setting up payment method.')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Information
        </label>
        <div className="border border-gray-300 rounded-md p-3">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
      </div>

      {error && (
        <div className="text-red-600 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Setting up payment method...' : 'Setup Payment Method'}
      </button>
    </form>
  )
}

const PaymentMethodsList = ({ email, paymentMethods, onDelete }) => {
  const [loading, setLoading] = useState(false)

  const handleDelete = async (paymentMethodId) => {
    if (!confirm('Are you sure you want to delete this payment method?')) {
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/delete-payment-method`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          payment_method_id: paymentMethodId
        }),
      })

      const data = await response.json()
      if (data.error) {
        alert(data.error)
      } else {
        onDelete(paymentMethodId)
      }
    } catch (err) {
      alert('Error deleting payment method')
    }
    setLoading(false)
  }

  if (paymentMethods.length === 0) {
    return (
      <div className="text-gray-500 text-center py-4">
        No payment methods found
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {paymentMethods.map((method) => (
        <div key={method.payment_method_id} className="border border-gray-200 rounded-md p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="text-lg">
                {method.card_brand === 'visa' && '💳'}
                {method.card_brand === 'mastercard' && '💳'}
                {method.card_brand === 'amex' && '💳'}
                {method.card_brand === 'discover' && '💳'}
              </div>
              <div>
                <div className="font-medium">
                  {method.card_brand.charAt(0).toUpperCase() + method.card_brand.slice(1)} •••• {method.card_last4}
                </div>
                <div className="text-sm text-gray-500">
                  Expires {method.card_exp_month}/{method.card_exp_year}
                  {method.is_default && (
                    <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      Default
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={() => handleDelete(method.payment_method_id)}
              disabled={loading}
              className="text-red-600 hover:text-red-800 disabled:opacity-50"
            >
              {loading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

const PaymentSetup = () => {
  const [email, setEmail] = useState('')
  const [paymentMethods, setPaymentMethods] = useState([])
  const [showSetup, setShowSetup] = useState(false)
  const [setupSuccess, setSetupSuccess] = useState(false)

  const fetchPaymentMethods = async () => {
    if (!email) return

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/get-payment-methods/${encodeURIComponent(email)}`)
      const data = await response.json()
      
      if (response.ok) {
        setPaymentMethods(data)
      } else {
        console.error('Error fetching payment methods:', data.error)
      }
    } catch (err) {
      console.error('Error fetching payment methods:', err)
    }
  }

  useEffect(() => {
    if (email) {
      fetchPaymentMethods()
    }
  }, [email])

  const handleSetupSuccess = (data) => {
    setSetupSuccess(true)
    setShowSetup(false)
    fetchPaymentMethods()
    setTimeout(() => setSetupSuccess(false), 3000)
  }

  const handleDeletePaymentMethod = (paymentMethodId) => {
    setPaymentMethods(paymentMethods.filter(method => method.payment_method_id !== paymentMethodId))
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method Setup</h2>
        
        {/* Email Input */}
        <div className="mb-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your email address"
          />
        </div>

        {email && (
          <>
            {/* Existing Payment Methods */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Your Payment Methods</h3>
              <PaymentMethodsList 
                email={email} 
                paymentMethods={paymentMethods} 
                onDelete={handleDeletePaymentMethod}
              />
            </div>

            {/* Add New Payment Method */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium text-gray-900">Add New Payment Method</h3>
                <button
                  onClick={() => setShowSetup(!showSetup)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  {showSetup ? 'Cancel' : 'Add Payment Method'}
                </button>
              </div>

              {showSetup && (
                <div className="border border-gray-200 rounded-md p-4">
                  <Elements stripe={stripePromise}>
                    <PaymentForm email={email} onSuccess={handleSetupSuccess} />
                  </Elements>
                </div>
              )}
            </div>

            {/* Success Message */}
            {setupSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                Payment method setup successfully!
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default PaymentSetup
