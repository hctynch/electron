import { ReactNode } from 'react';

interface GlassBoxProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

function GlassBox({ children, className = '', style = {} }: GlassBoxProps) {
  // Base glass effect classes
  const baseClasses = 'backdrop-blur-md bg-white/20 rounded-lg';

  return (
    <div 
      className={`${baseClasses} ${className}`} 
      style={style}
    >
      {children}
    </div>
  );
}

export default GlassBox;