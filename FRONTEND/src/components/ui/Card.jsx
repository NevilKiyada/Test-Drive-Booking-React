
// src/components/ui/card.jsx
import React from 'react';

export const Card = ({ children }) => (
  <div className="border rounded-lg shadow-md p-4">{children}</div>
);

export const CardContent = ({ children }) => (
  <div className="p-2">{children}</div>
);

export const Button = ({ children, onClick, className }) => (
  <button onClick={onClick} className={`bg-blue-500 text-white p-2 rounded ${className}`}>
    {children}
  </button>
);
