import type { Meta, StoryObj } from '@storybook/react';
import { Chessboard } from '../../src';

const meta: Meta<typeof Chessboard> = {
  title: 'stories/SquareHighlight',
} satisfies Meta<typeof Chessboard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SquareHighlight: Story = {
  render: () => {
    const chessboardOptions = {
      id: 'analysis-board',
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
