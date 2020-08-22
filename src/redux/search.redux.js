const SET_DATA = 'SET_DATA'
const SET_PAGE = 'SET_PAGE'
const SET_SUM = 'SET_SUM'

const initState = {
  sum:'',
  searchData:[],
  searchValue:'',
  searchValueShow: '',
  beginPage: 1,
  pageSize: 10,
  showLoading: false,
  showNoData: false,
  scroll: 0
}

export function searchData(state = initState, action) {
  switch (action.type) {
    case SET_DATA:
      return { ...state, ...action.payload}
    default:
      return state
  }
}


export const setProps = (data) => {
  return { type: SET_DATA, payload: data }
}
