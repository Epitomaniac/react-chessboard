export type Arrow = {
  startSquare: string;
  endSquare: string;
  color: 'primary' | 'secondary' | 'tertiary' | 'engine'; // the colors would then be mapped based on the values inside arrowOptions object
};

export type Highlight = {
  square: string;
  color: 'primary' | 'secondary' | 'tertiary' | 'engine';
};

export type PieceHighlight = { from: string; to?: string } | {};

export type SquareDataType = {
  squareId: string; // e.g. "a8"
  isLightSquare: boolean;
};

export type PieceDataType = {
  pieceType: string; // e.g. "wP" for white pawn, "bK" for black king
};

export type DraggingPieceDataType = {
  isSparePiece: boolean;
  position: string; // e.g. "a8" or "wP" (for spare pieces)
  pieceType: string; // e.g. "wP" for white pawn, "bK" for black king
};

export type PositionDataType = {
  [square: string]: PieceDataType;
};

export type SquareHandlerArgs = {
  piece: PieceDataType | null;
  square: string;
};

export type SquareArrowHandlerArgs = {
  piece: PieceDataType | null;
  square: string;
  isDrawingArrow: boolean;
};

export type PieceHandlerArgs = {
  isSparePiece: boolean;
  piece: PieceDataType;
  square: string | null;
};

export type PieceDropHandlerArgs = {
  piece: DraggingPieceDataType;
  sourceSquare: string;
  targetSquare: string | null;
};

export type PieceRenderObject = Record<
  string,
  (props?: {
    fill?: string;
    svgStyle?: React.CSSProperties;
  }) => React.JSX.Element
>;

export type FenPieceString =
  | 'p'
  | 'r'
  | 'n'
  | 'b'
  | 'q'
  | 'k'
  | 'P'
  | 'R'
  | 'N'
  | 'B'
  | 'Q'
  | 'K';
