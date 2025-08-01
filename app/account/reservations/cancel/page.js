import Link from "next/link";

export default function PaymentCancel() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="mb-8">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-primary-800 mb-4">
          Payment Cancelled
        </h1>
        <p className="text-lg text-primary-600 mb-8">
          Your payment was cancelled. Don&apos;t worry, no charges were made to
          your account.
        </p>
      </div>

      <div className="space-y-4">
        <Link
          href="/cabins"
          className="inline-block bg-accent-500 text-primary-800 px-6 py-3 rounded-lg hover:bg-accent-600 transition-colors"
        >
          Browse Cabins
        </Link>
        <div>
          <Link
            href="/account/reservations"
            className="inline-block text-primary-600 hover:text-primary-700 underline"
          >
            View My Reservations
          </Link>
        </div>
      </div>
    </div>
  );
}
