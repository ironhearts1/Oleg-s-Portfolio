import { createContext, useState } from "react";
import { isBooleanObject } from "util/types";

export const NavContext = createContext({
    navDisplay: false,
    display: () => {},
    displayNone: () => {},
});

//@ts-ignore
export function NavContextProvider(props) {
    const [isNavDisplay, setIsNavDisplay] = useState(true);
    function displayHandler() {
        if (isNavDisplay === false) {
            setIsNavDisplay(true);
        }
    }
    function displayNoneHandler() {
        if (isNavDisplay === true) {
            setIsNavDisplay(false);
        }
    }
    const context = {
        navDisplay: isNavDisplay,
        display: displayHandler,
        displayNone: displayNoneHandler,
    };
    return <NavContext.Provider value={context}>{props.children}</NavContext.Provider>;
}

export default NavContextProvider;
