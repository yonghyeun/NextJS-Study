import { ReactNode } from 'react';

const RootLayer = ({ children }: { children: ReactNode }) => {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
};

export default RootLayer;
