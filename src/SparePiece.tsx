import { Draggable } from './Draggable';
import { Piece } from './Piece';

type SparePieceProps = {
  pieceType: string;
};

export function SparePiece({ pieceType }: SparePieceProps) {
  return (
    <Draggable
      isSparePiece
      position={pieceType}
      pieceType={pieceType}
      isMovable={true}
    >
      <Piece isSparePiece pieceType={pieceType} position={pieceType} />
    </Draggable>
  );
}
