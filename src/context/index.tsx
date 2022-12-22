import React, { useState } from 'react';
import FormContext from './formContext';
import { FormProviderTypes, NewMatchTypes, PlayingMatchesTypes } from './types';

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
            if (error) setError('');
            const match = [newMatch['home'], newMatch['away']];

            board
                .addMatch(match)
                .then(() => {
                    refreshLiveScores();
                })
                .catch((error: { [key: string]: string }) => setError(error.message));
        },
    };

    return <FormContext.Provider value={provider}>{children}</FormContext.Provider>;
}

export default FormProvider;
