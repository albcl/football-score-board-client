import React from 'react';
import { Board } from 'football-score-board';
import FormProvider from '../context';

interface AwaysCoolStateProps {
    board: Board;
}

function WithBoard(WrappedComponent: React.ComponentType<any | string>) {
    return class Component extends React.Component<{}, AwaysCoolStateProps> {
        render() {
            return (
                <FormProvider board={new Board()}>
                    <WrappedComponent />
                </FormProvider>
            );
        }
    };
}

export default WithBoard;
