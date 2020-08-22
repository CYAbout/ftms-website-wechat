
const SET_SCROLL = 'SET_SCROLL'
const CLOSE_MODAL = 'CLOSE_MODAL'

const initState = {
  scrollApp: 0,
  isShowModal: false
}

export function scrollValue(state = initState, action) {
  switch (action.type) {
    case SET_SCROLL:
      return { ...state, scrollApp:action.payload,isShowModal:true}
    case CLOSE_MODAL:
      return { ...state, isShowModal:false}
    default:
      return state
  }
}


export const setScrollApp = (scroll) => {
  let scrollTop = document.scrollingElement.scrollTop ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;
  return { type: SET_SCROLL, payload: scroll ? scroll : scrollTop }
}
export const closeModal = () => {
  return (dispatch, getState) => {
    dispatch({ type: CLOSE_MODAL})
    const {scrollApp,isShowModal} = getState().scrollValue
    // window.scrollTo(0,scrollApp)
    setTimeout(() => window.scrollTo(0,scrollApp),0)
  }
}


