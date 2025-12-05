import type { PropsWithChildren } from 'react';
import type React from 'react';

interface IRenderProps extends PropsWithChildren {
  in: boolean;
}

const Render: React.FC<IRenderProps> = (props) => {
  if (props.in) {
    return props.children;
  }
  return null;
};

export default Render;
