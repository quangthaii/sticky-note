import { tv } from 'tailwind-variants';

export const toolbarStyles = tv({
  base: 'fixed top-4 left-4 z-40 bg-white rounded-lg shadow-lg p-4 border',
});

export const toolbarSectionStyles = tv({
  base: 'flex flex-col gap-3',
});

export const colorButtonStyles = tv({
  base: 'w-8 h-8 rounded-md border-2 border-gray-300 hover:border-gray-500 transition-all duration-200 cursor-pointer hover:scale-110 shadow-sm min-w-8 min-h-8',
  variants: {
    color: {
      YELLOW: 'bg-yellow-200 hover:bg-yellow-300',
      PINK: 'bg-pink-200 hover:bg-pink-300',
      BLUE: 'bg-blue-200 hover:bg-blue-300',
      GREEN: 'bg-green-200 hover:bg-green-300',
      ORANGE: 'bg-orange-200 hover:bg-orange-300',
      PURPLE: 'bg-purple-200 hover:bg-purple-300',
    },
  },
});

export const colorGridStyles = tv({
  base: 'flex gap-2 flex-wrap',
});

export const actionGroupStyles = tv({
  base: 'border-t pt-3',
});

export const buttonGroupStyles = tv({
  base: 'flex flex-col gap-2',
});
