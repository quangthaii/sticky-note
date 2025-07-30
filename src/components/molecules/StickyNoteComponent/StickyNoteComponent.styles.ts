import { tv } from 'tailwind-variants';

export const stickyNoteStyles = tv({
  base: 'sticky-note group absolute select-none cursor-move border-2 border-gray-400 transition-all shadow-lg rounded-sm bg-opacity-90 hover:shadow-xl p-4',
  variants: {
    color: {
      YELLOW: 'bg-yellow-200 border-yellow-400',
      PINK: 'bg-pink-200 border-pink-400',
      BLUE: 'bg-blue-200 border-blue-400',
      GREEN: 'bg-green-200 border-green-400',
      ORANGE: 'bg-orange-200 border-orange-400',
      PURPLE: 'bg-purple-200 border-purple-400',
    },
    isActive: {
      true: 'border-blue-600 shadow-xl z-50 scale-105',
      false: 'border-gray-400',
    },
  },
});

export const deleteButtonStyles = tv({
  base: 'absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center z-10 shadow-md',
});

export const resizeHandleStyles = tv({
  base: 'absolute bottom-0 right-0 w-4 h-4 cursor-se-resize opacity-30 group-hover:opacity-70 hover:opacity-100 transition-opacity bg-gray-500 rounded-tl-sm',
});
