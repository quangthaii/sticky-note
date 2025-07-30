import { tv } from 'tailwind-variants';

export const textAreaStyles = tv({
  base: 'resize-none border-none outline-none bg-transparent',
  variants: {
    variant: {
      default: 'border border-gray-300 rounded-md',
      sticky: 'text-gray-800 placeholder-gray-500 font-handwriting',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
