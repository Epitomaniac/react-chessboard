import React from 'react';
import { useChessboardContext } from './ChessboardProvider';
import { getRelativeCoords } from './utils';

type Props = {
  boardWidth: number | undefined;
  boardHeight: number | undefined;
};

export function Highlights({ boardWidth, boardHeight }: Props) {
  const {
    id,
    highlights,
    highlightOptions,
    boardOrientation,
    chessboardColumns,
    chessboardRows,
  } = useChessboardContext();

  if (!boardWidth || !boardHeight) return null;

  // Each square is assumed to be a perfect square of this size
  const squareSize = boardWidth / chessboardColumns;
  const strokeWidth = Math.max(2, Math.round(squareSize / 18));

  // Reduce radius by half the stroke width so the outer edge touches the square boundary
  const radius = squareSize / 2 - strokeWidth / 2;

  // Map the logical colour names to actual CSS colours
  const resolveColor = (c?: string) => {
    switch (c) {
      case 'primary':
        return highlightOptions.primaryColor;
      case 'secondary':
        return highlightOptions.secondaryColor;
      case 'tertiary':
        return highlightOptions.tertiaryColor;
      default:
        return c ?? highlightOptions.primaryColor;
    }
  };

  return (
    <svg
      width={boardWidth}
      height={boardHeight}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 20, // above pieces
      }}
    >
      {highlights.map((highlight) => {
        const { x, y } = getRelativeCoords(
          boardOrientation,
          boardWidth,
          chessboardColumns,
          chessboardRows,
          highlight.square,
        );

        const stroke = resolveColor(highlight.color);

        return (
          <circle
            key={`${id}-highlight-${highlight.square}`}
            cx={x}
            cy={y}
            r={radius}
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        );
      })}
    </svg>
  );
}
