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
  // the state that controls whether promotion dialog is open; it sits on the
  // parent component and is used by the square component in deciding to clear arrows
  const [visible, setVisible] = useState<boolean>(false);
  // determine which side has the move; this is used to determined whether the rendered piece is legal to move
  const playerSide =
    sideToMove ??
    (typeof positionFen === 'string' ? positionFen.split(' ')[1] : undefined) ??
    'w';

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
                  <Square
                    isOver={isOver}
                    isDialogOpen={visible}
                    {...square}
                    hasMovablePiece={
                      !!piece && piece.pieceType[0].toLowerCase() === playerSide
                    }
                  >
                    {piece ? (
                      <Draggable
                        isMovable={
                          sideToMove === 'both'
                            ? true
                            : piece.pieceType[0].toLowerCase() === playerSide
                        }
                        isSparePiece={false}
                        position={square.squareId}
                        pieceType={piece.pieceType}
                      >
                        <Piece
                          {...piece}
                          position={square.squareId}
                          isMovable={
                            sideToMove === 'both'
                              ? true
                              : piece.pieceType[0].toLowerCase() === playerSide
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

        <PromotionDialog
          boardWidth={boardWidth}
          visible={visible}
          setVisible={setVisible}
        />
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
