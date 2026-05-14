import React, { useState } from 'react';

import { User } from './types/User';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [users] = useState<User[]>(usersFromServer);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim() === '' || userId === 0) {
      return;
    }

    const newTodo: Todo = {
      id: Math.max(...todos.map(todo => todo.id), 0) + 1,
      title: title.trim(),
      userId: userId,
      completed: false,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="section">
      <form onSubmit={addTodo}>
        <div className="field">
          <label className="label" htmlFor="todo-title">
            Title
          </label>
          <div className="control">
            <input
              id="todo-title"
              className="input"
              type="text"
              value={title}
              onChange={event => setTitle(event.target.value)}
              data-cy="titleInput"
              placeholder="Enter todo title"
            />
          </div>
        </div>

        <div className="field">
          <label className="label" htmlFor="user-select">
            User
          </label>
          <div className="control">
            <div className="select is-fullwidth">
              <select
                id="user-select"
                value={userId}
                onChange={event => setUserId(+event.target.value)}
                data-cy="userSelect"
              >
                <option value="0">Select a user</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="button is-primary"
          data-cy="submitButton"
        >
          Add Todo
        </button>
      </form>

      <TodoList todos={todos} users={users} />
    </div>
  );
};
