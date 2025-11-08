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

  const accent = {
    success: 'bg-emerald-500',
    error: 'bg-rose-500',
    info: 'bg-sky-500',
    default: 'bg-gray-400',
  }[type]

  const icon = {
    success: <IoCheckmarkCircleOutline className="text-white" size={16} />,
    error: <IoCloseCircleOutline className="text-white" size={16} />,
    info: <IoInformationCircleOutline className="text-white" size={16} />,
    default: <IoInformationCircleOutline className="text-white" size={16} />,
  }[type]

  return (
    <div className={`transform transition-all duration-150 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
      <div className="flex items-center w-full max-w-sm bg-white border border-gray-100 rounded-lg shadow-md overflow-hidden">
        <div className={`w-1.5 h-full ${accent}`} />
        <div className="flex items-center gap-3 px-3 py-2 flex-1">
          <div className="flex-none w-7 h-7 flex items-center justify-center rounded-md bg-gray-100">
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            {title && <div className="text-xs font-semibold text-gray-500 truncate">{title}</div>}
            <div className="text-sm text-slate-700 truncate">{typeof message === 'string' ? message : message}</div>
          </div>
          <button onClick={onClose} className="ml-3 text-gray-400 hover:text-gray-600">
            <IoClose size={16} />
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
