import React from 'react';
import { iconStyles } from './Icon.styles';
import type { VariantProps } from 'tailwind-variants';

interface IconProps extends VariantProps<typeof iconStyles> {
  name: 'trash' | 'resize' | 'add' | 'close' | 'move';
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, size, className = '' }) => {
  const icons = {
    trash: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
      </svg>
    ),
    resize: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M22,22H20V20H22V22M22,18H20V16H22V18M18,22H16V20H18V22M18,18H16V16H18V18M14,22H12V20H14V22M22,14H20V12H22V14Z" />
      </svg>
    ),
    add: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
      </svg>
    ),
    close: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
      </svg>
    ),
    move: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M13,6V11H18V7.75L22.25,12L18,16.25V13H13V18H16.25L12,22.25L7.75,18H11V13H6V16.25L1.75,12L6,7.75V11H11V6H7.75L12,1.75L16.25,6H13Z" />
      </svg>
    ),
  };

  return <span className={iconStyles({ size, className })}>{icons[name]}</span>;
};

export default React.memo(Icon);
