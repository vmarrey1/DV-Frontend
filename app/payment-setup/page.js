import PaymentSetup from '../../components/PaymentSetup'

export default function PaymentSetupPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Payment Setup</h1>
          <p className="mt-2 text-gray-600">
            Manage your payment methods and billing information
          </p>
        </div>
        <PaymentSetup />
      </div>
    </div>
  )
}
