import { Board } from './Board';
import {
  ChessboardOptions,
  ChessboardProvider,
  useChessboardContext,
} from './ChessboardProvider';
import { useMemo } from 'react';

type ChessboardProps = {
  options?: ChessboardOptions;
};

export function Chessboard({ options }: ChessboardProps) {
  const { isWrapped } = useChessboardContext() ?? { isWrapped: false };

  // ensure arrowOptions is a fresh object if provided
  const stableOptions = useMemo(() => {
    if (!options) return undefined;

    return {
      ...options,
      arrowOptions: options.arrowOptions
        ? { ...options.arrowOptions }
        : undefined,
    };
  }, [options]);

  if (isWrapped) {
    return <Board />;
  }

  return (
    <ChessboardProvider options={stableOptions}>
      <Board />
    </ChessboardProvider>
  );
}
