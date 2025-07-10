import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Chessboard } from '../../src';
import type { Arrow } from '../../src/types';

const meta: Meta<typeof Chessboard> = {
  title: 'stories/Arrows',
} satisfies Meta<typeof Chessboard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to generate random square
const getRandomSquare = () => {
  const files = 'abcdefgh';
  const ranks = '12345678';
  return `${files[Math.floor(Math.random() * 8)]}${ranks[Math.floor(Math.random() * 8)]}`;
};

// Helper function to generate unique squares
const getUniqueSquares = (count: number) => {
  const squares = new Set<string>();
  while (squares.size < count) {
    squares.add(getRandomSquare());
  }
  return Array.from(squares);
};

export const Arrows: Story = {
  render: () => {
    const [arrows, setArrows] = useState<Arrow[]>([]);

    const createExternalArrow = () => {
      setArrows([{ startSquare: 'e2', endSquare: 'e4', color: 'red' }]);
    };

    function handleArrows(arrows: Arrow[]) {
      console.log(arrows);
    }

    // chessboard options
    const chessboardOptions = {
      arrows,
      onArrowsChange: handleArrows,
      id: 'arrows',
    };

    // render
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
        <button onClick={createExternalArrow}> Create external arrow</button>

        <Chessboard options={chessboardOptions} />
      </div>
    );
  },
};
