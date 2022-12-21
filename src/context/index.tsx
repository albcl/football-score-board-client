import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

import { Board } from 'football-score-board';

export const FormContext = createContext({
    error: '',
    liveScores: [''],
    newMatch: { home: '', away: '' },
    handleFormChange: (e: React.ChangeEvent<HTMLInputElement>, key: string) => {},
    handleSubmit: (e: React.FormEvent) => {},
});

type FormProviderTypes = {
    board: Board;
    children: React.ReactNode;
};

type NewMatchTypes = {
    home: string;
    away: string;
};

function FormProvider({ board, children }: FormProviderTypes) {
    const [newMatch, setNewMatch] = useState<NewMatchTypes>({ home: '', away: '' });
    const [liveScores, setLiveScores] = useState<string[]>([]);
    const [error, setError] = useState<string>('');

    const refreshLiveScores = () => setLiveScores(board.getLiveSummary());

    const provider = {
        error,
        liveScores,
        newMatch,
        handleFormChange: (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
            setNewMatch({ ...newMatch, [key]: e.target.value });
        },
        handleSubmit: (e: React.FormEvent) => {
            e.preventDefault();
            // setPlayingMatches({ ...newMatch });
            if (error) setError('');
            const match = [newMatch['home'], newMatch['away']];
            board
                .addMatch(match)
                .then(() => {
                    refreshLiveScores();
                })
                .catch(error => setError(error.message));
        },
    };

    return <FormContext.Provider value={provider}>{children}</FormContext.Provider>;
}

FormProvider.propTypes = {
    children: PropTypes.node,
};

export default FormProvider;
