import type { Meta, StoryObj } from '@storybook/react';
import { Chess } from 'chess.js';
import { useRef, useState, useEffect } from 'react';
import { Chessboard, PieceDropHandlerArgs } from '../../src';
import type { Arrow } from '../types';

const meta: Meta<typeof Chessboard> = {
  title: 'stories/AnalysisBoard',
} satisfies Meta<typeof Chessboard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AnalysisBoard: Story = {
  render: () => {
    // create a chess game using a ref to always have access to the latest game state within closures and maintain the game state across renders
    const chessGameRef = useRef(new Chess());
    const chessGame = chessGameRef.current;

    // track the current position of the chess game in state to trigger a re-render of the chessboard
    const [chessPosition, setChessPosition] = useState(chessGame.fen());
    const [arrow, setArrow] = useState<Arrow[]>([
      {
        startSquare: 'e2',
        endSquare: 'e4',
        color: 'engine',
      },
    ]);

    // handle piece drop
    function onPieceDrop({ sourceSquare, targetSquare }: PieceDropHandlerArgs) {
      // type narrow targetSquare potentially being null (e.g. if dropped off board)
      if (!targetSquare) {
        return false;
      }

      // try to make the move
      try {
        chessGame.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: 'q', // always promote to a queen for example simplicity
        });

        // update the game state
        setChessPosition(chessGame.fen());

        // if the game is over, return false
        if (chessGame.isGameOver() || chessGame.isDraw()) {
          return false;
        }

        // return true as the move was successful
        return true;
      } catch {
        // return false as the move was not successful
        return false;
      }
    }

    useEffect(() => {
      const moves = ['e2e4', 'd2d4'];
      let prevMove = '';
      function simulateEngine() {
        const interval = setInterval(() => {
          const bestMove = moves[Math.floor(Math.random() * moves.length)];
          if (bestMove !== prevMove) {
            setArrow([
              {
                startSquare: bestMove.slice(0, 2),
                endSquare: bestMove.slice(2, 4),
                color: 'engine',
              },
            ]);
            console.log('New best move:', bestMove);
            prevMove = bestMove;
          }
        }, 2000);

        return () => clearInterval(interval);
      }
      simulateEngine();
    }, []);

    // set the chessboard options, using arrows to show the best move
    const chessboardOptions = {
      arrows: arrow,
      position: chessPosition,
      onPieceDrop,
    };

    // render the chessboard
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center',
          width: '50%',
        }}
      >
        <Chessboard options={chessboardOptions} />
      </div>
    );
  },
};
