import { useContext } from 'react';
import FormContext from '../context/formContext';

const UnsortedMatches = () => {
    const { playingMatches } = useContext(FormContext);

    return (
        <>
            <h2>Live Matches (timeline)</h2>
            {Object.entries(playingMatches).map(match => {
                const [key, value] = match;
                return (
                    <p key={key} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {value.teams[0]} - {value.teams[1]} / {value.score[0]} - {value.score[1]}
                    </p>
                );
            })}
        </>
    );
};

export default UnsortedMatches;
