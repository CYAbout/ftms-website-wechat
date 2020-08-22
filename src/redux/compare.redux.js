
const ADD = 'ADD'
const PREADD = 'PREADD'
const DEL = 'DEL'
const DELALL = 'DELALL'
const GETALL = 'GETALL'
const initState = {
  compareList: []
}

export function compare(state = initState, action) {
  switch (action.type) {
    case ADD:
      if(action.param)
        state.compareList.push(action.param);
      return state;
    case PREADD:
      if(action.param)
        state.compareList.unshift(action.param);
      return state;
    case DEL:
      if(action.param)
        state.compareList.splice(action.param,1);
      return state
    case DELALL:
      state.compareList = [];
      return state
    case GETALL:
      return state
    default:
      return state
  }
}

export const add = (data) => {
  return { type: ADD, param: data}
}
export const preAdd = (data) => {
  return { type: PREADD, param: data}
}
export const del = (data) => {
  return { type: DEL, param: data}
}
export const delAll = () => {
  return { type: DELALL}
}
export const getAll = () => {
  return (dispatch, getState) => {
      return getState()['compare']
  }
}


