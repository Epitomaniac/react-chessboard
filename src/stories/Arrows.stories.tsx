import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Chessboard } from '../../src';
import type { Arrow } from '../../src/types';

const meta: Meta<typeof Chessboard> = {
  title: 'stories/Arrows',
} satisfies Meta<typeof Chessboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Arrows: Story = {
  render: () => {
    const [arrows, setArrows] = useState<Arrow[]>([]);
    const [positionFen, setPositionFen] = useState<string>(
      'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    );

    function changePrimaryColor() {
      setPositionFen(
        'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1',
      );
    }

    // chessboard options
    const chessboardOptions = {
      position: positionFen,
      arrows,
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
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={changePrimaryColor}>Change position</button>
        </div>

        <Chessboard options={chessboardOptions} />
        <p>*</p>
        <p>*</p>
        <p>*</p>
      </div>
    );
  },
};
