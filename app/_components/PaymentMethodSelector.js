"use client";
import { CreditCardIcon, BanknotesIcon } from "@heroicons/react/24/solid";

function PaymentMethodSelector({ paymentMethod, setPaymentMethod }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-primary-200 mb-3">
        <CreditCardIcon className="w-5 h-5 text-accent-500" />
        <h3 className="font-semibold">Payment Method</h3>
      </div>

      <div className="flex flex-col gap-3">
        {/* Cash Payment Option */}
        <label
          className={`
            relative flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
            ${
              paymentMethod === "cash"
                ? "border-accent-500 bg-accent-500/10"
                : "border-primary-700 bg-primary-800 hover:border-primary-600"
            }
          `}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="cash"
            checked={paymentMethod === "cash"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="sr-only"
          />
          <div className="flex items-center gap-3 w-full">
            <div
              className={`
                w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${
                  paymentMethod === "cash"
                    ? "border-accent-500 bg-accent-500"
                    : "border-primary-600"
                }
              `}
            >
              {paymentMethod === "cash" && (
                <div className="w-2 h-2 rounded-full bg-white"></div>
              )}
            </div>
            <BanknotesIcon className="w-6 h-6 text-primary-300" />
            <div className="flex-1">
              <div className="font-medium text-primary-200">Pay on Arrival</div>
              <div className="text-sm text-primary-400">
                Cash payment at check-in
              </div>
            </div>
          </div>
        </label>

        {/* Online Payment Option */}
        <label
          className={`
            relative flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
            ${
              paymentMethod === "online"
                ? "border-accent-500 bg-accent-500/10"
                : "border-primary-700 bg-primary-800 hover:border-primary-600"
            }
          `}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="online"
            checked={paymentMethod === "online"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="sr-only"
          />
          <div className="flex items-center gap-3 w-full">
            <div
              className={`
                w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${
                  paymentMethod === "online"
                    ? "border-accent-500 bg-accent-500"
                    : "border-primary-600"
                }
              `}
            >
              {paymentMethod === "online" && (
                <div className="w-2 h-2 rounded-full bg-white"></div>
              )}
            </div>
            <CreditCardIcon className="w-6 h-6 text-primary-300" />
            <div className="flex-1">
              <div className="font-medium text-primary-200">Pay Online</div>
              <div className="text-sm text-primary-400">
                Secure payment with Stripe
              </div>
            </div>
          </div>
        </label>
      </div>

      {/* Payment Method Info */}
      <div className="bg-primary-800/50 rounded-lg p-3 border border-primary-700/50">
        <div className="text-sm text-primary-300">
          {paymentMethod === "cash" ? (
            <div className="flex items-start gap-2">
              <span className="text-green-400">💰</span>
              <div>
                <p className="font-medium text-primary-200 mb-1">
                  Cash Payment Benefits:
                </p>
                <ul className="space-y-1 text-xs">
                  <li>• No processing fees</li>
                  <li>• Pay when you arrive</li>
                  <li>• Free cancellation up to 24 hours</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-2">
              <span className="text-blue-400">🔒</span>
              <div>
                <p className="font-medium text-primary-200 mb-1">
                  Online Payment Benefits:
                </p>
                <ul className="space-y-1 text-xs">
                  <li>• Secure payment processing</li>
                  <li>• Instant booking confirmation</li>
                  <li>• Multiple payment methods accepted</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentMethodSelector;
