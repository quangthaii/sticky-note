import React from 'react';
import { buttonStyles } from './Button.styles';
import type { VariantProps } from 'tailwind-variants';

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  children,
  className = '',
  ...props
}) => {
  return (
    <button className={buttonStyles({ variant, size, className })} {...props}>
      {children}
    </button>
  );
};

export default React.memo(Button);
