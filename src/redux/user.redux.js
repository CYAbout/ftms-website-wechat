
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const SET_USERINFO = 'SET_USERINFO'
const initState = {
  token: 123,
  name: 'name',
  id: 123
}

export function user(state = initState, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, token:action.payload}
    case LOGOUT:
      return { ...state, token:action.payload}
    case SET_USERINFO:
      return { ...state, ...action.payload}
    default:
      return state
  }
}


export const login = () => {
  return { type: LOGIN, payload: true }
}

export const logout = () => {
  return { type: LOGOUT, payload: false }
}

export const setUserInfo = (data) => {
  return { type: SET_USERINFO, payload: data }
}

export const getUserInfo = () => {
  return (dispatch, getState) => {
    // dispatch(setUserInfo({token:null,name:'zhangsan',id:'32423'}))
    setTimeout(() => {
      dispatch(setUserInfo({token:true,name:'zhangsan',id:'32423',mobile: '13888888888'}))
    }, 500)
  }
}

