import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { UserInfo } from '../UserInfo/UserInfo';

interface Props {
  todo: Todo;
  user: User | null;
}

export const TodoInfo: React.FC<Props> = ({ todo, user }) => {
  return (
    <div
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
      data-id={todo.id}
    >
      <span className="TodoInfo__title">{todo.title}</span>

      <UserInfo user={user} />
    </div>
  );
};
