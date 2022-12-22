import { fireEvent, render, screen } from '@testing-library/react';
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

    test('Will delete (finish) a match', async () => {
        const key = 'teamKey';
        const teams = ['Team 01', 'Team 02'];
        const score = [0, 0];

        const mockValue = {
            ...defaultContextValues,
            playingMatches: {
                [key]: { teams: teams, score: score },
            },
        };

        render(
            <FormContext.Provider value={mockValue}>
                <UnsortedMatches />
            </FormContext.Provider>,
        );

        expect(screen.getByText(/Team 01 - Team 02/i)).toBeInTheDocument();
        expect(screen.getByText(/0 - 0/i)).toBeInTheDocument();
        const finishButton = screen.getByText(/finish/i);
        expect(finishButton).toBeInTheDocument();

        fireEvent.click(screen.getByText(/finish/i));

        expect(await screen.findByText(/Team 01 - Team 02/i)).not.toBeInTheDocument();
        expect(await screen.findByText(JSON.stringify(score))).toBeInTheDocument();
    });
});
