import { useState, useEffect } from 'react';

export default function useSaveLayoutOnChange(default_Layout) {

    const originalLayouts = getFromLS("Layout") || default_Layout;

    const [layoutState, setLayoutState] = useState(originalLayouts)

    useEffect(() => {
        saveToLS("Layout", layoutState);
    }, [layoutState]);


    function getFromLS(key) {
        let ls = {};
        if (global.localStorage) {
            try {
                ls = JSON.parse(global.localStorage.getItem("rdv_layout")) || {};
            } catch (e) {
                console.log(e);
            }
        }
        return ls[key];
    }

    function saveToLS(key, value) {
        if (global.localStorage) {
            global.localStorage.setItem(
                "rdv_layout",
                JSON.stringify({
                    [key]: value
                })
            );
        }
    }

    return [layoutState, setLayoutState];
}