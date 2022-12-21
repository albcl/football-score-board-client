import { fireEvent, render, screen } from '@testing-library/react';
import { Board } from 'football-score-board';
import { useContext } from 'react';
import FormProvider, { FormContext } from '..';

const setInputs = (teams: any[]) => {
    const homeInput = screen.getByLabelText('Home Team');
    const awayInput = screen.getByLabelText('Away Team');

    fireEvent.change(homeInput, { target: { value: teams[0] } });
    fireEvent.change(awayInput, { target: { value: teams[1] } });
};

describe('Context Cases', () => {
    test('Render just fine', () => {
        const TestingComponent = () => {
            const { liveScores } = useContext(FormContext);
            return (
                <div>
                    {liveScores.map(score => (
                        <p key={JSON.stringify(score)}>{score}</p>
                    ))}
                </div>
            );
        };

        expect(() => (
            <FormProvider board={new Board()}>
                <TestingComponent />
            </FormProvider>
        )).not.toThrowError();
    });

    const invalidMatches = [['Team 01'], ['Team 01', 1], [0, 1], [], ['Team 01', 'Team 01']];
    test.each(invalidMatches)(
        'Catch and display returned error for data: $teams',
        async (...teams: any[]) => {
            const TestingComponent = () => {
                const { newMatch, error, handleFormChange, handleSubmit } = useContext(FormContext);
                return (
                    <div>
                        <label htmlFor='home'>Home Team</label>
                        <input
                            id='home'
                            name='home'
                            type='text'
                            value={newMatch['home']}
                            onChange={e => handleFormChange(e, 'home')}
                        />
                        <label htmlFor='away'>Away Team</label>
                        <input
                            id='away'
                            name='away'
                            type='text'
                            value={newMatch['away']}
                            onChange={e => handleFormChange(e, 'away')}
                        />
                        <input type='submit' onClick={handleSubmit} value='Submit' />
                        {error && (
                            <p role='alert' id='error-message' style={{ color: 'red' }}>
                                {error}
                            </p>
                        )}
                    </div>
                );
            };

            render(
                <FormProvider board={new Board()}>
                    <TestingComponent />
                </FormProvider>,
            );

            setInputs(teams);
            fireEvent.click(screen.getByText(/submit/i));

            expect(await screen.findByRole('alert')).toBeInTheDocument();
        },
    );
});
