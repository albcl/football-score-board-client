import { fireEvent, render, screen } from '@testing-library/react';
import WithBoard from '../../../HOC/WithBoard';
import AddMatchForm from '..';

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

        const submitButton = screen.getByText(/submit/i);
        expect(submitButton).toBeInTheDocument();

        // mock console
        const consoleError = jest.spyOn(global.console, 'error').mockImplementation(() => {});

        fireEvent.click(submitButton);
        expect(consoleError).toHaveBeenCalledTimes(1);

        // restore console
        consoleError.mockRestore();
    });
});
