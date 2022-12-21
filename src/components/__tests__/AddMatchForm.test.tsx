import { fireEvent, render, screen } from '@testing-library/react';
import WithBoard from '../../HOC/WithBoard';
import AddMatchForm from '../AddMatchForm';

describe('AddMatchForm Cases', () => {
    test('Render just fine', () => {
        const TestingComponentWithProvider = WithBoard(AddMatchForm);
        render(<TestingComponentWithProvider />);

        expect(screen.getByLabelText(/Home Team/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Away Team/i)).toBeInTheDocument();
        expect(screen.getByText(/submit/i)).toBeInTheDocument();
    });

    test("Fails: Can't access Context", () => {
        render(<AddMatchForm />);

        const test = screen.getByText(/submit/i);
        expect(test).toBeInTheDocument();

        // mock console
        const consoleError = jest.spyOn(global.console, 'error').mockImplementation(() => {});

        fireEvent.click(test);
        expect(consoleError).toHaveBeenCalledTimes(1);

        // restore console
        consoleError.mockRestore();
    });
});
