import * as ActionContents from './constants';

export function loadTodos() {
  return {
    type: ActionContents.LOAD_TODOS,
  };
}

export function todosLoaded(todos) {
  return {
    type: ActionContents.LOAD_TODOS_SUCCESS,
    todos,
  };
}

export function todoLoadingError(error) {
  return {
    type: ActionContents.LOAD_TODOS_ERROR,
    error,
  };
}

export function addTodo(todo) {
  return {
    type: ActionContents.ADD_TODOS,
    todo,
  };
}

export function addTodoSuccess(newTodo) {
  return {
    type: ActionContents.ADD_TODOS_SUCCESS,
    newTodo,
  };
}

export function addTodoError() {
  return {
    type: ActionContents.ADD_TODOS_ERROR,
  };
}
