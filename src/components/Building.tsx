import React, { useState } from 'react';
import Elevator from './Elevator';
import './Building.css';

const NUM_FLOORS = 5;

const Building: React.FC = () => {
  const [calls, setCalls] = useState<number[]>([]);
  const [elevatorFloor, setElevatorFloor] = useState(0);

  const callElevator = (floor: number) => {
    if (!calls.includes(floor)) {
      setCalls((prev) => [...prev, floor]);
    }
  };

  // Move elevator to next called floor after delay
  React.useEffect(() => {
    if (calls.length === 0) return;

    const nextFloor = calls[0];
    if (nextFloor === elevatorFloor) {
      // Remove this floor from queue
      setCalls((prev) => prev.slice(1));
    } else {
      const timeout = setTimeout(() => {
        setElevatorFloor((prev) =>
          nextFloor > prev ? prev + 1 : prev - 1
        );
      }, 1000); // delay between floors

      return () => clearTimeout(timeout);
    }
  }, [calls, elevatorFloor]);

  return (
    <div className="building">
      {[...Array(NUM_FLOORS)].map((_, i) => {
        const floor = NUM_FLOORS - 1 - i;
        return (
          <div className="floor" key={floor}>
            <button onClick={() => callElevator(floor)}>
              Call 🛗
            </button>
            <span className="floor-label">Floor {floor}</span>
          </div>
        );
      })}
      <Elevator floor={elevatorFloor} />
    </div>
  );
};

export default Building;
