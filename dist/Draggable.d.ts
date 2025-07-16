import type { DraggingPieceDataType, PieceDataType } from './types';
type DraggableProps = {
    children: React.ReactNode;
    isMovable: boolean;
    isSparePiece?: DraggingPieceDataType['isSparePiece'];
    pieceType: PieceDataType['pieceType'];
    position: DraggingPieceDataType['position'];
};
export declare function Draggable({ children, isMovable, isSparePiece, pieceType, position, }: DraggableProps): import("react/jsx-runtime").JSX.Element;
export {};
