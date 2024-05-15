"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export function Toaster(props: {style: string}) {
  const { toasts } = useToast()

  return (
    <div className="text-white">
      <ToastProvider >
        {toasts.map(function ({ id, title, description, action, ...props }) {
          return (
            <Toast key={id} style={props.style} {...props}>
              <div className="grid gap-1 ">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
              {action}
              <ToastClose />
            </Toast>
          )
        })}
        <ToastViewport />
      </ToastProvider>  
    </div>
  )
}
