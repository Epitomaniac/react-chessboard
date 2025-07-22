import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  pointerWithin,
  TouchSensor,
  useSensor,
  useSensors,
  rectIntersection,
} from '@dnd-kit/core';
import {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  fenStringToPositionObject,
  generateBoard,
  getPositionUpdates,
} from './utils';
import {
  Arrow,
  Highlight,
  PieceHighlight,
  SquareDataType,
  DraggingPieceDataType,
  PieceDropHandlerArgs,
  PieceHandlerArgs,
  PieceRenderObject,
  PositionDataType,
  SquareHandlerArgs,
  SquareArrowHandlerArgs,
} from './types';
import { defaultPieces } from './pieces';
import {
  defaultAlphaNotationStyle,
  defaultArrowOptions,
  defaultHighlightsOptions,
  defaultBoardStyle,
  defaultDarkSquareNotationStyle,
  defaultDarkSquareStyle,
  defaultDraggingPieceGhostStyle,
  defaultDraggingPieceStyle,
  defaultDropSquareStyle,
  defaultLightSquareNotationStyle,
  defaultLightSquareStyle,
  defaultNumericNotationStyle,
  defaultSquareStyle,
} from './defaults';

type Defined<T> = T extends undefined ? never : T;

type ContextType = {
  // id and fen
  id: Defined<ChessboardOptions['id']>;
  positionFen: Defined<ChessboardOptions['positionFen']>;

  // chessboard options
  sideToMove: Defined<ChessboardOptions['sideToMove']>;
  pieces: Defined<ChessboardOptions['pieces']>;
  promotionDialog: Defined<ChessboardOptions['promotionDialog']>;

  boardOrientation: Defined<ChessboardOptions['boardOrientation']>;

  boardStyle: Defined<ChessboardOptions['boardStyle']>;
  squareStyle: Defined<ChessboardOptions['squareStyle']>;
  squareStyles: Defined<ChessboardOptions['squareStyles']>;
  darkSquareStyle: Defined<ChessboardOptions['darkSquareStyle']>;
  lightSquareStyle: Defined<ChessboardOptions['lightSquareStyle']>;
  dropSquareStyle: Defined<ChessboardOptions['dropSquareStyle']>;
  draggingPieceStyle: Defined<ChessboardOptions['draggingPieceStyle']>;
  draggingPieceGhostStyle: Defined<
    ChessboardOptions['draggingPieceGhostStyle']
  >;

  darkSquareNotationStyle: Defined<
    ChessboardOptions['darkSquareNotationStyle']
  >;
  lightSquareNotationStyle: Defined<
    ChessboardOptions['lightSquareNotationStyle']
  >;
  alphaNotationStyle: Defined<ChessboardOptions['alphaNotationStyle']>;
  numericNotationStyle: Defined<ChessboardOptions['numericNotationStyle']>;
  showNotation: Defined<ChessboardOptions['showNotation']>;

  animationDuration: Defined<ChessboardOptions['animationDuration']>;
  showAnimations: Defined<ChessboardOptions['showAnimations']>;

  allowDragging: Defined<ChessboardOptions['allowDragging']>;

  allowDrawingArrows: Defined<ChessboardOptions['allowDrawingArrows']>;
  arrows: Defined<ChessboardOptions['arrows']>;
  arrowOptions: Defined<ChessboardOptions['arrowOptions']>;
  allowHighlights: Defined<ChessboardOptions['allowHighlights']>;
  highlights: Defined<ChessboardOptions['highlights']>;
  highlightOptions: Defined<ChessboardOptions['highlightOptions']>;
  pieceHighlight: Defined<ChessboardOptions['pieceHighlight']>;
  pieceHighlightColor: Defined<ChessboardOptions['pieceHighlightColor']>;

  onMouseOverSquare: ChessboardOptions['onMouseOverSquare'];
  onPieceClick: ChessboardOptions['onPieceClick'];
  onSquareClick: ChessboardOptions['onSquareClick'];
  onSquareRightClick: ChessboardOptions['onSquareRightClick'];
  onPromotionPieceSelect: ChessboardOptions['onPromotionPieceSelect'];
  squareRenderer: ChessboardOptions['squareRenderer'];

  // internal state
  board: SquareDataType[][];
  isWrapped: boolean;
  draggingPiece: DraggingPieceDataType | null;
  currentPosition: PositionDataType;
  positionDifferences: ReturnType<typeof getPositionUpdates>;
  newArrowStartSquare: string | null;
  newArrowOverSquare: { square: string; color: string } | null;
  setNewArrowStartSquare: (square: string) => void;
  setNewArrowOverSquare: (
    square: string,
    modifiers?: { shiftKey: boolean; ctrlKey: boolean },
  ) => void;
  internalArrows: Arrow[];
  externalArrows: Arrow[];
  drawArrow: (
    newArrowEndSquare: string,
    modifiers?: { shiftKey: boolean; ctrlKey: boolean },
  ) => void;
  clearArrows: () => void;
};

