import { createContext, useContext } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { IoCheckmarkCircleOutline, IoCloseCircleOutline, IoInformationCircleOutline } from 'react-icons/io5'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const api = {
    show: (message, opts = {}) => {
      if (opts.raw) return toast(message, opts)
      const duration = opts.duration || 2000;

      return toast.custom((t) => (
        <ToastCard visible={t.visible} message={message} opts={opts} onClose={() => toast.dismiss(t.id)} />
      ), { duration })
    },
    remove: (id) => toast.dismiss(id),
  }

  return (
    <ToastContext.Provider value={api}>
      {children}
      <Toaster position="bottom-right" />
    </ToastContext.Provider>
  )
}


function ToastCard({ visible, message, opts = {} }) {
  const type = opts.type || 'default'
  const title = opts.title

  const typeStyles = {
    success: {
      bg: 'bg-green-400',
      text: 'text-green-500',
      iconBg: 'bg-green-100/70',
      icon: <IoCheckmarkCircleOutline className="text-white font-extrabold" size={20} />,
      ring: 'ring-green-500/50',
    },
    error: {
      bg: 'bg-red-500',
      text: 'text-red-500',
      iconBg: 'bg-red-100/70',
      icon: <IoCloseCircleOutline className="text-white font-bold" size={20} />,
      ring: 'ring-red-500/50',
    },
    info: {
      bg: 'bg-sky-500',
      text: 'text-sky-500',
      iconBg: 'bg-sky-100/70',
      icon: <IoInformationCircleOutline className="text-white font-bold" size={20} />,
      ring: 'ring-sky-500/50',
    },
    default: {
      bg: 'bg-gray-400',
      text: 'text-gray-500',
      iconBg: 'bg-gray-100/70',
      icon: <IoInformationCircleOutline className="text-white font-bold" size={20} />,
      ring: 'ring-gray-400/50',
    },
  }
  
  const { bg, icon} = typeStyles[type]

  return (
    <div className={`transform transition-all ${bg} text-white rounded-md duration-300 ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-95'}`}>
      <div className={`flex items-center w-full max-w-sm  rounded-lg shadow-lg overflow-hidden `}>
        <div className="flex items-center gap-1 pr-4 pl-2 py-1 flex-1">
          <div className={`flex-none w-8 h-8 flex items-center justify-center rounded-full `}>
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            {title && <div className={`text-sm  font-bold text-white truncate`}>{title}</div>}
            <div className={`text-sm font-bold text-white`}>{typeof message === 'string' ? message : message}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

export default ToastProvider