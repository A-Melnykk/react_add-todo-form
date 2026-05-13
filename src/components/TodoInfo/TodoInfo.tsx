import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo;
  user: User | null;
}

export const TodoInfo: React.FC<Props> = ({ todo, user }) => {
  return (
    <div className="TodoInfo" data-id={todo.id}>
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <div
        className={`TodoInfo__status ${todo.completed ? 'TodoInfo--completed' : ''}`}
      >
        {todo.completed ? 'Completed' : 'Not completed'}
      </div>

      {user && <UserInfo user={user} />}
    </div>
  );
};
