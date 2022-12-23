import { useContext } from 'react';
import FormContext from '../../context/formContext';

/**
 * Form for adding (starting) new matches
 * It makes use of *{handleFormChange, handleSubmit,
 * newMatch}* from *FormContext*
 */
const AddMatchForm = () => {
    const { handleFormChange, handleSubmit, newMatch } = useContext(FormContext);

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ display: 'flex', flexDirection: 'column', margin: '0 1rem' }}>
                <label htmlFor='home'>Home team</label>
                <input
                    id='home'
                    name='home'
                    placeholder='Home team'
                    type='text'
                    value={newMatch['home']}
                    onChange={e => handleFormChange(e, 'home')}
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', margin: '0 1rem' }}>
                <label htmlFor='away'>Away team</label>
                <input
                    id='away'
                    name='away'
                    placeholder='Away team'
                    type='text'
                    value={newMatch['away']}
                    onChange={e => handleFormChange(e, 'away')}
                />
            </div>
            <input type='submit' value='Submit' />
        </form>
    );
};

export default AddMatchForm;
