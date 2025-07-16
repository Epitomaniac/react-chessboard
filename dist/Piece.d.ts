import type { DraggingPieceDataType, PieceDataType } from './types';
type PieceProps = {
    clone?: boolean;
    isMovable?: boolean;
    isSparePiece?: DraggingPieceDataType['isSparePiece'];
    position: DraggingPieceDataType['position'];
    pieceType: PieceDataType['pieceType'];
};
export declare const Piece: import("react").NamedExoticComponent<PieceProps>;
export {};
