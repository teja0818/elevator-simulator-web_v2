import React, { useEffect, useState } from 'react';
import Elevator from './Elevator';
import './Building.css';

const NUM_FLOORS = 5;

const Building: React.FC = () => {
  const [elevatorFloor, setElevatorFloor] = useState(0);
  const [calls, setCalls] = useState<number[]>([]);
  const [targetFloor, setTargetFloor] = useState<number | null>(null);

  const callElevator = (floor: number) => {
    if (!calls.includes(floor)) {
      setCalls((prev) => [...prev, floor]);
    }
  };

  useEffect(() => {
    // If not already heading somewhere, set the next target
    if (targetFloor === null && calls.length > 0) {
      setTargetFloor(calls[0]);
    }
  }, [calls, targetFloor]);

  useEffect(() => {
    if (targetFloor === null) return;

    const interval = setInterval(() => {
      setElevatorFloor((current) => {
        if (current === targetFloor) {
          // Arrived at destination
          setCalls((prevCalls) => prevCalls.filter((f) => f !== targetFloor));
          setTargetFloor(null);
          clearInterval(interval);
          return current;
        }

        return targetFloor > current ? current + 1 : current - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetFloor]);

  return (
    <div className="building">
      {[...Array(NUM_FLOORS)].map((_, floor) => (
        <div className="floor" key={floor}>
          <button onClick={() => callElevator(floor)}>Call 🛗</button>
          <span className="floor-label">Floor {floor}</span>
        </div>
      )).reverse()}
      <Elevator floor={elevatorFloor} />
    </div>
  );
};

export default Building;
