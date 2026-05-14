import React from 'react';
import { User } from '../../types/User';

interface Props {
  user: User;
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <div className="UserInfo">
      <h3 className="title is-4">{user.name}</h3>
      <p>
        <a href={`mailto:${user.email}`}>{user.email}</a>
      </p>
    </div>
  );
};
