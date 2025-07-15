import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export const Button = ({ children, className = "", ...props }: ButtonProps) => {
  return (
    <button
      className={`inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
