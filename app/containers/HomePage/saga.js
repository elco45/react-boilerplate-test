

import request from 'utils/request';
import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_TODOS, ADD_TODOS, DELETE_TODOS } from 'containers/HomePage/constants';
import { todosLoaded, todoLoadingError, addTodoSuccess, addTodoError,
  deleteTodoSuccess, deleteTodoError } from './actions';

const backendUrl = 'http://localhost:3000';

export function* fetchTodos() {
  try {
    const todos = yield call(request, `${backendUrl}/todos`);
    yield put(todosLoaded(todos));
  } catch (err) {
    yield put(todoLoadingError('Page Not Found'));
  }
}

export function* fetchAddTodos(action) {
  try {
    const newTodo = yield call(request, `${backendUrl}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: action.todo }),
    });
    yield put(addTodoSuccess(newTodo));
  } catch (err) {
    yield put(addTodoError('Page Not Found'));
  }
}

export function* fetchDeleteTodos(action) {
  try {
    yield call(request, `${backendUrl}/todos/${action.todoId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const todos = yield call(request, `${backendUrl}/todos`);
    yield put(deleteTodoSuccess(todos));
  } catch (err) {
    yield put(deleteTodoError('Page Not Found'));
  }
}

export default function* rootSaga() {
  yield [
    takeLatest(LOAD_TODOS, fetchTodos),
    takeLatest(ADD_TODOS, fetchAddTodos),
    takeLatest(DELETE_TODOS, fetchDeleteTodos),
  ];
}
