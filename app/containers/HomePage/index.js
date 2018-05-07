import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import Styled from 'styled-components';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectHomePage from './selectors';
import reducer from './reducer';
import saga from './saga';
import * as homeActions from './actions';

import messages from './messages';

const FormContainer = Styled.div`
  padding-top: 100px;
`;

const TaskInput = Styled.input`
  border: 1px solid black;
  background: white;
`;

const TaskButton = Styled.button`
  border: 1px solid black;
  background: blue;
  padding: 10px;
  color: white;
  cursor: pointer;

  &:hover {
    background: darkblue;
  }
`;

const Tablecontainer = Styled.table`
  margin-top: 50px;
  width: 100%;
`;

export class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      currentTask: '',
      todos: [],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadTodos();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.homeStore.todos !== this.props.homeStore.todos && !nextProps.homeStore.loading) {
      this.setState({
        todos: nextProps.homeStore.todos,
      });
    }
    if (nextProps.homeStore.newTodo !== this.props.homeStore.newTodo && nextProps.homeStore.newTodo.id) {
      this.setState({
        todos: [...this.state.todos, nextProps.homeStore.newTodo],
      });
    }
  }

  handleInputChange(event) {
    const currentTask = event.target.value;
    this.setState({ currentTask });
  }

  handleClick() {
    this.props.actions.addTodo(this.state.currentTask);
    this.setState({ currentTask: '' });
  }

  renderForm() {
    return (
      <FormContainer>
        <label htmlFor="taskInput">
          <FormattedMessage {...messages.header} />
        </label>
        <div className="row">
          <TaskInput
            id="taskInput"
            type="text"
            value={this.state.currentTask}
            onChange={this.handleInputChange}
          />
          <TaskButton onClick={this.handleClick}>
            Add
          </TaskButton>
        </div>
      </FormContainer>
    );
  }

  renderTable() {
    const { todos } = this.state;
    return (
      <Tablecontainer className="table-striped">
        <thead>
          <tr>
            <th>
              <FormattedMessage {...messages.header} />
            </th>
          </tr>
        </thead>
        <tbody>
          {
            todos && todos.map((todo, index) => (
              <tr
                key={`r-${index}`} // eslint-disable-line
              >
                <td>{todo.name}</td>
              </tr>
            ))
          }
        </tbody>
      </Tablecontainer>
    );
  }

  render() {
    return (
      <div className="container">
        {this.renderForm()}
        {this.renderTable()}
      </div>
    );
  }
}

HomePage.propTypes = {
  actions: PropTypes.any.isRequired,
  homeStore: PropTypes.any.isRequired,
};

const mapStateToProps = createStructuredSelector({
  homeStore: makeSelectHomePage(),
});

function mapDispatchToProps(dispatch) {
  const actions = bindActionCreators({ ...homeActions }, dispatch);
  return { actions };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