const ChessboardContext = createContext<ContextType | null>(null);

export const useChessboardContext = () => use(ChessboardContext) as ContextType;

export type ChessboardOptions = {
  // id
  id?: string;

  // pieces and position
  sideToMove?: string | null;
  pieces?: PieceRenderObject;
  positionFen?: string | PositionDataType;
  promotionDialog?: { type: string; promotionSquare: string };

  // board dimensions and orientation
  boardOrientation?: 'white' | 'black';

  // board and squares styles
  boardStyle?: React.CSSProperties;
  squareStyle?: React.CSSProperties;
  squareStyles?: Record<string, React.CSSProperties>;
  darkSquareStyle?: React.CSSProperties;
  lightSquareStyle?: React.CSSProperties;
  dropSquareStyle?: React.CSSProperties;
  draggingPieceStyle?: React.CSSProperties;
  draggingPieceGhostStyle?: React.CSSProperties;

  // notation
  darkSquareNotationStyle?: React.CSSProperties;
  lightSquareNotationStyle?: React.CSSProperties;
  alphaNotationStyle?: React.CSSProperties;
  numericNotationStyle?: React.CSSProperties;
  showNotation?: string;

  // animation
  animationDuration?: number;
  showAnimations?: boolean;

  // drag and drop
  allowDragging?: boolean;
  dragActivationDistance?: number;

  // arrows
  allowDrawingArrows?: boolean;
  arrows?: Arrow[];
  arrowOptions?: typeof defaultArrowOptions;
  clearArrowsOnClick?: boolean;

  // highlights
  allowHighlights?: boolean;
  highlights?: Highlight[];
  highlightOptions?: typeof defaultHighlightsOptions;
  pieceHighlight?: PieceHighlight;
  pieceHighlightColor?: string;

  // handlers
  onArrowsChange?: (arrows: Arrow[]) => void;
  onMouseOverSquare?: ({ piece, square }: SquareHandlerArgs) => void;
  onPieceClick?: ({ isSparePiece, piece, square }: PieceHandlerArgs) => void;
  onPieceDrag?: ({ isSparePiece, piece, square }: PieceHandlerArgs) => void;
  onPieceDrop?: ({
    piece,
    sourceSquare,
    targetSquare,
  }: PieceDropHandlerArgs) => boolean;
  onSquareClick?: ({ piece, square }: SquareHandlerArgs) => void;
  onSquareRightClick?: ({
    piece,
    square,
    isDrawingArrow,
  }: SquareArrowHandlerArgs) => void;
  onPromotionPieceSelect?: (piece: string) => void;
  squareRenderer?: ({
    piece,
    square,
    children,
  }: SquareHandlerArgs & { children?: React.ReactNode }) => React.JSX.Element;
};

