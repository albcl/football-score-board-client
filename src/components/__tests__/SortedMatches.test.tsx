import { render, screen } from '@testing-library/react';
import WithBoard from '../../HOC/WithBoard';

const SortedMatches = () => <h2>Live Sorted Matches</h2>;
const ComponentWithContext = WithBoard(SortedMatches);

describe('SortedMatches Cases', () => {
    test('Render just fine', () => {
        render(<ComponentWithContext />);

        expect(screen.getByText('Live Sorted Matches')).toBeTruthy();
    });
});
