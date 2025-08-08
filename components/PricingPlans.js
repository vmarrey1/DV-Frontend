'use client'

import { useState, useEffect } from 'react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { loadStripe } from '@stripe/stripe-js'

const PricingPlans = () => {
  const [plans, setPlans] = useState({})
  const [loading, setLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [email, setEmail] = useState('')

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/plans`)
      const data = await response.json()
      setPlans(data)
    } catch (error) {
      console.error('Error fetching plans:', error)
    }
  }

  const handleSubscribe = async (planId) => {
    if (!email) {
      alert('Please enter your email address')
      return
    }

    setLoading(true)
    try {
      // Create subscription
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/create-subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan_id: planId,
          email: email
        }),
      })

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      // Redirect to Stripe Checkout
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
      
      const { error } = await stripe.redirectToCheckout({
        lineItems: [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: data.plan.name,
            },
            unit_amount: data.plan.price,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        }],
        mode: 'subscription',
        successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/pricing`,
        customerEmail: email,
      })

      if (error) {
        throw new Error(error.message)
      }

    } catch (error) {
      console.error('Error creating subscription:', error)
      alert('Error creating subscription: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleOneTimePayment = async (planId) => {
    if (!email) {
      alert('Please enter your email address')
      return
    }

    setLoading(true)
    try {
      // Create payment intent
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan_id: planId
        }),
      })

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      // Redirect to Stripe Checkout
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
      
      const { error } = await stripe.redirectToCheckout({
        lineItems: [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: data.plan.name + ' (One-time)',
            },
            unit_amount: data.plan.price,
          },
          quantity: 1,
        }],
        mode: 'payment',
        successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/pricing`,
        customerEmail: email,
      })

      if (error) {
        throw new Error(error.message)
      }

    } catch (error) {
      console.error('Error creating payment:', error)
      alert('Error creating payment: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price) => {
    return `$${(price / 100).toFixed(2)}`
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Choose the right plan for your data visualization needs
          </p>
        </div>
        
        {/* Email Input */}
        <div className="mx-auto max-w-md mt-8">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter your email"
          />
        </div>

        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-y-6 sm:mt-20 sm:max-w-none sm:grid-cols-3">
          {Object.entries(plans).map(([planId, plan]) => (
            <div
              key={planId}
              className={`relative flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 ${
                planId === 'pro' ? 'ring-2 ring-indigo-600' : ''
              }`}
            >
              {planId === 'pro' && (
                <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-3 py-2 text-sm font-medium text-white">
                  Most popular
                </div>
              )}
              
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3 className="text-lg font-semibold leading-8 text-gray-900">
                    {plan.name}
                  </h3>
                </div>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">
                    {formatPrice(plan.price)}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
                </p>
                <p className="mt-6 text-sm leading-6 text-gray-600">
                  Perfect for {planId === 'basic' ? 'individuals' : planId === 'pro' ? 'teams' : 'enterprises'}
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-8 space-y-2">
                <button
                  onClick={() => handleSubscribe(planId)}
                  disabled={loading}
                  className={`w-full rounded-md px-3 py-2 text-center text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    planId === 'pro'
                      ? 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600'
                      : 'bg-white text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:bg-gray-50'
                  }`}
                >
                  {loading ? 'Processing...' : 'Subscribe Monthly'}
                </button>
                
                <button
                  onClick={() => handleOneTimePayment(planId)}
                  disabled={loading}
                  className="w-full rounded-md px-3 py-2 text-center text-sm font-semibold text-gray-600 ring-1 ring-inset ring-gray-200 hover:bg-gray-50"
                >
                  {loading ? 'Processing...' : 'One-time Payment'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PricingPlans
