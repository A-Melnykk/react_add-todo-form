import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { TodoInfo } from '../TodoInfo/TodoInfo';

interface Props {
  todos?: Todo[];
  users: User[];
}

export const TodoList: React.FC<Props> = ({ todos = [], users }) => {
  return (
    <section className="section">
      {todos.map(todo => (
        <TodoInfo
          key={todo.id}
          todo={todo}
          user={users.find(u => u.id === todo.userId) || null}
        />
      ))}
    </section>
  );
};
