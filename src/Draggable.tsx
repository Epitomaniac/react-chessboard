import { useDraggable } from '@dnd-kit/core';

import { useChessboardContext } from './ChessboardProvider';
import type { DraggingPieceDataType, PieceDataType } from './types';

type DraggableProps = {
  children: React.ReactNode;
  isMovable: boolean;
  isSparePiece?: DraggingPieceDataType['isSparePiece'];
  pieceType: PieceDataType['pieceType'];
  position: DraggingPieceDataType['position'];
};

export function Draggable({
  children,
  isMovable,
  isSparePiece = false,
  pieceType,
  position,
}: DraggableProps) {
  const { allowDragging } = useChessboardContext();

  const { setNodeRef, attributes, listeners } = useDraggable({
    id: position,
    data: {
      isSparePiece,
      pieceType,
    },
    disabled: !allowDragging || !isMovable,
  });

  return (
    <div ref={setNodeRef} {...attributes} {...listeners}>
      {children}
    </div>
  );
}
