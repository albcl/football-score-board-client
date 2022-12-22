import { useContext } from 'react';
import FormContext from '../context/formContext';

const UnsortedMatches = () => {
    const { playingMatches, handleDelete } = useContext(FormContext);

    return (
        <>
            <h2>Live Matches (timeline)</h2>
            {Object.entries(playingMatches).map(match => {
                const [key, value] = match;
                return (
                    <p key={key} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {value.teams[0]} - {value.teams[1]} / {value.score[0]} - {value.score[1]}
                        <input
                            style={{ margin: '0 .25rem' }}
                            type='button'
                            value='+'
                            onClick={() => handleScore(match)}
                        />
                        <input
                            style={{ margin: '0 .25rem' }}
                            type='button'
                            value='finish game'
                            onClick={() => handleDelete(key)}
                        />
                    </p>
                );
            })}
        </>
    );
};

export default UnsortedMatches;
