import { render, screen } from '@testing-library/react';
describe('UnsortedMatches Cases', () => {
    test('Render just fine', () => {
        render(<UnsortedMatches />);

        expect(screen.getByText(/live matches/i)).toBeInTheDocument();
    });

});
