import type { Meta, StoryObj } from '@storybook/react';
import { Chessboard } from '../../src';
import { useState } from 'react';
import type { Highlight, SquareArrowHandlerArgs } from '../../src/types';

const meta: Meta<typeof Chessboard> = {
  title: 'stories/Promotion',
} satisfies Meta<typeof Chessboard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Promotion: Story = {
  render: () => {
    const [position, setPosition] = useState('8/1P6/5K1k/8/8/8/8/8 w - - 0 1');

    const chessboardOptions = {
      id: 'promotion',
      position,
      promotionDialog: 'modal',
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
