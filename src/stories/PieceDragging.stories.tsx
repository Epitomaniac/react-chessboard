import type { Meta, StoryObj } from '@storybook/react';
import { Chessboard } from '../../src';

const meta: Meta<typeof Chessboard> = {
  title: 'stories/PieceDragging',
} satisfies Meta<typeof Chessboard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PieceDragging: Story = {
  render: () => {
    const chessboardOptions = {
      id: 'dragging-piece',
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
