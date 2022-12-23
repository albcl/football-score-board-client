import './App.css';
import { useContext } from 'react';
import FormContext from './context/formContext';
import WithBoard from './HOC/WithBoard';
import SortedMatches from './components/SortedMatches';
import AddMatchForm from './components/AddMatchForm';

function App() {
    const { error, liveScores } = useContext(FormContext);

    return (
        <div className='App'>
            <h1>Football Live Score Board</h1>
            <hr />
            <AddMatchForm />
            {error && (
                <p role='alert' id='error-message' style={{ color: 'red' }}>
                    {error}
                </p>
            )}
            <SortedMatches data={liveScores} />
        </div>
    );
}
export default WithBoard(App);
