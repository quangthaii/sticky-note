import { tv } from 'tailwind-variants';

export const trashZoneStyles = tv({
  base: 'fixed z-50 flex items-center justify-center rounded-lg border-2 border-dashed transition-all duration-300',
  variants: {
    isActive: {
      true: 'trash-zone drag-over border-red-400 bg-red-100 scale-105',
      false: 'trash-zone border-red-300 bg-red-50 opacity-50',
    },
  },
});

export const trashIconStyles = tv({
  base: 'transition-colors',
  variants: {
    isActive: {
      true: 'text-red-600',
      false: 'text-red-400',
    },
  },
});
