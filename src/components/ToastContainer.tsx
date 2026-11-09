import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-[10px] shadow-2xl border text-sm font-medium transition-all transform animate-in slide-in-from-bottom-2 ${
              isSuccess
                ? 'bg-[#00a544] text-white border-green-600'
                : isError
                ? 'bg-[#e40014] text-white border-red-700'
                : 'bg-[#0a0a0a] text-white border-gray-700'
            }`}
          >
            {isSuccess && <CheckCircle2 size={18} className="shrink-0 mt-0.5 text-white" />}
            {isError && <AlertCircle size={18} className="shrink-0 mt-0.5 text-white" />}
            {!isSuccess && !isError && <Info size={18} className="shrink-0 mt-0.5 text-pink-300" />}

            <div className="flex-1 leading-snug">{toast.text}</div>

            <button
              type="button"
              onClick={() => dismissToast(toast.id)}
              className="text-white/80 hover:text-white p-0.5"
              aria-label="বন্ধ করুন"
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
