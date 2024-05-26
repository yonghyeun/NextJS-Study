'use client';

import { useState } from 'react';

const boxStyle = {
  padding: '30px',
  backgroundColor: '#aaa',
  margin: '16px',
};

const ClientComonent = () => {
  const [count, setCount] = useState<number>(0);
  return (
    <div style={{ ...boxStyle }}>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Click Me!</button>
    </div>
  );
};

export default ClientComonent;
