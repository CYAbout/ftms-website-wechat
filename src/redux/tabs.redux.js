
const SET_TABINDEX_FANS = 'SET_TABINDEX_FANS'
const initState = {
  tabFans: 0,
}

export function tabsIndex(state = initState, action) {
  switch (action.type) {
    case SET_TABINDEX_FANS:
      return { ...state, tabFans:action.payload}
    default:
      return state
  }
}


export const setTabIndexFans = (index) => {
  return { type: SET_TABINDEX_FANS, payload: index }
}



