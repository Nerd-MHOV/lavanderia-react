const SidebarReducer = (state, action) => {
    switch(action.type){
        case "OPEN":{
            return {
                activeSidebar: false,
            }
        }
        case "CLOSE": {
            return {
                activeSidebar: true,
            }
        }
        case "TOGGLE": {
            return {
                activeSidebar: !state.activeSidebar,
            }
        }
        default:
            return state
    }
}

export default SidebarReducer;