import React, { useState } from 'react';
import FormContext from './formContext';
import { FormProviderTypes, MatchTypes, NewMatchTypes, PlayingMatchesTypes } from './types';

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
        handleScore: (match: [string, MatchTypes], team: number) => {
            const [key, value] = match;

            const { teams, score } = value;
            const newScore = team < 1 ? [score[0] + 1, score[1]] : [score[0], score[1] + 1];
            board
                .updateScore(teams, newScore)
                .then(() => {
                    refreshLiveScores();
                    addPlayingMatch(key, teams, newScore);
                })
                .catch((error: { [key: string]: string }) => setError(error.message));
        },
    };

    return <FormContext.Provider value={provider}>{children}</FormContext.Provider>;
}

export default FormProvider;
