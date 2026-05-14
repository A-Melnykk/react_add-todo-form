import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { TodoInfo } from '../TodoInfo/TodoInfo';

interface Props {
  todos: Todo[];
  users: User[];
}

export const TodoList: React.FC<Props> = ({ todos, users = [] }) => {
  return (
    <section className="TodoList">
      <h2 className="title is-4">TodoList</h2>
      {todos.map(todo => (
        <TodoInfo
          todo={todo}
          user={users.find(user => user.id === todo.userId)}
          key={todo.id}
        />
      ))}
    </section>
  );
};
