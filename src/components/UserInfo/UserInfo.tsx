import React from 'react';
import { User } from '../../types/User';

type Props = {
  user: User | null;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <div className="UserInfo">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
};
