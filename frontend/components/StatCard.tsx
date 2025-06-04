import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  subtext?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  color,
  subtext
}) => {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <div className="d-flex align-items-start justify-content-between">
          <div>
            <h6 className="text-muted mb-2">{title}</h6>
            <h4 className="fw-bold mb-1">{value}</h4>
            {subtext && <small className="text-muted">{subtext}</small>}
          </div>
          <div className={`icon-shape rounded-circle p-3 ${color}`}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
