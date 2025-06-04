import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, icon, className = '' }) => {
  return (
    <div className={`card shadow-sm ${className}`}>
      <div className="card-header bg-white d-flex align-items-center">
        {icon && <div className="me-2">{icon}</div>}
        <h5 className="card-title mb-0">{title}</h5>
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};

export default Card;
