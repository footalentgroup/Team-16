// src/components/ui/alert.jsx
import React from "react"

// Si no tienes la función "cn", puedes usar "clsx" o concatenar strings manualmente
function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}

/**
 * Alert principal, ahora:
 * - sin la clase "absolute" para que aparezca en el flujo normal
 * - con "opacity-100" para que sea visible
 * - w=566px, h=80px, color fondo #02807D (ajustable si deseas)
 * - border=1px, radio=lg, padding=16px
 */
export const Alert = React.forwardRef(({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "fixed",         // Posiciona de forma fija
          "top-1",         // Alinea 16px desde arriba
          "right-1",       // Alinea 16px desde la derecha
          "flex items-start border p-4 rounded-lg",
          "w-[500px]",     // Ancho fijo
          "h-[80px]",      // Alto fijo
          "bg-[#02807D]",  // Color de fondo
          "border-[1px]",  // Borde de 1px
          "rounded-lg",    // Borde redondeado
          "gap-4",         // Espacio entre hijos
          "opacity-100",   // Visible por defecto
          "z-50",          // Para que quede por encima de otros elementos (opcional)
          className
        )}
        {...props}
      />
    )
  })
  
Alert.displayName = "Alert"

/** Título del Alert (subcomponente) */
export const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      "text-white",  // Texto en blanco
      "text-sm",
      "font-semibold",
      className
    )}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

/** Descripción del Alert (subcomponente) */
export const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-white",
      "text-sm",
      className
    )}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"
