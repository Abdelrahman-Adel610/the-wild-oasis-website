import Link from "next/link";

export default function PaymentSuccess() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h1 className="text-3xl font-bold    mb-4">Payment Successful!</h1>
        <p className="text-lg text-primary-600 mb-8">
          Thank you for your booking. Your reservation has been confirmed and
          you will receive a confirmation email shortly.
        </p>
      </div>

      <div className="space-y-4">
        <Link
          href="/account/reservations"
          className="inline-block bg-accent-500 text-primary-800 px-6 py-3 rounded-lg hover:bg-accent-600 transition-colors"
        >
          View My Reservations
        </Link>
        <div>
          <Link
            href="/cabins"
            className="inline-block text-primary-600 hover:text-primary-700 underline"
          >
            Book Another Cabin
          </Link>
        </div>
      </div>
    </div>
  );
}
