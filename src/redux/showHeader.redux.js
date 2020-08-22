
const SHOW_HEADER = 'SHOW_HEADER'
const SHOW_FOOTER_SHARE = 'SHOW_FOOTER_SHARE'
const initState = {
  isShow: false,
  isShowFooterShare: false
}

export function showHeader(state = initState, action) {
  switch (action.type) {
    case SHOW_HEADER:
      return { ...state, isShow:action.payload}
    case SHOW_FOOTER_SHARE:
      return { ...state, isShowFooterShare:action.payload}
    default:
      return state
  }
}


export const setShowHeader = (flag) => {
  return { type: SHOW_HEADER, payload: flag }
}
export const setShowFooterShare = (flag) => {
  return { type: SHOW_FOOTER_SHARE, payload: flag }
}


