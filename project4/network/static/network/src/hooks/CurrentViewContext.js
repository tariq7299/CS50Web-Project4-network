import React, { createContext, useReducer } from 'react';
import { useContext } from 'react';


const initialCurrView = {
    view: "forYou",
    profileUserName: "",

}

export const CurrentViewContext = createContext(initialCurrView);

export function CurrentViewProvider({ children }) {



    function CurrentViewReducer(currentView, action) {
        switch (action.type) {
            case 'change_view': {
                return { ...currentView, view: action?.payload?.view, profileUserName: action?.payload?.profileUserName || '' }
            }
            default: {
                throw Error('Unknown action: ' + action.type);
            }
        }
    }

    const [currentView, dispatchCurrentView] = useReducer(
        CurrentViewReducer, initialCurrView);

    function handleSetCurrView(view, profileUserName) {

        if (view === "profile") {
            dispatchCurrentView({
                type: "change_view",
                payload: { view, profileUserName }
            })

        } else {
            dispatchCurrentView({
                type: "change_view",
                payload: { view, profileUserName }
            })

        }
    }

    const contextValue = {
        currentView,
        dispatchCurrentView,
        handleSetCurrView
    }

    return (
        <CurrentViewContext.Provider value={contextValue}>
            {children}
        </CurrentViewContext.Provider>
    );

}


export const useCurrentView = () => {
    return useContext(CurrentViewContext);
};