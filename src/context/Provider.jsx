import React from 'react'
import ActionsContexComponent from './ActionsContext/ActionsContextProvider';
import DatasContextComponent from './DatasContext/DatasContextProvider';
import UserAuthContextComponet from './UserAuthContext/UserAuthContext';

export default function Provider({ children }) {
    return (
        <ActionsContexComponent>
            <DatasContextComponent>
                <UserAuthContextComponet>
                    {children}
                </UserAuthContextComponet>
            </DatasContextComponent>
        </ActionsContexComponent>
    )
}
