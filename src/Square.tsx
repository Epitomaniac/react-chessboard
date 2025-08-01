import { memo } from 'react';
import { useChessboardContext } from './ChessboardProvider';
import {
  defaultAlphaNotationStyle,
  defaultDarkSquareNotationStyle,
  defaultDarkSquareStyle,
  defaultDropSquareStyle,
  defaultLightSquareNotationStyle,
  defaultLightSquareStyle,
  defaultNumericNotationStyle,
  defaultSquareStyle,
} from './defaults';
import { SquareDataType, PieceHighlight } from './types';

type SquareProps = {
  children?: React.ReactNode;
  hasMovablePiece?: boolean;
  isDialogOpen: boolean;
  squareId: SquareDataType['squareId'];
  isLightSquare: SquareDataType['isLightSquare'];
  isOver: boolean;
};

export const Square = memo(function Square({
  children,
  hasMovablePiece,
  squareId,
  isDialogOpen,
  isLightSquare,
  isOver,
}: SquareProps) {
  const {
    id,
    allowDrawingArrows,
    boardOrientation,
    currentPosition,
    squareStyle,
    squareStyles,
    darkSquareStyle,
    lightSquareStyle,
    dropSquareStyle,
    darkSquareNotationStyle,
    lightSquareNotationStyle,
    alphaNotationStyle,
    numericNotationStyle,
    showNotation,
    onMouseOverSquare,
    onSquareClick,
    onSquareRightClick,
    squareRenderer,
    newArrowStartSquare,
    newArrowOverSquare,
    clearArrowsWithCallback,
    setNewArrowStartSquare,
    setNewArrowOverSquare,
    drawArrow,
    pieceHighlight,
    pieceHighlightColor,
  } = useChessboardContext();

  const column = squareId.match(/^[a-z]+/)?.[0];
  const row = squareId.match(/\d+$/)?.[0];

  const isValidHighlight = (
    h: PieceHighlight,
  ): h is { from: string; to?: string } => {
    return typeof (h as any).from === 'string';
  };

  const showPieceHighlight =
    isValidHighlight(pieceHighlight) &&
    (pieceHighlight.from === squareId || pieceHighlight.to === squareId);

  return (
    <div
      id={`${id}-square-${squareId}`}
      style={{
        ...defaultSquareStyle,
        ...squareStyle,
        ...(isLightSquare
          ? { ...defaultLightSquareStyle, ...lightSquareStyle }
          : { ...defaultDarkSquareStyle, ...darkSquareStyle }),
        ...(isOver ? { ...defaultDropSquareStyle, ...dropSquareStyle } : {}),
      }}
      data-column={column}
      data-row={row}
      data-square={squareId}
      onClick={(e) => {
        if (e.button === 0) {
          onSquareClick?.({
            piece: currentPosition[squareId] ?? null,
            square: squareId,
          });
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
      onMouseDown={(e) => {
        if (e.button === 2 && allowDrawingArrows) {
          setNewArrowStartSquare(squareId);
        }
      }}
      onMouseUp={(e) => {
        if (
          e.button === 0 &&
          allowDrawingArrows &&
          !hasMovablePiece &&
          !isDialogOpen &&
          Object.keys(squareStyles).length === 0
        ) {
          clearArrowsWithCallback();
        }
        if (e.button === 2) {
          e.preventDefault();
          onSquareRightClick?.({
            piece: currentPosition[squareId] ?? null,
            square: squareId,
            isDrawingArrow: allowDrawingArrows && !!newArrowOverSquare,
          });

          if (newArrowStartSquare) {
            drawArrow(squareId, {
              shiftKey: e.shiftKey,
              ctrlKey: e.ctrlKey,
            });
          }
        }
      }}
      onMouseOver={(e) => {
        // right mouse button is held down and we are drawing an arrow
        if (e.buttons === 2 && newArrowStartSquare) {
          setNewArrowOverSquare(squareId, {
            shiftKey: e.shiftKey,
            ctrlKey: e.ctrlKey,
          });
        }
        onMouseOverSquare?.({
          piece: currentPosition[squareId] ?? null,
          square: squareId,
        });
      }}
    >
      {showNotation ? (
        <span
          style={
            isLightSquare
              ? {
                  ...defaultLightSquareNotationStyle,
                  ...lightSquareNotationStyle,
                }
              : {
                  ...defaultDarkSquareNotationStyle,
                  ...darkSquareNotationStyle,
                }
          }
        >
          {row === (boardOrientation === 'white' ? '1' : '8') && (
            <span
              style={{ ...defaultAlphaNotationStyle, ...alphaNotationStyle }}
            >
              {column}
            </span>
          )}
          {column === (boardOrientation === 'white' ? 'h' : 'a') && (
            <span
              style={{
                ...defaultNumericNotationStyle,
                ...numericNotationStyle,
              }}
            >
              {row}
            </span>
          )}
        </span>
      ) : null}

      {squareRenderer?.({
        piece: currentPosition[squareId] ?? null,
        square: squareId,
        children,
      }) || (
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            ...squareStyles[squareId],
          }}
        >
          {showPieceHighlight && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `linear-gradient(${pieceHighlightColor}, ${pieceHighlightColor})`,
                opacity: 0.5,
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />
          )}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
            }}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
});
