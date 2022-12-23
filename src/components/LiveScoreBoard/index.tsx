import React, { useContext } from 'react';

import SortedMatches from '../SortedMatches';

import ActiveMatchesList from '../UnsortedMatches';
import AddMatchForm from '../AddMatchForm';
import FormContext from '../../context/formContext';
import WithBoard from '../../HOC/WithBoard';

/**
 * Main scores boarc where it connects transparently to the
 * FormContext provider and Board() from `football-score-board`
 * It makes use of *{liveScores, error}* from *FormContext*
 */
const LiveScoreBoard = () => {
    const { liveScores, error } = useContext(FormContext);

    return (
        <React.Fragment>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                <AddMatchForm />

                {error && (
                    <p role='alert' id='error-message' style={{ color: 'red' }}>
                        {error}
                    </p>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
                    <div style={{ margin: '0 2rem' }}>
                        <ActiveMatchesList />
                    </div>
                    <div style={{ margin: '0 2rem' }}>
                        <SortedMatches data={liveScores} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default WithBoard(LiveScoreBoard);
