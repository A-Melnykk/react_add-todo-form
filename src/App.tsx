import React, { useState, useEffect } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { TodoInfo } from './components/TodoInfo/TodoInfo';
import { Todo } from './types/Todo';
import { User } from './types/User';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo] = useState<Todo | undefined>(undefined);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then((data: User[]) => setUsers(data))
      .catch(() => {});
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !userId) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newTodo: Todo = {
        id: Date.now(),
        title: title.trim(),
        userId: Number(userId),
        completed: false,
      };

      setTodos(prevTodos => [...prevTodos, newTodo]);

      setTitle('');
      setUserId('');
      setIsSubmitting(false);
    }, 300);
  };

  const selectedUser =
    users.find(u => u.id === selectedTodo?.userId) || undefined;

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
                id="todo-title"
                data-cy="todoTitle"
                type="text"
                className="input"
                placeholder="Enter todo title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                disabled={isSubmitting}
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
                  data-cy="userSelect"
                  value={userId}
                  onChange={e => setUserId(e.target.value)}
                  disabled={isSubmitting}
                >
                  <option value="">Choose a user</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id.toString()}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="control">
            <button
              type="submit"
              data-cy="submitButton"
              className={`button is-primary ${isSubmitting ? 'is-loading' : ''}`}
              disabled={isSubmitting}
            >
              Add Todo
            </button>
          </div>
        </form>

        <hr />

        <div className="block">
          <TodoList todos={todos} users={users} />
        </div>

        <div className="block" style={{ marginTop: '20px' }}>
          <TodoInfo todo={selectedTodo} user={selectedUser} />
        </div>
      </div>
    </div>
  );
};

export { App };
