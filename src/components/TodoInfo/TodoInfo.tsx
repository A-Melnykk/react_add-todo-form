import React from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const containerClass = `TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`;

  return (
    <div className={containerClass.trim()}>
      <span className="TodoInfo__title">{todo.title}</span>
      {todo.user && <UserInfo user={todo.user} />}
    </div>
  );
};
