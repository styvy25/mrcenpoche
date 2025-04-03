
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<div>Page de connexion</div>} />
      <Route path="/register" element={<div>Page d'inscription</div>} />
      <Route path="/forgot-password" element={<div>Mot de passe oublié</div>} />
    </Routes>
  );
};

export default AuthRoutes;
