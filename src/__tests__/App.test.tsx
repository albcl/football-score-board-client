import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Cases', () => {
    test('Renders just fine', () => {
        expect(() => <App />).not.toThrowError();
    });
    test('Renders just fine and find elements', () => {
        render(<App />);
        const h1 = screen.getByText(/live score board/i);
        expect(h1).toBeInTheDocument();
    });
});
