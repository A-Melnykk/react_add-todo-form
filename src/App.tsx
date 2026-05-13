import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import users from './api/users';
import { Todo } from './types/Todo';
import { User } from './types/User';
import './App.css';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim() || userId === 0) {
      return;
    }

    const foundUser = users.find((user: User) => user.id === userId);

    const newTodo: Todo = {
      id: Math.max(0, ...todos.map((todo: Todo) => todo.id)) + 1,
      title: title.trim(),
      userId,
      completed: false,
      user: foundUser,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setTitle('');
  };

  return (
    <div className="app">
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={title}
          onChange={event => setTitle(event.target.value)}
          placeholder="Todo title"
        />
        <select
          id="todo-user"
          data-cy="userSelect"
          value={userId}
          onChange={event => setUserId(Number(event.target.value))}
        >
          <option value="0">Select user</option>
          {users.map((user: User) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
