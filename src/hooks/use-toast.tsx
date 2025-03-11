
// This is a simple adapter that exports the toast hooks from their original location
// It's used to maintain compatibility after moving components

import * as React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type ToastType = "default" | "destructive" | "success" | "info" | "warning"
type ToastActionElement = React.ReactElement

export type Toast = {
  id: string
  title?: string
  description?: string
  action?: ToastActionElement
  type?: "foreground" | "background"  // Updated to match accepted types
  variant?: "default" | "destructive"
  duration?: number
  open?: boolean
}

type ToasterToast = Toast & {
  onOpenChange: (open: boolean) => void
}

interface ToasterContextProps {
  toasts: ToasterToast[]
  addToast: (toast: Omit<Toast, "id">) => void
  removeToast: (id: string) => void
  updateToast: (id: string, toast: Partial<Toast>) => void
}

const ToasterContext = createContext<ToasterContextProps>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
  updateToast: () => {},
})

export function ToastProvider({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  const [toasts, setToasts] = useState<ToasterToast[]>([])

  const addToast = React.useCallback(
    (toast: Omit<Toast, "id">) => {
      const id = crypto.randomUUID()
      const newToast = {
        ...toast,
        id,
        open: true,
        onOpenChange: (open: boolean) => {
          setToasts((toasts) =>
            toasts.map((t) => (t.id === id ? { ...t, open } : t))
          )
        },
      }

      setToasts((toasts) => [...toasts, newToast])

      if (toast.duration !== Infinity) {
        setTimeout(() => {
          setToasts((toasts) =>
            toasts.map((t) => (t.id === id ? { ...t, open: false } : t))
          )
        }, toast.duration || 5000)
      }
    },
    []
  )

  const removeToast = React.useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  const updateToast = React.useCallback(
    (id: string, toast: Partial<Toast>) => {
      setToasts((prevToasts) =>
        prevToasts.map((t) => (t.id === id ? { ...t, ...toast } : t))
      )
    },
    []
  )

  // Remove toast after it's closed
  useEffect(() => {
    toasts.forEach((toast) => {
      if (toast.open === false) {
        const timer = setTimeout(() => {
          removeToast(toast.id)
        }, 300) // Match animation duration

        return () => clearTimeout(timer)
      }
    })
  }, [toasts, removeToast])

  return (
    <ToasterContext.Provider
      value={{ toasts, addToast, removeToast, updateToast }}
    >
      {children}
    </ToasterContext.Provider>
  )
}

export function useToast() {
  const { toasts, addToast, removeToast, updateToast } = useContext(ToasterContext)

  return {
    toasts,
    toast: (props: Omit<Toast, "id">) => {
      addToast(props)
    },
    dismiss: (id?: string) => {
      if (id) {
        removeToast(id)
      } else {
        toasts.forEach((toast) => {
          removeToast(toast.id)
        })
      }
    },
    update: (id: string, props: Partial<Toast>) => {
      updateToast(id, props)
    },
  }
}

// Simple function to show a toast without hooks
export const toast = (props: Omit<Toast, "id">) => {
  const event = new CustomEvent("toast-request", { detail: props })
  document.dispatchEvent(event)
}

// Listen for toast events - will be used by the Toaster component
if (typeof window !== "undefined") {
  document.addEventListener("toast-request", ((e: CustomEvent) => {
    const toastContextValue = (window as any).__TOAST_CONTEXT_VALUE
    if (toastContextValue?.addToast) {
      toastContextValue.addToast(e.detail)
    }
  }) as EventListener)
}
