import React from 'react';
import { Button } from '@/components/atoms';
import { STICKY_NOTE_CONFIG, type StickyNoteColor } from '@/configs';
import {
  toolbarStyles,
  toolbarSectionStyles,
  colorButtonStyles,
  colorGridStyles,
  actionGroupStyles,
  buttonGroupStyles,
} from './Toolbar.styles';

interface ToolbarProps {
  onCreateNote: (color: StickyNoteColor) => void;
  onSaveNotes: () => void;
  onLoadNotes: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onCreateNote,
  onSaveNotes,
  onLoadNotes,
}) => {
  const colors = Object.keys(STICKY_NOTE_CONFIG.COLORS) as StickyNoteColor[];

  return (
    <div className={toolbarStyles()}>
      <div className={toolbarSectionStyles()}>
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Add Note</h3>
          <div className={colorGridStyles()}>
            {colors.map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded-md border-2 border-gray-300 hover:border-gray-500 transition-all duration-200 cursor-pointer hover:scale-110 shadow-sm ${colorButtonStyles(
                  { color }
                )}`}
                onClick={() => onCreateNote(color)}
                title={`Create ${color.toLowerCase()} note`}
              />
            ))}
          </div>
        </div>

        <div className={actionGroupStyles()}>
          <div className={buttonGroupStyles()}>
            <Button size="sm" onClick={onSaveNotes} className="text-xs">
              Save Notes
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={onLoadNotes}
              className="text-xs"
            >
              Load Notes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Toolbar);
