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
    const [primaryColor, setPrimaryColor] = useState<string>('#ff0000');

    const createExternalArrow = () => {
      setArrows([{ startSquare: 'e2', endSquare: 'e4', color: 'primary' }]);
    };

    function handleArrows(arrows: Arrow[]) {
      console.log(arrows);
    }

    function changePrimaryColor() {
      setPrimaryColor('purple');
    }

    // chessboard options
    const chessboardOptions = {
      arrows,
      arrowOptions: {
        primaryColor: primaryColor,
        secondaryColor: '#2f8335',
        tertiaryColor: '#fcba03',
        arrowLengthReducerDenominator: 8,
        sameTargetArrowLengthReducerDenominator: 4,
        arrowWidthDenominator: 5,
        activeArrowWidthMultiplier: 0.9,
        opacity: 0.65,
        activeOpacity: 0.5,
      },
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
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={createExternalArrow}>Create external arrow</button>
          <button onClick={changePrimaryColor}>Change arrow color</button>
        </div>

        <Chessboard options={chessboardOptions} />
      </div>
    );
  },
};
