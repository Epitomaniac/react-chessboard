/*!
 * Stockfish.js (http://github.com/nmrugg/stockfish.js)
 * License: GPL
 */
type EngineMessage = {
    /** stockfish engine message in UCI format*/
    uciMessage: string;
    /** found best move for current position in format `e2e4`*/
    bestMove?: string;
    /** found best move for opponent in format `e7e5` */
    ponder?: string;
    /**  material balance's difference in centipawns(IMPORTANT! stockfish gives the cp score in terms of whose turn it is)*/
    positionEvaluation?: string;
    /** count of moves until mate */
    possibleMate?: string;
    /** the best line found */
    pv?: string;
    /** number of halfmoves the engine looks ahead */
    depth?: number;
};
export default class Engine {
    stockfish: Worker;
    onMessage: (callback: (messageData: EngineMessage) => void) => void;
    isReady: boolean;
    constructor();
    private transformSFMessageData;
    init(): void;
    onReady(callback: () => void): void;
    evaluatePosition(fen: string, depth?: number): void;
    stop(): void;
    terminate(): void;
}
export {};
