import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Board } from 'football-score-board';
import { useContext } from 'react';
import FormProvider from '..';
import AddMatchForm from '../../components/AddMatchForm';
import UnsortedMatches from '../../components/UnsortedMatches';
import WithBoard from '../../HOC/WithBoard';
import FormContext from '../formContext';

const setInputs = async (teams: any[]) => {
    const homeInput = screen.getByLabelText(/Home Team/i);
    const awayInput = screen.getByLabelText(/Away Team/i);

    fireEvent.change(homeInput, { target: { value: teams[0] } });
    fireEvent.change(awayInput, { target: { value: teams[1] } });
};

describe('Context Cases', () => {
    test('Render just fine with access to Context', async () => {
        const TestingComponent = () => {
            const { liveScores } = useContext(FormContext);
            return (
                <div test-id='container'>
                    {liveScores.map(score => (
                        <p key={JSON.stringify(score)} data-testid='score'>
                            {score}
                        </p>
                    ))}
                </div>
            );
        };

        expect(() =>
            render(
                <FormProvider board={new Board()}>
                    <TestingComponent />
                </FormProvider>,
            ),
        ).not.toThrowError();
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

    test('Delete playing matches', async () => {
        const BaseComponent = () => (
            <>
                <AddMatchForm />
                <UnsortedMatches />
            </>
        );

        const ComponentWithContext = WithBoard(BaseComponent);
        const { rerender } = render(<ComponentWithContext />);

        const matches = [
            ['FC A', 'FC B'],
            ['FC C', 'FC D'],
        ];

        for await (const match of matches) {
            await setInputs(match);

            const submit = await screen.findByText(/submit/i);
            fireEvent.click(submit);

            const foundMatch = await screen.findByText(
                new RegExp(`${match[0]} - ${match[1]}`, 'i'),
            );
            expect(foundMatch).toBeInTheDocument();
        }

        const listedTeamsX = screen.getAllByText(/fc/i);
        expect(listedTeamsX.length).toBe(2);

        await waitFor(async () => {
            const finishButton = await screen.findAllByText(/finish/i);
            await fireEvent.click(finishButton[0]);
        });

        rerender(<ComponentWithContext />);

        expect(screen.queryByText(/fc a - fc b/i)).not.toBeInTheDocument();
        const listedTeams = screen.getAllByText(/fc/i);
        expect(listedTeams.length).toBe(1);
    });

    test('Increase match score', async () => {
        const BaseComponent = () => (
            <>
                <AddMatchForm />
                <UnsortedMatches />
            </>
        );

        const ComponentWithContext = WithBoard(BaseComponent);
        const { rerender } = render(<ComponentWithContext />);

        await setInputs(['FC A', 'FC B']);

        const submit = await screen.findByText(/submit/i);
        fireEvent.click(submit);

        const defaultScore = await screen.findByText(/0 - 0/);
        expect(defaultScore).toBeInTheDocument();

        await waitFor(async () => {
            const finishButton = await screen.findAllByText('+');
            await fireEvent.click(finishButton[0]);
        });

        rerender(<ComponentWithContext />);

        expect(await screen.findByText(/1 - 0/)).toBeInTheDocument();
    });
});
