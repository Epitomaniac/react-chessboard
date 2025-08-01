import { SquareDataType } from './types';
type SquareProps = {
    children?: React.ReactNode;
    hasMovablePiece?: boolean;
    isDialogOpen: boolean;
    squareId: SquareDataType['squareId'];
    isLightSquare: SquareDataType['isLightSquare'];
    isOver: boolean;
};
export declare const Square: import("react").NamedExoticComponent<SquareProps>;
export {};
