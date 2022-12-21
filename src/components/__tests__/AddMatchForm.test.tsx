import { render, screen } from '@testing-library/react';
import { Board } from 'football-score-board';
import { useContext } from 'react';
import FormProvider, { FormContext } from '../../context';

describe('AddMatchForm Cases', () => {
    test('Render just fine', () => {
        render(<AddMatchForm />);

        expect(screen.getByLabelText(/Home Team/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Away Team/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/submit/i)).toBeInTheDocument();
    });

    test('Can read/write in Context', () => {
        const TestingComponent = () => {
            const { newMatch } = useContext(FormContext);
            return null;
        };

        expect(() => (
            <FormProvider board={new Board()}>
                <TestingComponent />
            </FormProvider>
        )).not.toThrowError();
    });
});
