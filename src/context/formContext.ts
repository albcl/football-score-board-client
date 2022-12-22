import { createContext } from 'react';
import { PlayingMatchesTypes } from './types';

export const defaultContextValues = {
    error: '',
    liveScores: [''],
    newMatch: { home: '', away: '' },
    playingMatches: {} as PlayingMatchesTypes,
    handleFormChange: (e: React.ChangeEvent<HTMLInputElement>, key: string) => {},
    handleSubmit: (e: React.FormEvent) => {},
};

const FormContext = createContext(defaultContextValues);

export default FormContext;
