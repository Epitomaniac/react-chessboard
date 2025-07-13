import { useChessboardContext } from './ChessboardProvider';
import { getRelativeCoords } from './utils';

type Props = {
  boardWidth: number | undefined;
  boardHeight: number | undefined;
};

export function Highlights({ boardWidth, boardHeight }: Props) {
  const { id, highlights, highlightOptions, boardOrientation } =
    useChessboardContext();

  if (!boardWidth || !boardHeight) return null;

  const squareSize = boardWidth / 8;
  const strokeWidth = Math.max(1, squareSize / 24);
  const padding = squareSize * 0.01;
  const radius = squareSize / 2 - strokeWidth / 2 - padding;

  const resolveColor = (c?: string) => {
    switch (c) {
      case 'primary':
        return highlightOptions.primaryColor;
      case 'secondary':
        return highlightOptions.secondaryColor;
      case 'tertiary':
        return highlightOptions.tertiaryColor;
      default:
        return c ?? highlightOptions.primaryColor;
    }
  };

  type SquareObject = { square: string; [key: string]: any };

  function deduplicateBySquare<T extends SquareObject>(arr: T[]): T[] {
    const map = new Map<string, T>();
    for (const item of arr) {
      map.set(item.square, item); // Last occurrence wins
    }
    return Array.from(map.values());
  }

  return (
    <svg
      width={boardWidth}
      height={boardHeight}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 20,
        shapeRendering: 'geometricPrecision', // smoother edges
      }}
    >
      {deduplicateBySquare(highlights).map((h) => {
        const { x, y } = getRelativeCoords(
          boardOrientation,
          boardWidth,
          h.square,
        );

        return (
          <circle
            key={`${id}-highlight-${h.square}`}
            cx={x}
            cy={y}
            r={radius}
            fill="none"
            stroke={resolveColor(h.color)}
            strokeWidth={strokeWidth}
            strokeOpacity={0.9}
            vectorEffect="non-scaling-stroke" // keeps stroke width crisp if scaled
          />
        );
      })}
    </svg>
  );
}
