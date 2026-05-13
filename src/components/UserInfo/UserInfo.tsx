import React from 'react';
import { User } from '../../types/User';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <div className="UserInfo">
    <span className="UserInfo__name">{user.name}</span>
    <a href={`mailto:${user.email}`} className="UserInfo__link">
      {user.email}
    </a>
  </div>
);
