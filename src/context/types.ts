import { Board } from 'football-score-board';

export type FormProviderTypes = {
    board: Board;
    children: React.ReactNode;
};

export type NewMatchTypes = {
    home: string;
    away: string;
};

export type MatchTypes = {
    teams: string[];
    score: number[];
};

export type PlayingMatchesTypes = {
    [key: string]: MatchTypes;
};
