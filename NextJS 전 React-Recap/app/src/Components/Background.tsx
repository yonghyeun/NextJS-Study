import { memo, ReactNode } from 'react';

const SizeClass = 'w-screen h-screen';
const linearBackground = 'bg-gradient-to-b  from-purple-900 to-purple-500 ';
const padding = 'px-60 py-8';

const Background = ({ children }: { children: ReactNode }) => {
  return (
    <section className={`${SizeClass} ${linearBackground} ${padding}`}>
      {children}
    </section>
  );
};

export default Background;
