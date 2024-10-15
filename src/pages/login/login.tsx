import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { loginUser } from '../../services/slices/user';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const savedEmail = localStorage.getItem('email') ?? '';
  const [email, setEmail] = useState(savedEmail);
  const [password, setPassword] = useState('');

  const handleLoginSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    localStorage.setItem('email', email);
    dispatch(loginUser({ email, password }));
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleLoginSubmit}
    />
  );
};
