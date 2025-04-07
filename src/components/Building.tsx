import React, { useState, useEffect, useRef } from 'react';
import Elevator from './Elevator';
import './Building.css';

const NUM_FLOORS = 5;

const Building: React.FC = () => {
  const [calls, setCalls] = useState<number[]>([]);
  const [elevatorFloor, setElevatorFloor] = useState(0);
  const movingRef = useRef(false);
  const callsRef = useRef<number[]>([]);

  // Sync refs with state
  useEffect(() => {
    callsRef.current = calls;
  }, [calls]);

  const callElevator = (floor: number) => {
    if (!callsRef.current.includes(floor)) {
      const newCalls = [...callsRef.current, floor];
      setCalls(newCalls);
    }
  };

  useEffect(() => {
    if (movingRef.current || callsRef.current.length === 0) return;

    movingRef.current = true;
    const moveInterval = setInterval(() => {
      const target = callsRef.current[0];
      setElevatorFloor((prev) => {
        if (prev === target) {
          // Arrived
          const remaining = callsRef.current.slice(1);
          setCalls(remaining);
          clearInterval(moveInterval);
          movingRef.current = false;
          return prev;
        }
        return target > prev ? prev + 1 : prev - 1;
      });
    }, 1000);

    return () => clearInterval(moveInterval);
  }, [calls, elevatorFloor]);

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
