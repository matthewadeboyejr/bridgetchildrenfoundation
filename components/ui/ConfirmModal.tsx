'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, CheckCircle2, XCircle, Loader2 } from 'lucide-react'

interface ConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  isLoading?: boolean
  type?: 'success' | 'danger' | 'info'
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isLoading = false,
  type = 'info'
}: ConfirmModalProps) {
  const themes = {
    success: {
      icon: <CheckCircle2 className="text-emerald-500" size={32} />,
      bg: 'bg-emerald-50 dark:bg-emerald-950/30',
      button: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-900/10'
    },
    danger: {
      icon: <XCircle className="text-red-500" size={32} />,
      bg: 'bg-red-50 dark:bg-red-950/30',
      button: 'bg-red-600 hover:bg-red-700 shadow-red-900/10'
    },
    info: {
      icon: <AlertCircle className="text-primary-500" size={32} />,
      bg: 'bg-primary-50 dark:bg-primary-950/30',
      button: 'bg-primary-800 hover:bg-primary-900 shadow-primary-900/10'
    }
  }

  const theme = themes[type]

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={isLoading ? undefined : onClose}
            className="absolute inset-0 bg-primary-950/40 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white dark:bg-primary-900 rounded-[2.5rem] shadow-2xl border border-white/20 overflow-hidden"
          >
            <div className="p-10 text-center space-y-6">
              <div className={`mx-auto w-20 h-20 rounded-3xl ${theme.bg} flex items-center justify-center shadow-inner`}>
                {theme.icon}
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-primary-900 dark:text-white uppercase tracking-tighter">
                  {title}
                </h3>
                <p className="text-primary-700/60 dark:text-primary-300/60 text-sm font-medium leading-relaxed">
                  {description}
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  disabled={isLoading}
                  onClick={onClose}
                  className="flex-1 py-4 bg-primary-50 dark:bg-primary-950 text-primary-800 dark:text-primary-300 font-bold rounded-2xl hover:bg-primary-100 transition-all disabled:opacity-50"
                >
                  {cancelText}
                </button>
                <button
                  disabled={isLoading}
                  onClick={onConfirm}
                  className={`flex-1 py-4 text-white font-bold rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 ${theme.button}`}
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    confirmText
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
