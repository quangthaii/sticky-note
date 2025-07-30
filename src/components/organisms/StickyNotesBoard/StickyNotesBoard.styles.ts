import { tv } from 'tailwind-variants';

export const stickyNotesBoardStyles = tv({
  base: 'relative w-full h-[calc(100vh-4rem)] overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 cursor-crosshair',
  variants: {
    isDragging: {
      true: 'cursor-grabbing',
      false: '',
    },
  },
});

export const loadingOverlayStyles = tv({
  base: 'absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50',
});

export const loadingSpinnerStyles = tv({
  base: 'bg-white rounded-lg p-6 flex items-center gap-3',
});

export const statusMessageStyles = tv({
  base: 'fixed top-4 right-4 px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 z-40',
  variants: {
    type: {
      success: 'bg-green-500',
      error: 'bg-red-500',
      info: 'bg-blue-500',
    },
  },
});
