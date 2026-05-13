import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[];
  users: User[];
};

export const TodoList: React.FC<Props> = ({ todos, users = [] }) => (
  <div className="TodoList" data-cy="todo-list">
    {todos.map(todo => {
      const user = users?.find(u => u.id === todo.userId) || null;

      return <TodoInfo key={todo.id} todo={todo} user={user} />;
    })}
  </div>
);
