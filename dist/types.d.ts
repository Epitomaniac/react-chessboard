export type Arrow = {
    startSquare: string;
    endSquare: string;
    color: 'primary' | 'secondary' | 'tertiary' | 'engine';
};
export type Highlight = {
    square: string;
    color: 'primary' | 'secondary' | 'tertiary' | 'engine';
};
export type PieceHighlight = {
    from: string;
    to?: string;
} | {};
export type SquareDataType = {
    squareId: string;
    isLightSquare: boolean;
};
export type PieceDataType = {
    pieceType: string;
};
export type DraggingPieceDataType = {
    isSparePiece: boolean;
    position: string;
    pieceType: string;
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
export type PieceRenderObject = Record<string, (props?: {
    fill?: string;
    svgStyle?: React.CSSProperties;
}) => React.JSX.Element>;
export type FenPieceString = 'p' | 'r' | 'n' | 'b' | 'q' | 'k' | 'P' | 'R' | 'N' | 'B' | 'Q' | 'K';
