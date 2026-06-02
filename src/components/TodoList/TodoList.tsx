import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { TodoInfo } from '../TodoInfo/TodoInfo';

interface Props {
  todos: Todo[];
  users: User[];
  onSelect: (todo: Todo) => void;
}

export const TodoList: React.FC<Props> = ({
  todos = [],
  users = [],
  onSelect,
}) => {
  return (
    <div className="TodoList" data-cy="TodoList">
      {todos.map(todo => {
        const currentUser =
          users?.find(user => user.id === todo.userId) || null;

        return (
          <div
            key={todo.id}
            onClick={() => onSelect(todo)}
            style={{ cursor: 'pointer' }}
          >
            <TodoInfo todo={todo} user={currentUser} />
          </div>
        );
      })}
    </div>
  );
};
