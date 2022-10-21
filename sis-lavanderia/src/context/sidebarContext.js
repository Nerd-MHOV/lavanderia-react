import { createContext, useReducer } from "react"
import SidebarReducer from "./sidebarReducer"

const INITIAL_STATE = {
    activeSidebar: false
}

export const SidebarContext = createContext(INITIAL_STATE)
export const SidebarContextProvider = ({children}) => {
    const[state, dispatch] = useReducer(SidebarReducer, INITIAL_STATE)

    return(
        <SidebarContext.Provider value={{ activeSidebar: state.activeSidebar, dispatch }}>
            { children }
        </SidebarContext.Provider>
    )
}