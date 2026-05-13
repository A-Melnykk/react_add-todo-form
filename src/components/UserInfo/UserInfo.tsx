import React from 'react';
import { User } from '../../types/User';

interface Props {
  user: User;
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <div className="UserInfo">
      <p className="UserInfo__name">{user.name}</p>

      <a href={`mailto:${user.email}`} className="UserInfo__link">
        {user.email}
      </a>
    </div>
  );
};
