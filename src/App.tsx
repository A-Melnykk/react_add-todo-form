import React, { useState, useEffect } from 'react';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoList } from './components/TodoList/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  useEffect(() => {
    setUsers(usersFromServer);
    setTodos(todosFromServer);
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isTitleInvalid = title.trim() === '';
    const isUserInvalid = userId === 0;

    setTitleError(isTitleInvalid);
    setUserError(isUserInvalid);

    if (isTitleInvalid || isUserInvalid) {
      return;
    }

    const newTodo: Todo = {
      id: Math.max(0, ...todos.map(t => t.id)) + 1,
      title: title.trim(),
      userId,
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Add Todo Form</h1>

        <form onSubmit={handleSubmit} data-cy="todoForm">
          <div className="field">
            <label className="label" htmlFor="todo-title">
              Title
            </label>
            <div className="control">
              <input
                type="text"
                id="todo-title"
                data-cy="titleInput"
                placeholder="Enter todo title"
                className={`input ${titleError ? 'is-danger' : ''}`}
                value={title}
                onChange={e => {
                  setTitle(e.target.value);
                  setTitleError(false);
                }}
              />
            </div>
            {titleError && (
              <p className="help is-danger error" data-cy="titleErrorMessage">
                Please enter a title
              </p>
            )}
          </div>

          <div className="field">
            <label className="label" htmlFor="todo-user">
              User
            </label>
            <div className="control">
              <div
                className={`select ${userError ? 'is-danger' : ''} is-fullwidth`}
              >
                <select
                  id="todo-user"
                  data-cy="userSelect"
                  value={userId}
                  onChange={e => {
                    setUserId(Number(e.target.value));
                    setUserError(false);
                  }}
                >
                  <option value="0">Choose a user</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {userError && (
              <p className="help is-danger error" data-cy="userErrorMessage">
                Please choose a user
              </p>
            )}
          </div>

          <button
            type="submit"
            className="button is-primary"
            data-cy="submitButton"
          >
            Add
          </button>
        </form>

        <TodoList todos={todos} users={users} />
      </div>
    </div>
  );
};
