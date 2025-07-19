import type { Meta, StoryObj } from '@storybook/react';
import { Chessboard } from '../../src';
import { useState } from 'react';
import type { Highlight, SquareArrowHandlerArgs } from '../../src/types';

const meta: Meta<typeof Chessboard> = {
  title: 'stories/SquareHighlight',
} satisfies Meta<typeof Chessboard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SquareHighlight: Story = {
  render: () => {
    const [highlights, setHighlights] = useState<Highlight[]>([]);

    const handleSquareRightClick = ({
      square,
      isDrawingArrow,
    }: SquareArrowHandlerArgs) => {
      if (!isDrawingArrow) {
        setHighlights([...highlights, { square, color: 'primary' }]);
      }
    };

    const chessboardOptions = {
      sideToMove: 'both',
      highlights,
      onSquareRightClick: handleSquareRightClick,
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
