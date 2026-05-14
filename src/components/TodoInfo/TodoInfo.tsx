import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo;
  user?: User | null;
}

export const TodoInfo: React.FC<Props> = ({ todo, user }) => {
  const containerClass = todo.completed
    ? 'TodoInfo TodoInfo--completed'
    : 'TodoInfo';

  return (
    <article className={containerClass} data-id={todo.id}>
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <p className="TodoInfo__status">
        {todo.completed ? 'Completed' : 'Not completed'}
      </p>
      {user && <UserInfo user={user} />}
    </article>
  );
};
