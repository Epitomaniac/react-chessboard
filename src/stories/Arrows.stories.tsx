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
    const [arrows, setArrows] = useState([
      { startSquare: 'e2', endSquare: 'e4', color: '#ff0000' },
      { startSquare: 'g1', endSquare: 'f3', color: '#2f8335' },
      { startSquare: 'c1', endSquare: 'g5', color: '#fcba03' },
    ]);

    const generateRandomArrows = () => {
      // Get 6 unique squares (3 pairs of start/end squares)
      const uniqueSquares = getUniqueSquares(6);
      const colors = ['#ff0000', '#2f8335', '#fcba03'];

      const newArrows = Array.from({ length: 3 }, (_, index) => ({
        startSquare: uniqueSquares[index * 2],
        endSquare: uniqueSquares[index * 2 + 1],
        color: colors[index],
      }));

      setArrows(newArrows);
    };

    function handleArrows(arrow: Arrow[]) {
      //console.log(arrow);
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
        <button onClick={generateRandomArrows}>Generate Random Arrows</button>

        <Chessboard options={chessboardOptions} />

        <p style={{ fontSize: '0.8rem', color: '#666' }}>
          Click the button to generate 3 random arrows on the board.
        </p>
      </div>
    );
  },
};
