import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { TRegisterData } from '@api';
import { registerUser } from '../../services/slices/user';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const registrationData: TRegisterData = {
      email,
      name: username,
      password
    };

    dispatch(registerUser(registrationData));
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={username}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
