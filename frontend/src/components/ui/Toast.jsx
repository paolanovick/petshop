import { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const config = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800',
      iconColor: 'text-green-600'
    },
    error: {
      icon: XCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800',
      iconColor: 'text-red-600'
    },
    info: {
      icon: AlertCircle,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800',
      iconColor: 'text-blue-600'
    }
  };

  const Icon = config[type].icon;

  return (
    <div className={`fixed top-20 right-4 z-50 max-w-sm w-full ${config[type].bgColor} ${config[type].borderColor} border rounded-lg shadow-lg p-4 animate-slide-in-right`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 ${config[type].iconColor} flex-shrink-0 mt-0.5`} />
        <p className={`flex-1 ${config[type].textColor} font-medium`}>{message}</p>
        <button
          onClick={onClose}
          className={`${config[type].textColor} opacity-50 hover:opacity-100 transition`}
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}