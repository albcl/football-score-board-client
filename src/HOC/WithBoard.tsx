import React from 'react';
import { Board } from 'football-score-board';
import FormProvider from '../context';

type WithBoardTypes = {
    board: Board;
};

/**
 * High Order Component to wrap your component with FormProvider and initialize a new Board()
 */
function WithBoard(WrappedComponent: React.ComponentType<any | string>) {
    return class Component extends React.Component<{}, WithBoardTypes> {
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
