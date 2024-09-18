import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const withAuthorization = (WrappedComponent, allowedRoles) => {
  return (props) => {
    const { role, loading } = useSelector((state) => state.userAuthorization);

    if (loading) return <div>Loading...</div>;

    if (!allowedRoles.includes(role)) {
      return <Redirect to="/not-authorized" />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthorization;
