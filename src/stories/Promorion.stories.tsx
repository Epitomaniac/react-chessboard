import { useState, useEffect, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Chessboard } from '../../src';
import { Chess } from 'chess.js';
import { PieceDropHandlerArgs } from '../../src';

const meta: Meta<typeof Chessboard> = {
  title: 'stories/Promotion',
} satisfies Meta<typeof Chessboard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Promotion: Story = {
  render: () => {
    const chessGameRef = useRef(new Chess('8/8/1k6/8/8/5K2/2p5/8 b - - 0 1'));
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
      if (!targetSquare) {
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
          promotion: promotionPiece ?? 'q',
        }); // update the position state upon successful move to trigger a re-render of the chessboard
        setChessPosition(chessGame.fen());
        // return true as the move was successful
        return true;
      } catch (error) {}

      return false;
    }

    function handlePromotionPieceSelect(piece: string) {
      setPromotionPiece(piece[1].toLowerCase());
      setPromotionDialog({ type: 'none', promotionSquare: 'none' });
    }

    useEffect(() => {
      if (promotionPiece) {
        makeMove({
          piece: { isSparePiece: false, pieceType: '', position: '' },
          sourceSquare: promotionSource,
          targetSquare: promotionTarget,
        });
        setPromotionSource('');
        setPromotionTarget('');
      }
    }, [promotionPiece]);

    const chessboardOptions = {
      id: 'promotion',
      position: chessPosition,
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
      </div>
    );
  },
};
