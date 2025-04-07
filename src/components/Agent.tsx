import React, { useEffect, useRef, useState } from 'react';
import './Agent.css';

type AgentProps = {
  floor: number;
  destination: number;
  walkSpeed: number;
  onArrived: () => void;
};

const Agent: React.FC<AgentProps> = ({ floor, walkSpeed, onArrived }) => {
  const [x, setX] = useState(0); // starting from left
  const agentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setX((prev) => {
        if (prev >= 80) { // assuming lift is at 80px
          clearInterval(interval);
          onArrived();
          return prev;
        }
        return prev + 1;
      });
    }, walkSpeed);

    return () => clearInterval(interval);
  }, [walkSpeed, onArrived]);

  return (
    <div
      className="agent"
      style={{ bottom: `${floor * 100 + 20}px`, left: `${x}px` }}
      ref={agentRef}
    >
      🧍
    </div>
  );
};

export default Agent;
