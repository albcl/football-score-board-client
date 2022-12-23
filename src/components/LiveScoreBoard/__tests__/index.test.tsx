import { fireEvent, render, screen } from '@testing-library/react';
import LiveScoreBoard from '..';

describe('LiveScoreBoard Cases', () => {
    test('Renders just fine', () => {
        expect(() => <LiveScoreBoard />).not.toThrowError();
    });

    test('Catch and display errors', async () => {
        render(<LiveScoreBoard />);

        const homeInput = screen.getByLabelText(/home team/i);
        await fireEvent.change(homeInput, { target: { value: 123 } });
        await fireEvent.click(screen.getByText(/submit/i));

        expect(await screen.findByRole(/alert/)).toBeInTheDocument();
    });
});
