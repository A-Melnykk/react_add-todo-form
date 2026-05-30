import React from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface Props {
  todo?: Todo;
  user?: User | null;
}

export const TodoInfo: React.FC<Props> = ({ todo, user }) => {
  return (
    <div className="TodoInfo">
      <h2 className="subtitle">Todo details</h2>
      {todo ? (
        <>
          <p>
            <strong>Title:</strong> {todo.title}
          </p>
          <p>
            <strong>User:</strong> {user ? user.name : 'Unknown'}
          </p>
        </>
      ) : (
        <p>No todo selected</p>
      )}
    </div>
  );
};
