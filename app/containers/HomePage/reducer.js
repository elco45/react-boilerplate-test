import { fromJS } from 'immutable';
import * as Actions from './constants';

const initialState = fromJS({
  loading: false,
  todoError: '',
  todos: [],
  newTodo: {},
  addTodoLoading: false,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.LOAD_TODOS_ERROR:
      return state
      .set('todoError', action.error)
      .set('loading', false);
    case Actions.LOAD_TODOS:
      return state.set('loading', true);
    case Actions.LOAD_TODOS_SUCCESS:
      return state
      .set('todos', action.todos)
      .set('loading', false);

    case Actions.ADD_TODOS_ERROR:
      return state
      .set('todoError', action.error)
      .set('addTodoLoading', false);
    case Actions.ADD_TODOS:
      return state.set('addTodoLoading', true);
    case Actions.ADD_TODOS_SUCCESS:
      return state
      .set('newTodo', action.newTodo)
      .set('addTodoLoading', false);

    default:
      return state;
  }
}

export default homeReducer;
