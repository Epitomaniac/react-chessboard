import { useState, useEffect, useRef } from 'react';
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

  const dialogRef = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState<string | undefined>(undefined);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (promotionDialog !== 'none') setVisible(true);
  }, [promotionDialog]);

  useEffect(() => {
    if (!visible) return; // nothing to do if hidden

    const handlePointerDown = (e: PointerEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        e.stopPropagation(); // don’t let the click move a piece
        setVisible(false); // hide locally
      }
    };

    // capture phase so we run before board’s own handlers
    document.addEventListener('pointerdown', handlePointerDown, true);
    return () =>
      document.removeEventListener('pointerdown', handlePointerDown, true);
  }, [visible]);

  if (!boardWidth || !visible || promotionDialog === 'none') return null;

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

  const dialogStyles: Record<
    'modal' | 'modalContent' | 'vertical',
    React.CSSProperties
  > = {
    modal: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      width: boardWidth, // so it overlays the board only
      height: boardWidth, // square overlay
      pointerEvents: 'auto',
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '16px',
      display: 'flex',
      gap: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      pointerEvents: 'auto',
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

  return promotionDialog === 'modal' ? (
    <div style={dialogStyles.modal}>
      <div ref={dialogRef} style={dialogStyles.modalContent}>
        {orderedPromotionOptions.map((option) => (
          <div
            key={option}
            onClick={() => {
              onPromotionPieceSelect?.(option);
              setVisible(false);
            }}
            onMouseOver={() => setIsHover(option)}
            onMouseOut={() => setIsHover(undefined)}
            style={{
              cursor: 'pointer',
              borderRadius: '8px',
              padding: '4px',
              backgroundColor: isHover === option ? '#f0ad4e' : 'white',
              transition: 'all 0.15s ease-in-out',
            }}
          >
            <svg
              viewBox="1 1 43 43"
              width={boardWidth / 8}
              height={boardWidth / 8}
              style={{
                transition: 'transform 0.15s ease-in-out',
                transform: isHover === option ? 'scale(1)' : 'scale(0.9)',
              }}
            >
              <g>
                <Piece option={option} />
              </g>
            </svg>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div
      ref={dialogRef}
      style={{
        position: 'absolute',
        top: isBottomRank ? undefined : `${dialogCoords?.y}px`,
        bottom: isBottomRank ? `${boardWidth - dialogCoords?.y}px` : undefined,
        left: `${dialogCoords?.x}px`,
        zIndex: 1000,
        ...dialogStyles.vertical,
      }}
      title="Choose promotion piece"
    >
      {orderedPromotionOptions.map((option) => (
        <div
          key={option}
          onClick={() => onPromotionPieceSelect?.(option)}
          onMouseOver={() => setIsHover(option)}
          onMouseOut={() => setIsHover(undefined)}
          style={{
            cursor: 'pointer',
            backgroundColor: isHover === option ? 'orange' : 'white',
            transition: 'all 0.1s ease-out',
          }}
        >
          <svg
            viewBox="1 1 43 43"
            width={boardWidth / 8}
            height={boardWidth / 8}
            style={{
              transition: 'all 0.1s ease-out',
              transform: isHover === option ? 'scale(1)' : 'scale(0.85)',
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