export function ChessboardProvider({
  children,
  options,
}: React.PropsWithChildren<{ options?: ChessboardOptions }>) {
  const {
    // id
    id = 'chessboard',

    // pieces and position
    pieces = defaultPieces,
    positionFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    promotionDialog = { type: 'none', promotionSquare: 'none' },

    // board dimensions and orientation
    boardOrientation = 'white',
    sideToMove = null,

    // board and squares styles
    boardStyle = defaultBoardStyle(),
    squareStyle = defaultSquareStyle,
    squareStyles = {},
    darkSquareStyle = defaultDarkSquareStyle,
    lightSquareStyle = defaultLightSquareStyle,
    dropSquareStyle = defaultDropSquareStyle,
    draggingPieceStyle = defaultDraggingPieceStyle,
    draggingPieceGhostStyle = defaultDraggingPieceGhostStyle,

    // notation
    darkSquareNotationStyle = defaultDarkSquareNotationStyle,
    lightSquareNotationStyle = defaultLightSquareNotationStyle,
    alphaNotationStyle = defaultAlphaNotationStyle,
    numericNotationStyle = defaultNumericNotationStyle,
    showNotation = 'inside',

    // animation
    animationDuration = 300,
    showAnimations = true,

    // drag and drop
    allowDragging = true,
    dragActivationDistance = 1,

    // arrows
    allowDrawingArrows = true,
    arrows = [],
    arrowOptions = defaultArrowOptions,

    // highlights
    allowHighlights = true,
    highlights = [],
    highlightOptions = defaultHighlightsOptions,
    pieceHighlight = {},
    pieceHighlightColor = '#005380',

    // handlers
    onArrowsChange,
    onMouseOverSquare,
    onPieceClick,
    onPieceDrag,
    onPieceDrop,
    onSquareClick,
    onSquareRightClick,
    onPromotionPieceSelect,
    squareRenderer,
  } = options || {};

  // the piece currently being dragged
  const [draggingPiece, setDraggingPiece] =
    useState<DraggingPieceDataType | null>(null);

  // the current position of pieces on the chessboard
  const [currentPosition, setCurrentPosition] = useState(
    typeof positionFen === 'string'
      ? fenStringToPositionObject(positionFen)
      : positionFen,
  );

  // calculated differences between current and incoming positions
  const [positionDifferences, setPositionDifferences] = useState<
    ReturnType<typeof getPositionUpdates>
  >({});

  // if the latest move was a manual drop
  const [manuallyDroppedPieceAndSquare, setManuallyDroppedPieceAndSquare] =
    useState<{
      piece: string;
      sourceSquare: string;
      targetSquare: string;
    } | null>(null);

  // arrows
  const [newArrowStartSquare, setNewArrowStartSquare] = useState<string | null>(
    null,
  );
  const [newArrowOverSquare, setNewArrowOverSquare] = useState<{
    square: string;
    color: string;
  } | null>(null);
  const [internalArrows, setInternalArrows] = useState<Arrow[]>([]);
  const [externalArrows, setExternalArrows] = useState<Arrow[]>([]);

  // position we are animating to, if a new position comes in before the animation completes, we will use this to set the new position
  const [waitingForAnimationPosition, setWaitingForAnimationPosition] =
    useState<PositionDataType | null>(null);

  // the animation timeout whilst waiting for animation to complete
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // if the position changes, we need to recreate the pieces array
  useEffect(() => {
    clearArrows();
    const newPosition =
      typeof positionFen === 'string'
        ? fenStringToPositionObject(positionFen)
        : positionFen;

    // if no animation, just set the position
    if (!showAnimations) {
      setCurrentPosition(newPosition);
      return;
    }

    const isPromotionOrUndo = (() => {
      const promotionPieces = ['Q', 'R', 'B', 'N'];

      // Track all changed squares
      const changedSquares = Object.keys({
        ...currentPosition,
        ...newPosition,
      }).filter((sq) => {
        const oldPiece = currentPosition[sq]?.pieceType;
        const newPiece = newPosition[sq]?.pieceType;
        return oldPiece !== newPiece;
      });

      // --- Detect promotion (including capture) ---
      if (changedSquares.length === 2) {
        const [sq1, sq2] = changedSquares;

        const new1 = newPosition[sq1];

        // Determine fromSq (emptied) and toSq (gained promoted piece)
        const fromSq = new1 ? sq2 : sq1;
        const toSq = new1 ? sq1 : sq2;

        const oldFrom = currentPosition[fromSq];
        const newTo = newPosition[toSq];

        if (oldFrom && newTo) {
          const oldColor = oldFrom.pieceType[0];
          const oldType = oldFrom.pieceType[1];
          const newType = newTo.pieceType[1];
          const toRank = parseInt(toSq[1], 10);

          const isWhitePromo =
            oldColor === 'w' && oldType === 'P' && toRank === 8;
          const isBlackPromo =
            oldColor === 'b' && oldType === 'P' && toRank === 1;

          if (
            (isWhitePromo || isBlackPromo) &&
            promotionPieces.includes(newType)
          ) {
            return true;
          }
        }
      }

      // --- Detect undo of promotion ---
      const promotedDisappeared = Object.entries(currentPosition).filter(
        ([sq, piece]) => {
          const newPiece = newPosition[sq];
          return (
            piece &&
            promotionPieces.includes(piece.pieceType[1]) &&
            (sq[1] === '8' || sq[1] === '1') &&
            (!newPiece || newPiece.pieceType !== piece.pieceType)
          );
        },
      );

      const pawnAppeared = Object.entries(newPosition).filter(([sq, piece]) => {
        const oldPiece = currentPosition[sq];
        return (
          piece?.pieceType?.[1] === 'P' &&
          (sq[1] === '7' || sq[1] === '2') &&
          (!oldPiece || oldPiece.pieceType[1] !== 'P')
        );
      });

      if (promotedDisappeared.length === 1 && pawnAppeared.length === 1) {
        const [promoSq] = promotedDisappeared[0];
        const [pawnSq] = pawnAppeared[0];
        const promoFile = promoSq[0];
        const promoRank = Number(promoSq[1]);
        const pawnFile = pawnSq[0];
        const pawnRank = Number(pawnSq[1]);

        const sameOrAdjacentFile =
          Math.abs(promoFile.charCodeAt(0) - pawnFile.charCodeAt(0)) <= 1;

        if (
          sameOrAdjacentFile &&
          ((promoRank === 8 && pawnRank === 7) ||
            (promoRank === 1 && pawnRank === 2))
        ) {
          return true;
        }
      }

      return false;
    })();

    const isValidHighlight = (
      h: PieceHighlight,
    ): h is { from: string; to?: string } =>
      typeof (h as any).from === 'string';

    if (
      (isValidHighlight(pieceHighlight) && pieceHighlight.to) ||
      isPromotionOrUndo
    ) {
      setCurrentPosition(newPosition);
      setWaitingForAnimationPosition(null);
      setPositionDifferences({});
      return;
    }

    // save copy of the waiting for animation position so we can use it later but clear it from state so we don't use it in the next animation
    const currentWaitingForAnimationPosition = waitingForAnimationPosition;

    // if we are waiting for an animation to complete from a previous move, set the saved position to immediately end the animation
    if (currentWaitingForAnimationPosition) {
      setCurrentPosition(currentWaitingForAnimationPosition);
      setWaitingForAnimationPosition(null);
    }

    // get list of position updates as pieces to potentially animate
    const positionUpdates = getPositionUpdates(
      currentWaitingForAnimationPosition ?? currentPosition, // use the saved position if it exists, otherwise use the current position
      newPosition,
      boardOrientation,
    );

    const multiplePiecesMoved = Object.keys(positionUpdates).length > 1;

    // manually dropped piece caused multiple pieces to move (e.g. castling)
    if (manuallyDroppedPieceAndSquare && multiplePiecesMoved) {
      // create a new position with just the dropped piece moved
      const intermediatePosition = { ...currentPosition };
      delete intermediatePosition[manuallyDroppedPieceAndSquare.sourceSquare];
      intermediatePosition[
        manuallyDroppedPieceAndSquare.targetSquare as string
      ] = {
        pieceType: manuallyDroppedPieceAndSquare.piece as string,
      };
      setCurrentPosition(intermediatePosition);

      // create position differences with only the other pieces' movements
      const otherPiecesUpdates = { ...positionUpdates };
      delete otherPiecesUpdates[manuallyDroppedPieceAndSquare.sourceSquare];
      setPositionDifferences(otherPiecesUpdates);

      // animate the other pieces' movements
      const newTimeout = setTimeout(() => {
        setCurrentPosition(newPosition);
        setPositionDifferences({});
        setManuallyDroppedPieceAndSquare(null);
      }, animationDuration);

      animationTimeoutRef.current = newTimeout;
      return;
    }

    // new position was a result of a manual drop
    if (manuallyDroppedPieceAndSquare) {
      // no animation needed, just set the position and reset the flag
      setCurrentPosition(newPosition);
      setManuallyDroppedPieceAndSquare(null);
      return;
    }

    // new position was a result of an external move

    setPositionDifferences(positionUpdates);
    setWaitingForAnimationPosition(newPosition);

    // start animation timeout
    const newTimeout = setTimeout(() => {
      setCurrentPosition(newPosition);
      setPositionDifferences({});
      setWaitingForAnimationPosition(null);
    }, animationDuration);

    // update the ref to the new timeout
    animationTimeoutRef.current = newTimeout;

    // clear timeout on unmount
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [positionFen]);

  // if the orientation changes, we need to recreate the pieces array
  useEffect(() => {
    setCurrentPosition(
      typeof positionFen === 'string'
        ? fenStringToPositionObject(positionFen)
        : positionFen,
    );
  }, [boardOrientation]);

  // only redraw the board when the orientation changes
  const board = useMemo(
    () => generateBoard(boardOrientation),
    [boardOrientation],
  );

  // acts as an event listener for the chessboard's arrows prop
  useEffect(() => {
    const isValidArrow = (item: any): item is Arrow => {
      return (
        typeof item === 'object' &&
        item !== null &&
        typeof item.startSquare === 'string' &&
        typeof item.endSquare === 'string' &&
        ['primary', 'secondary', 'tertiary', 'engine'].includes(item.color)
      );
    };
    if (
      arrows.every(isValidArrow) &&
      JSON.stringify(externalArrows) !== JSON.stringify(arrows)
    ) {
      setExternalArrows(arrows);
    }
  }, [arrows]);

  // if the arrows change, call the onArrowsChange callback
  useEffect(() => {
    const filteredExternalArrows = externalArrows.filter(
      (arrow) => arrow.color !== 'engine',
    );
    onArrowsChange?.([...filteredExternalArrows, ...internalArrows]);
  }, [externalArrows, internalArrows]);

  function clearArrows() {
    const filteredExternalArrows = externalArrows.filter(
      (arrow) => arrow.color === 'engine',
    );
    setInternalArrows([]);
    setExternalArrows(filteredExternalArrows);
    setNewArrowStartSquare(null);
    setNewArrowOverSquare(null);
  }

  const drawArrow = useCallback(
    (
      newArrowEndSquare: string,
      modifiers?: { shiftKey: boolean; ctrlKey: boolean },
    ) => {
      if (!allowDrawingArrows) {
        return;
      }

      const allArrows = [...externalArrows, ...internalArrows];
      const arrowColor = modifiers?.shiftKey
        ? 'secondary'
        : modifiers?.ctrlKey
          ? 'tertiary'
          : 'primary';

      const arrowExists = allArrows.some(
        (arrow) =>
          arrow.startSquare === newArrowStartSquare &&
          arrow.endSquare === newArrowEndSquare &&
          arrow.color === arrowColor,
      );

      const arrowExistsWithDifferentColor = allArrows.some(
        (arrow) =>
          arrow.startSquare === newArrowStartSquare &&
          arrow.endSquare === newArrowEndSquare &&
          arrow.color !== arrowColor &&
          arrow.color !== 'engine',
      );

      // if the arrow already exists, clear it
      if (arrowExists) {
        setInternalArrows((prev) =>
          prev.filter(
            (arrow) =>
              !(
                arrow.startSquare === newArrowStartSquare &&
                arrow.endSquare === newArrowEndSquare &&
                arrow.color === arrowColor
              ),
          ),
        );
        setExternalArrows((prev) =>
          prev.filter(
            (arrow) =>
              !(
                arrow.startSquare === newArrowStartSquare &&
                arrow.endSquare === newArrowEndSquare &&
                arrow.color === arrowColor
              ),
          ),
        );
        setNewArrowStartSquare(null);
        setNewArrowOverSquare(null);
        return;
      }

      // if the arrow exists with a different color, overwrite it
      if (arrowExistsWithDifferentColor) {
        setInternalArrows((prev) =>
          prev.filter(
            (arrow) =>
              !(
                arrow.startSquare === newArrowStartSquare &&
                arrow.endSquare === newArrowEndSquare
              ),
          ),
        );
        setExternalArrows((prev) =>
          prev.filter(
            (arrow) =>
              !(
                arrow.startSquare === newArrowStartSquare &&
                arrow.endSquare === newArrowEndSquare
              ),
          ),
        );
      }

      // new arrow with different start and end square, add to internal arrows
      if (newArrowStartSquare && newArrowStartSquare !== newArrowEndSquare) {
        setInternalArrows((prevArrows) => [
          ...prevArrows,
          {
            startSquare: newArrowStartSquare,
            endSquare: newArrowEndSquare,
            color: arrowColor,
          },
        ]);
      }

      setNewArrowStartSquare(null);
      setNewArrowOverSquare(null);
    },
    [
      allowDrawingArrows,
      externalArrows,
      internalArrows,
      arrowOptions.primaryColor,
      arrowOptions.secondaryColor,
      arrowOptions.tertiaryColor,
      newArrowStartSquare,
      newArrowOverSquare,
    ],
  );

  const setNewArrowOverSquareWithModifiers = useCallback(
    (square: string, modifiers?: { shiftKey: boolean; ctrlKey: boolean }) => {
      const color = modifiers?.shiftKey
        ? arrowOptions.secondaryColor
        : modifiers?.ctrlKey
          ? arrowOptions.tertiaryColor
          : arrowOptions.primaryColor;
      setNewArrowOverSquare({ square, color });
    },
    [arrowOptions],
  );

  const handleDragCancel = useCallback(() => {
    setDraggingPiece(null);
  }, []);

  const handleDragEnd = useCallback(
    function handleDragEnd(event: DragEndEvent) {
      if (!draggingPiece) {
        return;
      }

      const dropSquare = event.over?.id.toString();

      // dropped outside of droppable area (e.g. off board)
      if (!dropSquare) {
        onPieceDrop?.({
          piece: draggingPiece,
          sourceSquare: draggingPiece.position,
          targetSquare: null,
        });
        // set as manually dropped piece so that no animation is shown
        setManuallyDroppedPieceAndSquare({
          piece: draggingPiece.pieceType,
          sourceSquare: draggingPiece.position,
          targetSquare: '',
        });
        setDraggingPiece(null);
        return;
      }

      if (event.over) {
        const isDropValid = onPieceDrop?.({
          piece: draggingPiece,
          sourceSquare: draggingPiece.position,
          targetSquare: dropSquare,
        });

        // if the drop is valid, set the manually dropped piece and square
        if (isDropValid) {
          setManuallyDroppedPieceAndSquare({
            piece: draggingPiece.pieceType,
            sourceSquare: draggingPiece.position,
            targetSquare: dropSquare,
          });
        }
        setDraggingPiece(null);
      }
    },
    [draggingPiece],
  );

  const handleDragStart = useCallback(
    // active.id is the id of the piece being dragged
    function handleDragStart({ active }: DragStartEvent) {
      // the id is either the position of the piece on the board if it's on the board (e.g. "a1", "b2", etc.), or the type of the piece if it's a spare piece (e.g. "wP", "bN", etc.)
      const isSparePiece = active.data.current?.isSparePiece;

      onPieceDrag?.({
        isSparePiece,
        piece: isSparePiece
          ? {
              pieceType: active.id as string,
            }
          : currentPosition[active.id],
        square: isSparePiece ? null : (active.id as string),
      });

      setDraggingPiece({
        isSparePiece,
        position: active.id as string,
        pieceType: isSparePiece
          ? (active.id as string)
          : currentPosition[active.id].pieceType,
      });
      return;
    },
    [currentPosition],
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: dragActivationDistance,
      },
    }),
    useSensor(KeyboardSensor),
    useSensor(TouchSensor),
  );

  // collision detection that first tries pointer-based detection and then falls back to rectangle intersection for keyboards
  function collisionDetection(args: Parameters<typeof pointerWithin>[0]) {
    // first try pointer-based collision detection
    const pointerCollisions = pointerWithin(args);

    // if we found collisions with the pointer, return those
    if (pointerCollisions.length > 0) {
      return pointerCollisions;
    }

    // otherwise fall back to rectangle intersection
    return rectIntersection(args);
  }

  return (
    <ChessboardContext.Provider
      value={{
        // chessboard options
        id,
        positionFen,

        pieces,
        sideToMove,
        promotionDialog,

        boardOrientation,

        boardStyle,
        squareStyle,
        squareStyles,
        darkSquareStyle,
        lightSquareStyle,
        dropSquareStyle,
        draggingPieceStyle,
        draggingPieceGhostStyle,

        darkSquareNotationStyle,
        lightSquareNotationStyle,
        alphaNotationStyle,
        numericNotationStyle,
        showNotation,

        animationDuration,
        showAnimations,

        allowDragging,

        allowDrawingArrows,
        arrows,
        arrowOptions,

        allowHighlights,
        highlights,
        highlightOptions,
        pieceHighlight,
        pieceHighlightColor,

        onMouseOverSquare,
        onPieceClick,
        onSquareClick,
        onSquareRightClick,
        onPromotionPieceSelect,
        squareRenderer,

        // internal state
        board,
        isWrapped: true,
        draggingPiece,
        currentPosition,
        positionDifferences,
        newArrowStartSquare,
        newArrowOverSquare,
        setNewArrowStartSquare,
        setNewArrowOverSquare: setNewArrowOverSquareWithModifiers,
        internalArrows,
        externalArrows,
        drawArrow,
        clearArrows,
      }}
    >
      <DndContext
        collisionDetection={collisionDetection}
        autoScroll={false}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
        sensors={sensors}
      >
        {children}
      </DndContext>
    </ChessboardContext.Provider>
  );
}
