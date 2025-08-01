export function defaultBoardStyle(): React.CSSProperties {
  return {
    display: 'grid',
    gridTemplateColumns: `repeat(8, 1fr)`,
    overflow: 'clip',
    overflowClipMargin: '14px',
    width: '100%',
    height: '100%',
    position: 'relative',
  };
}

export const defaultSquareStyle: React.CSSProperties = {
  aspectRatio: '1/1',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
};

export const defaultDarkSquareStyle: React.CSSProperties = {
  backgroundColor: '#B58863',
};

export const defaultLightSquareStyle: React.CSSProperties = {
  backgroundColor: '#F0D9B5',
};

export const defaultDropSquareStyle: React.CSSProperties = {
  boxShadow: 'inset 0px 0px 0px 1px black',
};

export const defaultDarkSquareNotationStyle: React.CSSProperties = {
  color: '#ebe0cfff',
};

export const defaultLightSquareNotationStyle: React.CSSProperties = {
  color: '#a36c3fff',
};

export const defaultAlphaNotationStyle: React.CSSProperties = {
  fontSize: '13px',
  position: 'absolute',
  bottom: 1,
  left: 2,
  userSelect: 'none',
};

export const defaultNumericNotationStyle: React.CSSProperties = {
  fontSize: '13px',
  position: 'absolute',
  top: 2,
  right: 2,
  userSelect: 'none',
};

export const defaultDraggingPieceStyle: React.CSSProperties = {
  transform: 'scale(1.1)',
};

export const defaultDraggingPieceGhostStyle: React.CSSProperties = {
  opacity: 0.5,
};

export const defaultArrowOptions = {
  primaryColor: '#ff0000', // color if no modifiers are held down when drawing an arrow
  secondaryColor: '#2f8335', // color if shift is held down when drawing an arrow
  tertiaryColor: '#0352fc', // color if control is held down when drawing an arrow
  engineColor: '#7500c9ff',
  arrowLengthReducerDenominator: 8, // the lower the denominator, the greater the arrow length reduction (e.g. 8 = 1/8 of a square width removed, 4 = 1/4 of a square width removed)
  sameTargetArrowLengthReducerDenominator: 4, // as above but for arrows targeting the same square (a greater reduction is used to avoid overlaps)
  arrowWidthDenominator: 5, // the lower the denominator, the greater the arrow width (e.g. 5 = 1/5 of a square width, 10 = 1/10 of a square width)
  activeArrowWidthMultiplier: 0.9, // the multiplier for the arrow width when it is being drawn
  opacity: 0.65, // opacity of arrow when not being drawn
  activeOpacity: 0.5, // opacity of arrow when it is being drawn
};

export const defaultHighlightsOptions = {
  primaryColor: '#ff0000', // color if no modifiers are held down when drawing an arrow
  secondaryColor: '#2f8335', // color if shift is held down when drawing an arrow
  tertiaryColor: '#0352fc', // color if control is held down when drawing an arrow
};
