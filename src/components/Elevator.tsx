import React from 'react';
import './Elevator.css';

type ElevatorProps = {
  floor: number;
};

const Elevator: React.FC<ElevatorProps> = ({ floor }) => {
  return (
    <div className="elevator" style={{ bottom: `${floor * 100}px` }}>
      🛗
    </div>
  );
};

export default Elevator;
