import { fireEvent, render, screen } from '@testing-library/react';
import FormContext, { defaultContextValues } from '../../context/formContext';
import { PlayingMatchesTypes } from '../../context/types';
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

    test('Will use delete handle', async () => {
        const key = 'teamKey';
        const teams = ['Team 01', 'Team 02'];
        const score = [0, 0];

        const mockValue = {
            ...defaultContextValues,
            playingMatches: {
                [key]: { teams: teams, score: score },
            },
            handleDelete: jest.fn(),
        };

        render(
            <FormContext.Provider value={mockValue}>
                <UnsortedMatches />
            </FormContext.Provider>,
        );

        fireEvent.click(screen.getByText(/finish/i));

        expect(mockValue.handleDelete).toHaveBeenCalledTimes(1);
        expect(mockValue.handleDelete).toHaveBeenCalledWith(key);
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
            // handleDelete: jest.fn(),
            handleDelete: (key: string) => {
                mockValue.playingMatches = {} as PlayingMatchesTypes;
            },
        };

        const TestingComponent = () => (
            <FormContext.Provider value={mockValue}>
                <UnsortedMatches />
            </FormContext.Provider>
        );

        const { rerender } = render(<TestingComponent />);

        expect(screen.getByText(/Team 01 - Team 02/i)).toBeInTheDocument();
        expect(screen.getByText(/0 - 0/i)).toBeInTheDocument();
        const finishButton = screen.getByText(/finish/i);
        expect(finishButton).toBeInTheDocument();

        fireEvent.click(finishButton);

        rerender(<TestingComponent />);

        expect(screen.queryByText(/Team 01/i)).toBeNull();
        expect(screen.queryByText(/0 - 0/i)).toBeNull();
    });
});
