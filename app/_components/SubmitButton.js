"use client";
import { useFormStatus } from "react-dom";

function SubmitButton({ children, pendingLabel = "Processing..." }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="w-full bg-accent-500 hover:bg-accent-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-primary-900 font-semibold py-4 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:hover:bg-gray-500 flex items-center justify-center gap-2"
      disabled={pending}
    >
      {pending && (
        <div className="w-4 h-4 border-2 border-primary-900/30 border-t-primary-900 rounded-full animate-spin"></div>
      )}
      {pending ? pendingLabel : children}
    </button>
  );
}

export default SubmitButton;
