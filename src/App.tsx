import './App.css';
import { useContext } from 'react';
import { FormContext } from './context';
import WithBoard from './HOC/WithBoard';

function App() {
    const { newMatch, error, liveScores, handleFormChange, handleSubmit } = useContext(FormContext);

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
                    value={newMatch['home']}
                    onChange={e => handleFormChange(e, 'home')}
                />
                <label htmlFor='away'>Away Team</label>
                <input
                    id='away'
                    name='away'
                    type='text'
                    value={newMatch['away']}
                    onChange={e => handleFormChange(e, 'away')}
                />
                <input type='submit' onClick={handleSubmit} value='Submit' />
            </form>
            {error && (
                <p role='alert' id='error-message' style={{ color: 'red' }}>
                    {error}
                </p>
            )}
            {liveScores.map((match, ix) => (
                <p key={ix}>{match}</p>
            ))}
        </div>
    );
}
export default WithBoard(App);
