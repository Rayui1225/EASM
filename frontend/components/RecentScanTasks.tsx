import React from 'react';
import { FaCheck, FaTimes, FaSpinner } from 'react-icons/fa';

interface ScanTask {
  id: string;
  name: string;
  type: string;
  status: 'completed' | 'failed' | 'running';
  target: string;
  startTime: string;
  endTime?: string;
}

interface RecentScanTasksProps {
  tasks: ScanTask[];
}

const RecentScanTasks: React.FC<RecentScanTasksProps> = ({ tasks }) => {
  const renderStatus = (status: string) => {
    switch (status) {
      case 'completed':
        return <FaCheck className="text-success" />;
      case 'failed':
        return <FaTimes className="text-danger" />;
      case 'running':
        return <FaSpinner className="text-primary fa-spin" />;
      default:
        return null;
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Target</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (            <tr key={task.id}>
              <td>{task.name}</td>
              <td>{task.type}</td>
              <td>{task.target}</td>
              <td>{new Date(task.startTime).toISOString().replace('T', ' ').substring(0, 19)}</td>
              <td>
                {task.endTime ? new Date(task.endTime).toISOString().replace('T', ' ').substring(0, 19) : '-'}
              </td>
              <td className="text-center">
                {renderStatus(task.status)}
              </td>
            </tr>
          ))}
          {tasks.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-4">
                No recent scan tasks found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecentScanTasks;
