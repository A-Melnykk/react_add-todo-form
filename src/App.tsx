import React, { useState } from 'react';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoInfo } from './components/TodoInfo/TodoInfo';

type Props = {
  users?: User[];
  onAdd?: (todo: Todo) => void;
};

export const App: React.FC<Props> = ({ users = [], onAdd }) => {
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState({ title: false, user: false });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (errors.title) {
      setErrors(prev => ({ ...prev, title: false }));
    }
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(e.target.value));
    if (errors.user) {
      setErrors(prev => ({ ...prev, user: false }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isTitleInvalid = title.trim() === '';
    const isUserInvalid = userId === 0;

    if (isTitleInvalid || isUserInvalid) {
      setErrors({ title: isTitleInvalid, user: isUserInvalid });

      return;
    }

    const newTodo: Todo = {
      id: Math.random(),
      userId,
      title,
      completed: false,
    };

    if (onAdd) {
      onAdd(newTodo);
    }

    setTitle('');
    setUserId(0);
  };

  const selectedUser = users?.find(u => u.id === userId) || null;

  return (
    <div className="section">
      <form onSubmit={handleSubmit} data-cy="TodoForm">
        <div className="field">
          <label className="label" htmlFor="todo-title">
            Title
          </label>
          <div className="control">
            <input
              id="todo-title"
              data-cy="TodoTitleField"
              type="text"
              className={`input ${errors.title ? 'is-danger' : ''}`}
              placeholder="Todo title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          {errors.title && (
            <p className="help is-danger" data-cy="TitleError">
              Please enter a title
            </p>
          )}
        </div>

        <div className="field">
          <label className="label" htmlFor="todo-user">
            User
          </label>
          <div className="control">
            <div className={`select ${errors.user ? 'is-danger' : ''}`}>
              <select
                id="todo-user"
                data-cy="TodoUserField"
                value={userId}
                onChange={handleUserChange}
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
          {errors.user && (
            <p className="help is-danger" data-cy="UserError">
              Please choose a user
            </p>
          )}
        </div>

        <button type="submit" className="button is-primary">
          Add Todo
        </button>
      </form>

      {userId > 0 && title && (
        <TodoInfo
          todo={{ title, userId, completed: false, id: 0 }}
          user={selectedUser}
        />
      )}
    </div>
  );
};
