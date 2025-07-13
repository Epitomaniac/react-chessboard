import type { Meta, StoryObj } from '@storybook/react';
import { Chessboard } from '../../src';
import { useState } from 'react';
import type { Highlight, SquareHandlerArgs } from '../../src/types';

const meta: Meta<typeof Chessboard> = {
  title: 'stories/SquareHighlight',
} satisfies Meta<typeof Chessboard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SquareHighlight: Story = {
  render: () => {
    const [highlights, setHighlights] = useState<Highlight[]>([]);

    const handleSquareRightClick = ({ square }: SquareHandlerArgs) => {
      setHighlights([...highlights, { square, color: 'primary' }]);
    };

    const chessboardOptions = {
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
