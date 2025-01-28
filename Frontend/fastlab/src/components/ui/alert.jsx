
import React from "react"

function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}

export const Alert = React.forwardRef(({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "fixed",         
          "top-1",        
          "right-1",      
          "flex items-start border p-4 rounded-lg",
          "w-[500px]",     
          "h-[80px]",      
          "bg-[#02807D]",  
          "border-[1px]",  
          "rounded-lg",    
          "gap-4",        
          "opacity-100",  
          "z-50",          
          className
        )}
        {...props}
      />
    )
  })
  
Alert.displayName = "Alert"

export const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      "text-white",  
      "text-sm",
      "font-semibold",
      className
    )}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

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
