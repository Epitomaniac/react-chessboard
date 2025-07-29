import { Fragment } from 'react';

import { useChessboardContext } from './ChessboardProvider';
import { getRelativeCoords } from './utils';

type Props = {
  boardWidth: number | undefined;
  boardHeight: number | undefined;
};

export function Arrows({ boardWidth, boardHeight }: Props) {
  const {
    id,
    externalArrows,
    internalArrows,
    engineArrows,
    arrowOptions,
    boardOrientation,
    newArrowStartSquare,
    newArrowOverSquare,
  } = useChessboardContext();

  if (!boardWidth) return null;

  // ---------------------------------------------------------------------------
  // 1 · Work out whether the user is currently dragging/drawing an arrow
  // ---------------------------------------------------------------------------
  const currentlyDrawingArrow =
    newArrowStartSquare &&
    newArrowOverSquare &&
    newArrowStartSquare !== newArrowOverSquare.square
      ? {
          startSquare: newArrowStartSquare,
          endSquare: newArrowOverSquare.square,
          color: newArrowOverSquare.color,
        }
      : null;

  // ---------------------------------------------------------------------------
  // 2 · Merge and deduplicate, giving precedence to arrows with color “engine”
  // ---------------------------------------------------------------------------
  const combined = [...engineArrows, ...externalArrows, ...internalArrows];
  const byKey = new Map<string, (typeof combined)[number]>();

  for (const arrow of combined) {
    const key = `${arrow.startSquare}-${arrow.endSquare}`;
    const existing = byKey.get(key);

    if (arrow.color === 'engine' || !existing || existing.color !== 'engine') {
      byKey.set(key, arrow); // engine overwrites, others set if empty
    }
  }

  if (currentlyDrawingArrow) {
    byKey.set(
      `${currentlyDrawingArrow.startSquare}-${currentlyDrawingArrow.endSquare}`,
      {
        ...currentlyDrawingArrow,
        color: currentlyDrawingArrow.color as
          | 'primary'
          | 'secondary'
          | 'tertiary'
          | 'engine',
      },
    );
  }

  const arrowsToDraw = Array.from(byKey.values());

  // ---------------------------------------------------------------------------
  // 3 · Render
  // ---------------------------------------------------------------------------
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
      }}
    >
      {arrowsToDraw.map((arrow, i) => {
        const from = getRelativeCoords(
          boardOrientation,
          boardWidth,
          arrow.startSquare,
        );
        const to = getRelativeCoords(
          boardOrientation,
          boardWidth,
          arrow.endSquare,
        );

        // --- shorten arrow so its tip is roughly centred in the target square
        const squareWidth = boardWidth / 8;
        let ARROW_LENGTH_REDUCER =
          squareWidth / arrowOptions.arrowLengthReducerDenominator;

        const isArrowActive =
          currentlyDrawingArrow &&
          arrow.startSquare === currentlyDrawingArrow.startSquare &&
          arrow.endSquare === currentlyDrawingArrow.endSquare;

        // if multiple arrows end on the same square (but are not the active one),
        // shorten them a bit more so they don’t overlap as badly
        if (
          arrowsToDraw.some(
            (rest) => rest !== arrow && rest.endSquare === arrow.endSquare,
          ) &&
          !isArrowActive
        ) {
          ARROW_LENGTH_REDUCER =
            squareWidth / arrowOptions.sameTargetArrowLengthReducerDenominator;
        }

        // work out the shortened end‑point
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const r = Math.hypot(dx, dy);
        const end = {
          x: from.x + (dx * (r - ARROW_LENGTH_REDUCER)) / r,
          y: from.y + (dy * (r - ARROW_LENGTH_REDUCER)) / r,
        };

        // map the “logical” colour names to actual CSS colours
        const resolveColor = (c: string | undefined) => {
          switch (c) {
            case 'primary':
              return arrowOptions.primaryColor;
            case 'secondary':
              return arrowOptions.secondaryColor;
            case 'tertiary':
              return arrowOptions.tertiaryColor;
            case 'engine':
              return arrowOptions.engineColor;
            default:
              return c ?? arrowOptions.primaryColor;
          }
        };
        const stroke = resolveColor(arrow.color);

        return (
          <Fragment
            key={`${id}-arrow-${arrow.startSquare}-${arrow.endSquare}${
              isArrowActive ? '-active' : ''
            }`}
          >
            <marker
              id={`${id}-arrowhead-${i}-${arrow.startSquare}-${arrow.endSquare}`}
              markerWidth="2"
              markerHeight="2.5"
              refX="1.25"
              refY="1.25"
              orient="auto"
            >
              <polygon points="0.3 0, 2 1.25, 0.3 2.5" fill={stroke} />
            </marker>

            <line
              x1={from.x}
              y1={from.y}
              x2={end.x}
              y2={end.y}
              opacity={
                isArrowActive
                  ? arrowOptions.activeOpacity
                  : arrowOptions.opacity
              }
              stroke={stroke}
              strokeWidth={
                isArrowActive
                  ? arrowOptions.activeArrowWidthMultiplier *
                    (squareWidth / arrowOptions.arrowWidthDenominator)
                  : squareWidth / arrowOptions.arrowWidthDenominator
              }
              markerEnd={`url(#${id}-arrowhead-${i}-${arrow.startSquare}-${arrow.endSquare})`}
            />
          </Fragment>
        );
      })}
    </svg>
  );
}
