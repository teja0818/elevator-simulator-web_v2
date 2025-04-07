import React from 'react';

type ControlPanelProps = {
  walkSpeed: number;
  liftSpeed: number;
  setWalkSpeed: (v: number) => void;
  setLiftSpeed: (v: number) => void;
};

const ControlPanel: React.FC<ControlPanelProps> = ({
  walkSpeed,
  liftSpeed,
  setWalkSpeed,
  setLiftSpeed,
}) => {
  return (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <label>
        Walk Speed (ms per px): 
        <input
          type="number"
          value={walkSpeed}
          onChange={(e) => setWalkSpeed(Number(e.target.value))}
        />
      </label>
      &nbsp;&nbsp;
      <label>
        Lift Speed (ms per floor): 
        <input
          type="number"
          value={liftSpeed}
          onChange={(e) => setLiftSpeed(Number(e.target.value))}
        />
      </label>
    </div>
  );
};

export default ControlPanel;
