import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import authReducer, { moduleName as authModule } from '../ducks/auth'
import errorReducer, { moduleName as errorModule } from '../ducks/error'
import usersReducer, { moduleName as usersModule } from '../ducks/users'
import { userFormPlugin } from '../ducks/users'

export default combineReducers({
  [authModule]: authReducer,
  [errorModule]: errorReducer,
  form: formReducer.plugin(userFormPlugin),
  [usersModule]: usersReducer
})
