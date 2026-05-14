import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: Todo;
  user: User | null;
};

export const TodoInfo: React.FC<Props> = ({ todo, user }) => {
  return (
    <div className="TodoInfo">
      <h2>{todo.title}</h2>
      <UserInfo user={user} />
    </div>
  );
};
