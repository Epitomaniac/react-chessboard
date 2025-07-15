import { useState } from 'react';
import { useChessboardContext } from './ChessboardProvider';
import { getRelativeCoords } from './utils';

type Props = {
  boardWidth: number | undefined;
};

export function PromotionDialog({ boardWidth }: Props) {
  const {
    boardOrientation,
    position,
    promotionDialog,
    pieces,
    onPromotionPieceSelect,
  } = useChessboardContext();
  if (!boardWidth || promotionDialog === 'none') return;

  const [isHover, setIsHover] = useState(false);

  const promotePieceColor = position.split(' ')[1];

  const promotionOptions = [
    `${promotePieceColor}Q`,
    `${promotePieceColor}R`,
    `${promotePieceColor}N`,
    `${promotePieceColor}B`,
  ];

  // Determines if promotion is happening on the bottom rank
  const isBottomRank =
    (boardOrientation === 'white' && promotionDialog?.[1] === '1') ||
    (boardOrientation === 'black' && promotionDialog?.[1] === '8');

  const dialogStyles = {
    modal: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transform: `translate(0px, ${(3 * boardWidth) / 8}px)`,
      width: '100%',
      height: `${boardWidth / 4}px`,
      top: 0,
      backgroundColor: 'white',
      left: 0,
    },
    vertical: {
      transform: isBottomRank
        ? `translate(${-boardWidth / 16}px, ${+boardWidth / 16}px)`
        : `translate(${-boardWidth / 16}px, ${-boardWidth / 16}px)`,
    },
  };

  const dialogCoords = getRelativeCoords(
    boardOrientation,
    boardWidth,
    promotionDialog,
  );

  // Reversing the order in which piece icons appear for vertical dialog if promotion occurs on the bottom rank
  const orderedPromotionOptions = isBottomRank
    ? promotionOptions.reverse()
    : promotionOptions;

  type PieceSelectorProps = {
    option: keyof typeof pieces; // "wQ" | "wR" | ...
  };

  const Piece: React.FC<PieceSelectorProps> = ({ option }) => {
    const PieceSvg = pieces[option]; // grab the component
    return <PieceSvg />; // render it
  };

  return (
    <div
      style={{
        position: 'absolute',
        // Bottom‑rank promotion forces the dialog to start from the bottom edge
        top: isBottomRank ? undefined : `${dialogCoords?.y}px`,
        bottom: isBottomRank ? `${boardWidth - dialogCoords?.y}px` : undefined,
        left: `${dialogCoords?.x}px`,
        zIndex: 1000,

        // add the right style variant
        ...(promotionDialog.includes('modal')
          ? dialogStyles.modal
          : dialogStyles.vertical),
      }}
      title="Choose promotion piece"
    >
      {orderedPromotionOptions.map((option) => (
        <div
          key={option}
          onClick={() => {
            onPromotionPieceSelect?.(option);
          }}
          onMouseOver={() => setIsHover(true)}
          onMouseOut={() => setIsHover(false)}
          style={{
            cursor: 'pointer',
            backgroundColor: isHover ? 'orange' : 'white',
            borderRadius: '4px',
            transition: 'all 0.1s ease-out',
          }}
        >
          <svg
            viewBox={'1 1 43 43'}
            width={boardWidth / 8}
            height={boardWidth / 8}
            style={{
              transition: 'all 0.1s ease-out',
              transform: isHover ? 'scale(1)' : 'scale(0.85)',
            }}
          >
            <g>
              <Piece option={option} />
            </g>
          </svg>
        </div>
      ))}
    </div>
  );
}
