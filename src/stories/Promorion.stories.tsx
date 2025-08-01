import { useState, useEffect, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Chessboard } from '../../src';
import { Chess } from 'chess.js';
import { PieceDropHandlerArgs } from '../../src';
import type { Arrow } from '../types';

const meta: Meta<typeof Chessboard> = {
  title: 'stories/Promotion',
} satisfies Meta<typeof Chessboard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Promotion: Story = {
  render: () => {
    const chessGameRef = useRef(
      new Chess('rn1qkb1r/pP2pppp/4bn2/8/8/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1'),
    );
    const chessGame = chessGameRef.current;

    const [chessPosition, setChessPosition] = useState(chessGame.fen());
    const [promotionDialog, setPromotionDialog] = useState({
      type: 'none',
      promotionSquare: 'none',
    });
    const [promotionPiece, setPromotionPiece] = useState<string | undefined>(
      undefined,
    );
    const [promotionSource, setPromotionSource] = useState('');
    const [promotionTarget, setPromotionTarget] = useState('');

    function makeMove({
      piece,
      sourceSquare,
      targetSquare,
    }: PieceDropHandlerArgs) {
      if (!targetSquare || !piece?.pieceType.includes(chessGame.turn())) {
        return false;
      }

      if (
        (piece?.pieceType == 'wP' && targetSquare.includes('8')) ||
        (piece?.pieceType == 'bP' && targetSquare.includes('1'))
      ) {
        setPromotionSource(sourceSquare);
        setPromotionTarget(targetSquare);
        setPromotionDialog({ type: 'vertical', promotionSquare: targetSquare });
        return false;
      }

      try {
        chessGame.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: promotionPiece?.[1].toLowerCase() ?? 'q',
        }); // update the position state upon successful move to trigger a re-render of the chessboard
        setChessPosition(chessGame.fen());
        // return true as the move was successful
        return true;
      } catch (error) {}

      return false;
    }

    function handlePromotionPieceSelect(piece: string) {
      setPromotionPiece(piece);
      setPromotionDialog({ type: 'none', promotionSquare: 'none' });
    }

    useEffect(() => {
      if (promotionPiece) {
        makeMove({
          piece: {
            isSparePiece: false,
            pieceType: promotionPiece,
            position: '',
          },
          sourceSquare: promotionSource,
          targetSquare: promotionTarget,
        });
        setPromotionSource('');
        setPromotionTarget('');
        setPromotionPiece(undefined);
      }
    }, [promotionPiece]);

    function onArrowsChange(arrows: Arrow[]) {
      console.log(arrows);
    }

    function undo() {
      chessGame.undo();
      setChessPosition(chessGame.fen());
    }

    const chessboardOptions = {
      positionFen: chessPosition,
      onArrowsChange,
      onPieceDrop: makeMove,
      onPromotionPieceSelect: handlePromotionPieceSelect,
      promotionDialog,
    };

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
        <div style={{ display: 'flex', gap: '50px' }}>
          <button onClick={undo}>Undo</button>
        </div>
      </div>
    );
  },
};
