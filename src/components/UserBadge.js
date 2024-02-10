// UserBadge.js

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const UserBadge = ({ username, marginRight, marginTop }) => (
  <div className="user-badge" style={{ marginRight, marginTop }}>
    <FontAwesomeIcon icon={faUser} className="user-icon" />
    <span className="username">{username}</span>
  </div>
);

export default UserBadge;
