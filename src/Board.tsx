import { DragOverlay } from '@dnd-kit/core';
import { snapCenterToCursor } from '@dnd-kit/modifiers';
import { useEffect, useRef, useState } from 'react';

import { Arrows } from './Arrows';
import { Highlights } from './Highlights';
import { Draggable } from './Draggable';
import { Droppable } from './Droppable';
import { Piece } from './Piece';
import { Square } from './Square';
import { useChessboardContext } from './ChessboardProvider';
import { defaultBoardStyle } from './defaults';
import { PromotionDialog } from './PromotionDialog';

export function Board() {
  const {
    board,
    positionFen,
    sideToMove,
    boardStyle,
    currentPosition,
    draggingPiece,
    id,
  } = useChessboardContext();
  const boardRef = useRef<HTMLDivElement>(null);
  const [boardWidth, setBoardWidth] = useState(boardRef.current?.clientWidth);
  const [boardHeight, setBoardHeight] = useState(
    boardRef.current?.clientHeight,
  );
  // determine which side has the move; this is used to determined whether the rendered piece is legal to move
  const playerSide = sideToMove ?? positionFen.split(' ')[1];

  // if the board dimensions change, update the board width and height
  useEffect(() => {
    if (boardRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        setBoardWidth(boardRef.current?.clientWidth as number);
        setBoardHeight(boardRef.current?.clientHeight as number);
      });
      resizeObserver.observe(boardRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [boardRef.current]);

  return (
    <>
      <div
        id={`${id}-board`}
        ref={boardRef}
        style={{ ...defaultBoardStyle(), ...boardStyle }}
      >
        {board.map((row) =>
          row.map((square) => {
            const piece = currentPosition[square.squareId];

            return (
              <Droppable key={square.squareId} squareId={square.squareId}>
                {({ isOver }) => (
                  <Square isOver={isOver} {...square}>
                    {piece ? (
                      <Draggable
                        isMovable={
                          piece.pieceType[0].toLowerCase() === playerSide
                        }
                        isSparePiece={false}
                        position={square.squareId}
                        pieceType={piece.pieceType}
                      >
                        <Piece
                          {...piece}
                          position={square.squareId}
                          isMovable={
                            piece.pieceType[0].toLowerCase() === playerSide
                          }
                        />
                      </Draggable>
                    ) : null}
                  </Square>
                )}
              </Droppable>
            );
          }),
        )}

        <Arrows boardWidth={boardWidth} boardHeight={boardHeight} />
        <Highlights boardWidth={boardWidth} boardHeight={boardHeight} />
        <PromotionDialog boardWidth={boardWidth} />
      </div>

      <DragOverlay dropAnimation={null} modifiers={[snapCenterToCursor]}>
        {draggingPiece ? (
          <Piece
            clone
            position={draggingPiece.position}
            pieceType={draggingPiece.pieceType}
          />
        ) : null}
      </DragOverlay>
    </>
  );
}
