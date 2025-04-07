import React, { useEffect, useState } from 'react';
import Elevator from './Elevator';
import Agent from './Agent';
import ControlPanel from './ControlPanel';
import { odMatrix } from '../odMatrix';
import './Building.css';

const NUM_FLOORS = 5;

type AgentData = {
  id: number;
  origin: number;
  destination: number;
  hasCalled: boolean;
};

const Building: React.FC = () => {
  const [elevatorFloor, setElevatorFloor] = useState(0);
  const [calls, setCalls] = useState<number[]>([]);
  const [targetFloor, setTargetFloor] = useState<number | null>(null);
  const [agents, setAgents] = useState<AgentData[]>([]);
  const [walkSpeed, setWalkSpeed] = useState(30); // ms per pixel
  const [liftSpeed, setLiftSpeed] = useState(1000); // ms per floor

  // Spawn agents based on O-D matrix timing
  useEffect(() => {
    const timeouts = odMatrix.map((entry, index) =>
      setTimeout(() => {
        setAgents((prev) => [
          ...prev,
          { id: index, origin: entry.origin, destination: entry.destination, hasCalled: false },
        ]);
      }, entry.time * 1000)
    );

    return () => timeouts.forEach(clearTimeout);
  }, []);

  // Call elevator when agent arrives at lift
  const handleAgentArrival = (originFloor: number) => {
    if (!calls.includes(originFloor)) {
      setCalls((prev) => [...prev, originFloor]);
    }
  };

  // Set next target if idle
  useEffect(() => {
    if (targetFloor === null && calls.length > 0) {
      setTargetFloor(calls[0]);
    }
  }, [calls, targetFloor]);

  // Move elevator toward target
  useEffect(() => {
    if (targetFloor === null) return;

    const interval = setInterval(() => {
      setElevatorFloor((current) => {
        if (current === targetFloor) {
          setCalls((prevCalls) => prevCalls.filter((f) => f !== targetFloor));
          setTargetFloor(null);
          clearInterval(interval);
          return current;
        }
        return targetFloor > current ? current + 1 : current - 1;
      });
    }, liftSpeed);

    return () => clearInterval(interval);
  }, [targetFloor, liftSpeed]);

  return (
    <div>
      <ControlPanel
        walkSpeed={walkSpeed}
        liftSpeed={liftSpeed}
        setWalkSpeed={setWalkSpeed}
        setLiftSpeed={setLiftSpeed}
      />
      <div className="building">
        {Array.from({ length: NUM_FLOORS }, (_, floor) => (
          <div className="floor" key={floor}>
            <span className="floor-label">Floor {NUM_FLOORS - 1 - floor}</span>
          </div>
        ))}
        {agents.map((agent) => (
          <Agent
            key={agent.id}
            floor={agent.origin}
            destination={agent.destination}
            walkSpeed={walkSpeed}
            onArrived={() => {
              if (!agent.hasCalled) {
                handleAgentArrival(agent.origin);
                agent.hasCalled = true;
              }
            }}
          />
        ))}
        <Elevator floor={elevatorFloor} />
      </div>
    </div>
  );
};

export default Building;
