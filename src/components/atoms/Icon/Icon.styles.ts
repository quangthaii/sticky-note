import { tv } from 'tailwind-variants';

export const iconStyles = tv({
  base: 'inline-block',
  variants: {
    size: {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});
