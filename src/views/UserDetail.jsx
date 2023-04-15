import React, { useContext } from 'react';
// import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import CircularProgress from '../components/CircularProgress';

export default function UserDetail() {
  const { isLoggedIn, user } = useContext(AuthContext);
  const CircleSize = 200;

  return (
    <div>
      {!user && <p>Loading...</p>}
      {user &&  <div>
        <div>
          <img src={user.image} alt={user.username}/>
          <h2>Username:</h2>
          <h2>{user.username}</h2>
          <h2>Email:</h2>
          <h2>{user.email}</h2>
          {user.role === 'admin' && <div>
            <h2>Role:</h2>
            <h2>{user.role}</h2>
          </div>}
        </div>
        <div>
          <h3>Donated amout:</h3>
          <h3>{user.donated_total}</h3>
          <CircularProgress progress={user.donated_total%100} size={CircleSize} />
          <h3>Hero Level:</h3>
          <h3>{Math.floor(user.donated_total/100)}</h3>
        </div>
      </div>}

      <div>
        {isLoggedIn && <button><Link to={`/users/edit/me`}>Edit</Link></button>}
      </div>
    </div>
  )
}
