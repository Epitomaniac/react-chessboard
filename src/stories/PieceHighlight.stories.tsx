import type { Meta, StoryObj } from '@storybook/react';
import { Chessboard } from '../../src';
import { useState } from 'react';
import type { SquareHandlerArgs } from '../../src/types';

const meta: Meta<typeof Chessboard> = {
  title: 'stories/PieceHighlight',
} satisfies Meta<typeof Chessboard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PieceHighlight: Story = {
  render: () => {
    const [pieceHighlight, setPieceHighlight] = useState({});

    const handleSquareClick = ({ square }: SquareHandlerArgs) => {
      setPieceHighlight({ square });
    };

    const chessboardOptions = {
      pieceHighlight,
      onSquareClick: handleSquareClick,
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
