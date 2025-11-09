/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { IoCheckmarkCircleOutline, IoCloseCircleOutline, IoInformationCircleOutline, IoClose } from 'react-icons/io5'

// Compatibility wrapper: pages call useToast().show(message, { type: 'success'|'error' })
const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const api = {
    show: (message, opts = {}) => {
      // If caller wants the raw/toast API behavior, forward it
      if (opts.raw) return toast(message, opts)
      const duration = opts.duration || 4000

      return toast.custom((t) => (
        <ToastCard visible={t.visible} message={message} opts={opts} onClose={() => toast.dismiss(t.id)} />
      ), { duration })
    },
    remove: (id) => toast.dismiss(id),
  }

  return (
    <ToastContext.Provider value={api}>
      {children}
      {/* Render Toaster (needed to manage portal mounting) */}
      <Toaster position="bottom-right" />
    </ToastContext.Provider>
  )
}


function ToastCard({ visible, message, opts = {}, onClose }) {
  const type = opts.type || 'default'
  const title = opts.title

  // Define distinct styles for each toast type
  const typeStyles = {
    success: {
      accent: 'bg-green-500',
      iconBg: 'bg-green-100/70',
      icon: <IoCheckmarkCircleOutline className="text-green-700" size={20} />,
      ring: 'ring-green-500/50',
    },
    error: {
      accent: 'bg-red-500',
      iconBg: 'bg-red-100/70',
      icon: <IoCloseCircleOutline className="text-red-700" size={20} />,
      ring: 'ring-red-500/50',
    },
    info: {
      accent: 'bg-sky-500',
      iconBg: 'bg-sky-100/70',
      icon: <IoInformationCircleOutline className="text-sky-700" size={20} />,
      ring: 'ring-sky-500/50',
    },
    default: {
      accent: 'bg-gray-400',
      iconBg: 'bg-gray-100/70',
      icon: <IoInformationCircleOutline className="text-gray-700" size={20} />,
      ring: 'ring-gray-400/50',
    },
  }
  
  const { icon, iconBg, ring } = typeStyles[type]

  return (
    // Added smoother/more noticeable entrance/exit animation
    <div className={`transform transition-all duration-300 ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-95'}`}>
      <div className={`flex items-center w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden ring-2 ${ring} ring-opacity-70`}>
        {/* Removed the left accent bar to use the ring as the primary indicator */}
        
        <div className="flex items-center gap-3 px-4 py-3 flex-1">
          {/* Icon container now uses a light background color based on type */}
          <div className={`flex-none w-8 h-8 flex items-center justify-center rounded-full ${iconBg}`}>
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            {title && <div className="text-xs font-semibold text-gray-500 truncate">{title}</div>}
            <div className="text-sm text-slate-700 font-medium">{typeof message === 'string' ? message : message}</div>
          </div>
          <button onClick={onClose} className="ml-3 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
            <IoClose size={18} />
          </button>
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