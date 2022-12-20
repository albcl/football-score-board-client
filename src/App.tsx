import { Board } from 'football-score-board';
import React, { useState } from 'react';
import './App.css';

const board = new Board();
function App() {
    const [newMatch, setNewMatch] = useState<{ [key: string]: string }>({});
    const [liveScores, setLiveScores] = useState<string[]>([]);

    const refreshLiveScores = () => setLiveScores(board.getLiveSummary());

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const match = [newMatch['home'], newMatch['away']];
        board.addMatch(match).then(() => {
            refreshLiveScores();
        });
    };

    return (
        <div className='App'>
            <h1>Football Live Score Board</h1>
            <hr />
            <form>
                <label htmlFor='home'>Home Team</label>
                <input
                    id='home'
                    name='home'
                    type='text'
                    onChange={e => setNewMatch({ ...newMatch, home: e.target.value })}
                />
                <label htmlFor='away'>Away Team</label>
                <input
                    id='away'
                    name='away'
                    type='text'
                    onChange={e => setNewMatch({ ...newMatch, away: e.target.value })}
                />
                <input type='submit' onClick={handleSubmit} value='Submit' />
            </form>
            {liveScores.map((match, ix) => (
                <p key={ix}>{match}</p>
            ))}
        </div>
    );
}
export default App;
