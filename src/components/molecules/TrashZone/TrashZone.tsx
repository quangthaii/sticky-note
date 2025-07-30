import React from 'react';
import { Icon } from '@/components/atoms';
import { STICKY_NOTE_CONFIG } from '@/configs';
import { trashZoneStyles, trashIconStyles } from './TrashZone.styles';

interface TrashZoneProps {
  isActive: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
}

const TrashZone: React.FC<TrashZoneProps> = ({
  isActive,
  onDragOver,
  onDrop,
  onDragLeave,
}) => {
  return (
    <div
      className={trashZoneStyles({ isActive })}
      style={{
        width: STICKY_NOTE_CONFIG.TRASH_ZONE_SIZE,
        height: STICKY_NOTE_CONFIG.TRASH_ZONE_SIZE,
        bottom: STICKY_NOTE_CONFIG.TRASH_ZONE_POSITION.bottom,
        right: STICKY_NOTE_CONFIG.TRASH_ZONE_POSITION.right,
      }}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragLeave={onDragLeave}
    >
      <Icon name="trash" size="lg" className={trashIconStyles({ isActive })} />
    </div>
  );
};

export default React.memo(TrashZone);
