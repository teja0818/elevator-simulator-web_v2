import React, { useState } from 'react';
import Elevator from './Elevator';
import './Building.css';

const Building: React.FC = () => {
  const [floor, setFloor] = useState(0);

  return (
    <div className="building">
      <Elevator floor={floor} />
      <div className="controls">
        {[0, 1, 2, 3, 4].map((f) => (
          <button key={f} onClick={() => setFloor(f)}>
            Go to floor {f}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Building;
