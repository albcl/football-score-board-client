import { render, screen } from '@testing-library/react';
import SortedMatches from '../SortedMatches';

describe('SortedMatches Cases', () => {
    test('Render just fine', () => {
        const summary = ['string 01', 'string 02'];
        render(<SortedMatches data={summary} />);

        expect(screen.getByText('Live Sorted Matches')).toBeTruthy();
        summary.forEach(line => {
            expect(screen.getByText(line)).toBeTruthy();
        });
    });
    test('Render just fine with empty array', () => {
        render(<SortedMatches data={[]} />);

        expect(screen.getByText('Live Sorted Matches')).toBeTruthy();
    });
});
