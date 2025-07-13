import type { SquareDataType, PositionDataType } from './types';
export declare function generateBoard(boardOrientation: 'white' | 'black'): SquareDataType[][];
export declare function rowIndexToChessRow(row: number, boardOrientation: 'white' | 'black'): string;
export declare function columnIndexToChessColumn(column: number, boardOrientation: 'white' | 'black'): string;
export declare function chessColumnToColumnIndex(column: string, boardOrientation: 'white' | 'black'): number;
export declare function chessRowToRowIndex(row: string, boardOrientation: 'white' | 'black'): number;
export declare function fenStringToPositionObject(fen: string): PositionDataType;
/**
 * Return an object with the pieces that have moved from the old position to the new position.
 * The keys are the source square names (e.g. "e2") and the values are the new square positions (e.g. "e4"), indicating that the piece in square "e2" has moved to square "e4".
 */
export declare function getPositionUpdates(oldPosition: PositionDataType, newPosition: PositionDataType, boardOrientation: 'white' | 'black'): {
    [square: string]: string;
};
/**
 * Retrieves the coordinates at the centre of the requested square, relative to the top left of the board (0, 0).
 */
export declare function getRelativeCoords(boardOrientation: 'white' | 'black', boardWidth: number, square: string): {
    x: number;
    y: number;
};
