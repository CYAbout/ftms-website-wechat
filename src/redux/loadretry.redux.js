
const RETRY = 'RETRY'
const initState = {
  retryCount: 0,
}

export function loadretry(state = initState, action) {
  switch (action.type) {
    case RETRY:
      return { ...state, retryCount:action.payload}
    default:
      return state
  }
}


export const toRetry = (index) => {
  return { type: RETRY, payload: index }
}



