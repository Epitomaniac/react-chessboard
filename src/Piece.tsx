import { memo } from 'react';

import { useChessboardContext } from './ChessboardProvider';
import type { DraggingPieceDataType, PieceDataType } from './types';
import { useEffect, useState } from 'react';
import {
  defaultDraggingPieceGhostStyle,
  defaultDraggingPieceStyle,
} from './defaults';

type PieceProps = {
  clone?: boolean;
  isMovable?: boolean;
  isSparePiece?: DraggingPieceDataType['isSparePiece'];
  position: DraggingPieceDataType['position'];
  pieceType: PieceDataType['pieceType'];
};

export const Piece = memo(function Piece({
  clone,
  isMovable,
  isSparePiece = false,
  position,
  pieceType,
}: PieceProps) {
  const {
    id,
    allowDragging,
    animationDuration,
    boardOrientation,
    draggingPiece,
    draggingPieceStyle,
    draggingPieceGhostStyle,
    pieces,
    positionDifferences,
    onPieceClick,
  } = useChessboardContext();

  const [animationStyle, setAnimationStyle] = useState<React.CSSProperties>({});

  let cursorStyle = clone ? 'grabbing' : 'grab';

  if (!allowDragging || !isMovable) {
    cursorStyle = 'default';
  }

  useEffect(() => {
    if (positionDifferences[position]) {
      const sourceSquare = position;
      const targetSquare = positionDifferences[position];

      const squareWidth = document
        .querySelector(`#${id}-square-${sourceSquare}`)
        ?.getBoundingClientRect().width;

      if (!squareWidth) {
        throw new Error('Square width not found');
      }

      setAnimationStyle({
        transform: `translate(${
          (boardOrientation === 'black' ? -1 : 1) *
          (targetSquare.charCodeAt(0) - sourceSquare.charCodeAt(0)) *
          squareWidth
        }px, ${
          (boardOrientation === 'black' ? -1 : 1) *
          (Number(sourceSquare[1]) - Number(targetSquare[1])) *
          squareWidth
        }px)`,
        transition: `transform ${animationDuration}ms`,
        position: 'relative', // creates a new stacking context so the piece stays above squares during animation
        zIndex: 10,
      });
    } else {
      setAnimationStyle({});
    }
  }, [positionDifferences]);

  const PieceSvg = pieces[pieceType];

  return (
    <div
      id={`${id}-piece-${pieceType}-${position}`}
      data-piece={pieceType}
      style={{
        ...animationStyle,
        ...(clone
          ? { ...defaultDraggingPieceStyle, ...draggingPieceStyle }
          : {}),
        ...(!clone && draggingPiece?.position === position
          ? { ...defaultDraggingPieceGhostStyle, ...draggingPieceGhostStyle }
          : {}),
        width: '100%',
        height: '100%',
        cursor: cursorStyle,
        touchAction: 'none', // prevent zooming and scrolling on touch devices
      }}
      onClick={() =>
        onPieceClick?.({ isSparePiece, piece: { pieceType }, square: position })
      }
    >
      <PieceSvg />
    </div>
  );
});
