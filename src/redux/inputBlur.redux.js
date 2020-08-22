
// const IS_BLUR = 'IS_BLUR'
// const IS_FOCUS = 'IS_FOCUS'
const CHANGE_BLUR = 'CHANGE_BLUR'
const initState = {
  isBF: 0,
}

export function blurData(state = initState, action) {
  switch (action.type) {
    case CHANGE_BLUR:
      return { ...state, isBF:action.payload}
    default:
      return state
  }
}


export const isBlur = (index) => {
  if(index == 0) {
    let st= document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    window.scrollTo(0,st);
    return dispatch => {
      setTimeout(() => {
        dispatch({ type: CHANGE_BLUR, payload: index })
      },100)
    }
  }else {
    return { type: CHANGE_BLUR, payload: index }
  }

}
// export const isFocus = (index) => {
//   return { type: IS_FOCUS, payload: true }
// }



