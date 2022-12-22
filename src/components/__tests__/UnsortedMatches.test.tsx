import { render, screen } from '@testing-library/react';
import FormContext, { defaultContextValues } from '../../context/formContext';
import UnsortedMatches from '../UnsortedMatches';

describe('UnsortedMatches Cases', () => {
    test('Render just fine', () => {
        render(<UnsortedMatches />);

        expect(screen.getByText(/live matches/i)).toBeInTheDocument();
    });

    test('Will get its data from Context', () => {
        const mockValue = {
            ...defaultContextValues,
            playingMatches: {
                "['Team 01','Team 02']": { teams: ['Team 01', 'Team 02'], score: [0, 0] },
            },
        };

        render(
            <FormContext.Provider value={mockValue}>
                <UnsortedMatches />
            </FormContext.Provider>,
        );

        expect(screen.getByText(/team 01 - team 02/i)).toBeInTheDocument();
        expect(screen.getByText(/0 - 0/i)).toBeInTheDocument();
    });
});
