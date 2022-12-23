import { useContext } from 'react';
import FormContext from '../../context/formContext';
import Button from '../styledComponents/Button';

/**
 * List of matches (games) displayed by their added (started) time
 * It makes use of *{playingMatches, handleDelete, handleScore}* from *FormContext*
 */
const ActiveMatchesList = () => {
    const { playingMatches, handleDelete, handleScore } = useContext(FormContext);

    return (
        <>
            <h2>Live Matches (timeline)</h2>
            {Object.entries(playingMatches).map(match => {
                const [key, value] = match;
                return (
                    <p key={key} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {value.teams[0]} - {value.teams[1]}
                        <Button value='+' onClick={() => handleScore(match, 0)} />
                        {value.score[0]} - {value.score[1]}
                        <Button value='+' onClick={() => handleScore(match, 1)} />
                        <Button value='finish game' onClick={() => handleDelete(key)} />
                    </p>
                );
            })}
        </>
    );
};

export default ActiveMatchesList;
