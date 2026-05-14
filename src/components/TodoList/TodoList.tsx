import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { TodoInfo } from '../TodoInfo/TodoInfo';

interface Props {
  todos: Todo[];
  users: User[];
}

export const TodoList: React.FC<Props> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      <h2>Todo List</h2>
      {todos.map(todo => (
        <TodoInfo
          user={users.find(user => user.id === todo.userId) || null}
          todo={todo}
          key={todo.id}
        />
      ))}
    </section>
  );
};
