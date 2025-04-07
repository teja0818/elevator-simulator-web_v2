import React, { useState, useEffect } from 'react';
import Elevator from './Elevator';
import './Building.css';

const NUM_FLOORS = 5;

const Building: React.FC = () => {
  const [calls, setCalls] = useState<number[]>([]);
  const [elevatorFloor, setElevatorFloor] = useState(0);
  const [moving, setMoving] = useState(false);

  const callElevator = (floor: number) => {
    if (!calls.includes(floor)) {
      setCalls((prev) => [...prev, floor]);
    }
  };

  useEffect(() => {
    if (moving || calls.length === 0) return;

    setMoving(true);
    const interval = setInterval(() => {
      setElevatorFloor((prev) => {
        const target = calls[0];
        if (prev === target) {
          setCalls((c) => c.slice(1));
          clearInterval(interval);
          setMoving(false);
          return prev;
        }
        return target > prev ? prev + 1 : prev - 1;
      });
    }, 1000); // Move one floor every second

    return () => clearInterval(interval);
  }, [calls, moving]);

  return (
    <div className="building">
      {[...Array(NUM_FLOORS)].map((_, i) => {
        const floor = NUM_FLOORS - 1 - i;
        return (
          <div className="floor" key={floor}>
            <button onClick={() => callElevator(floor)}>Call 🛗</button>
            <span className="floor-label">Floor {floor}</span>
          </div>
        );
      })}
      <Elevator floor={elevatorFloor} />
    </div>
  );
};

export default Building;
