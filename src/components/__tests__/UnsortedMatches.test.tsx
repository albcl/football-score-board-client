import { render, screen } from '@testing-library/react';
import { useContext } from 'react';
import { FormContext } from '../context';
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

        const TestingComponent = () => {
            const { playingMatches } = useContext(FormContext);
            return (
                <ul>
                    {Object.entries(playingMatches).map(([key, value]) => {
                        return (
                            <p key={key}>
                                {key} - {value.teams.join(' ')} - {value.score.join(' ')}
                            </p>
                        );
                    })}
                </ul>
            );
        };

        render(
            <FormContext.Provider value={mockValue}>
                <TestingComponent />
            </FormContext.Provider>,
        );

        expect(screen.getByText(/team 01 team 02/i)).toBeInTheDocument();
        expect(screen.getByText(/0 0/i)).toBeInTheDocument();
    });
});
