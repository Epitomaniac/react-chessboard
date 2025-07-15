// @ts-nocheck
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
    const chessGameRef = useRef(new Chess('8/2P2k2/8/8/3K4/8/8/8 w - - 0 1'));
    const chessGame = chessGameRef.current;

    const [chessPosition, setChessPosition] = useState(chessGame.fen());
    const [promotionDialog, setPromotionDialog] = useState('none');
    const [promotionPiece, setPromotionPiece] = useState<string | undefined>(
      undefined,
    );
    const [promotionSource, setPromotionSource] = useState('');
    const [promotionTarget, setPromotionTarget] = useState('');

    function makeMove({ piece, sourceSquare, targetSquare }) {
      if (!targetSquare) {
        return false;
      }

      console.log(piece?.pieceType, sourceSquare, targetSquare);

      if (
        (piece?.pieceType == 'wP' && targetSquare.includes('8')) ||
        (piece?.pieceType == 'bP' && targetSquare.includes('1'))
      ) {
        setPromotionSource(sourceSquare);
        setPromotionTarget(targetSquare);
        console.log('dialog is set');
        setPromotionDialog('modal');
        return false;
      }

      chessGame.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: promotionPiece ?? 'q',
      });

      // update the position state upon successful move to trigger a re-render of the chessboard
      setChessPosition(chessGame.fen());
      // return true as the move was successful
      return true;
    }

    function handlePromotionPieceSelect(piece: string) {
      setPromotionPiece(piece[1].toLowerCase());
      setPromotionDialog('none');
    }

    useEffect(() => {
      if (promotionPiece) {
        makeMove({
          sourceSquare: promotionSource,
          targetSquare: promotionTarget,
        });
        setPromotionSource(null);
        setPromotionTarget(null);
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
