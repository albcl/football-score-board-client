import React, { useState } from 'react';
import FormContext from './formContext';
import { FormProviderTypes, NewMatchTypes, PlayingMatchesTypes } from './types';

function FormProvider({ board, children }: FormProviderTypes) {
    const [newMatch, setNewMatch] = useState<NewMatchTypes>({ home: '', away: '' });
    const [playingMatches, setPlayingMatches] = useState<PlayingMatchesTypes>({});
    const [liveScores, setLiveScores] = useState<string[]>([]);
    const [error, setError] = useState<string>('');

    const refreshLiveScores = () => setLiveScores(board.getLiveSummary());
    const addPlayingMatch = (key: string, teams: string[], score = [0, 0]) =>
        setPlayingMatches({ ...playingMatches, [key]: { teams: teams, score: score } });

    const provider = {
        error,
        liveScores,
        newMatch,
        playingMatches,
        handleFormChange: (e: React.ChangeEvent<HTMLInputElement>, key: string) =>
            setNewMatch({ ...newMatch, [key]: e.target.value }),
        handleSubmit: (e: React.FormEvent) => {
            e.preventDefault();
            if (error) setError('');
            const match = [newMatch['home'], newMatch['away']];

            board
                .addMatch(match)
                .then(() => {
                    refreshLiveScores();
                    addPlayingMatch(JSON.stringify(match), match);
                })
                .catch((error: { [key: string]: string }) => setError(error.message));
        },
        handleDelete: (matchKey: string) => {
            console.log(matchKey);
            const match = playingMatches[matchKey].teams;

            board
                .finishMatch(match)
                .then(() => {
                    refreshLiveScores();

                    const { [matchKey]: remove, ...newMatches } = playingMatches;
                    setPlayingMatches(newMatches);
                })
                .catch((error: { [key: string]: string }) => setError(error.message));
        },
        handleScore: (match: [string, MatchTypes]) => {
            const [key, value] = match;
        },
    };

    return <FormContext.Provider value={provider}>{children}</FormContext.Provider>;
}

export default FormProvider;
