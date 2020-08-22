import {
  combineReducers
} from 'redux'
import { user } from './redux/user.redux'
import { compare } from './redux/compare.redux'
import { tabsIndex } from './redux/tabs.redux'
import { loadretry } from './redux/loadretry.redux'
import { blurData } from './redux/inputBlur.redux'
import { scrollValue } from './redux/scroll.redux'
import { searchData } from './redux/search.redux'
import { showHeader } from './redux/showHeader.redux'
export default combineReducers({
  user,
  compare,
  tabsIndex, 
  loadretry, 
  blurData, 
  scrollValue, 
  searchData,
  showHeader
})