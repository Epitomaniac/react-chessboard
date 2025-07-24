import { useState, useEffect, useRef } from 'react';
import { useChessboardContext } from './ChessboardProvider';
import { getRelativeCoords } from './utils';

type Props = {
  boardWidth: number | undefined;
  visible: boolean;
  setVisible: Function;
};

export function PromotionDialog({ boardWidth, visible, setVisible }: Props) {
  const {
    boardOrientation,
    positionFen,
    promotionDialog,
    pieces,
    onPromotionPieceSelect,
  } = useChessboardContext();

  const dialogRef = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (promotionDialog.type !== 'none') setVisible(true);
  }, [promotionDialog]);

  useEffect(() => {
    if (!visible) return; // nothing to do if hidden

    const handlePointerUp = (e: PointerEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        e.stopPropagation(); // don’t let the click move a piece
        setVisible(false); // hide locally
      }
    };

    // capture phase so we run before board’s own handlers
    document.addEventListener('pointerup', handlePointerUp, true);
    return () =>
      document.removeEventListener('pointerup', handlePointerUp, true);
  }, [visible]);

  if (!boardWidth || !visible || promotionDialog.type === 'none') return null;

  const promotePieceColor =
    (typeof positionFen === 'string' ? positionFen.split(' ')[1] : undefined) ??
    'w';

  const promotionOptions = [
    `${promotePieceColor}Q`,
    `${promotePieceColor}R`,
    `${promotePieceColor}N`,
    `${promotePieceColor}B`,
  ];

  // Determines if promotion is happening on the bottom rank
  const isBottomRank =
    (boardOrientation === 'white' &&
      promotionDialog?.promotionSquare?.[1] === '1') ||
    (boardOrientation === 'black' &&
      promotionDialog?.promotionSquare[1] === '8');

  const dialogStyles: Record<
    'modal' | 'modalContent' | 'vertical',
    React.CSSProperties
  > = {
    modal: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
      border: '1px solid gray',
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

  const dialogCoords =
    promotionDialog.type === 'vertical'
      ? getRelativeCoords(
          boardOrientation,
          boardWidth,
          promotionDialog.promotionSquare,
        )
      : { x: 0, y: 0 };

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

  return promotionDialog.type === 'modal' ? (
    <div style={dialogStyles.modal}>
      <div ref={dialogRef} style={dialogStyles.modalContent}>
        {orderedPromotionOptions.map((option) => (
          <div
            tabIndex={-1}
            key={option}
            onPointerDown={() => {
              onPromotionPieceSelect?.(option);
              setVisible(false);
            }}
            onPointerEnter={() => setIsHover(option)}
            onPointerLeave={() => setIsHover(undefined)}
            style={{
              cursor: 'pointer',
              touchAction: 'none',
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
  ) : promotionDialog.type === 'vertical' ? (
    <div style={dialogStyles.modal}>
      <div
        ref={dialogRef}
        style={{
          position: 'absolute',
          top: isBottomRank ? undefined : `${dialogCoords?.y}px`,
          bottom: isBottomRank
            ? `${boardWidth - dialogCoords?.y}px`
            : undefined,
          left: `${dialogCoords?.x}px`,
          zIndex: 1000,
          width: boardWidth / 8,
          height: boardWidth / 2,
          boxSizing: 'border-box',
          border: '1px solid gray',
          ...dialogStyles.vertical,
        }}
        title="Choose promotion piece"
      >
        {orderedPromotionOptions.map((option) => (
          <div
            tabIndex={-1}
            key={option}
            onClick={() => onPromotionPieceSelect?.(option)}
            onPointerEnter={() => setIsHover(option)}
            onPointerLeave={() => setIsHover(undefined)}
            style={{
              cursor: 'pointer',
              touchAction: 'none',
              backgroundColor: isHover === option ? 'orange' : '#cabfa6ff',
              transition: 'all 0.1s ease-out',
            }}
          >
            <svg
              viewBox="1 1 43 43"
              width={boardWidth / 8}
              height={boardWidth / 8}
              style={{
                display: 'block',
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
    </div>
  ) : null;
}
