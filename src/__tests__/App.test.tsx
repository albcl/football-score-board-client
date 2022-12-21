import { fireEvent, render, screen } from '@testing-library/react';
import App from '../App';

const setInputs = (teams: any[]) => {
    const homeInput = screen.getByLabelText('Home Team');
    const awayInput = screen.getByLabelText('Away Team');

    fireEvent.change(homeInput, { target: { value: teams[0] } });
    fireEvent.change(awayInput, { target: { value: teams[1] } });
};

describe('App Cases', () => {
    test('Renders just fine', () => {
        expect(() => <App />).not.toThrowError();
    });

    test('Renders just fine and find elements', () => {
        render(<App />);
        const h1 = screen.getByText(/live score board/i);
        expect(h1).toBeInTheDocument();
    });

    test('Receive and display matches', async () => {
        render(<App />);

        setInputs(['team 01', 'team 02']);
        fireEvent.click(screen.getByText(/submit/i));

        expect(await screen.findByText(/team 01 0/)).toBeInTheDocument();
        expect(await screen.findByText(/team 02 0/)).toBeInTheDocument();
    });
});
