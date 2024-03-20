// Мы ожидаем, что Вы исправите синтаксические ошибки, сделаете перехват возможных исключений и улучшите читаемость кода.
// А так же, напишите кастомный хук useThrottle и используете его там где это нужно.
// Желательно использование React.memo и React.useCallback там где это имеет смысл.
// Будет большим плюсом, если Вы сможете закэшировать получение случайного пользователя.
// Укажите правильные типы.

import React, { memo, useCallback, useState } from "react";

const URL = "https://jsonplaceholder.typicode.com/users";

type Company = {
  bs: string;
  catchPhrase: string;
  name: string;
};

type User = {
  id: number;
  email: string;
  name: string;
  phone: string;
  username: string;
  website: string;
  company: Company;
  address: any;
};

interface IButtonProps {
  onClick: any;
  children: React.ReactNode;
}

function Button({ onClick, children }: IButtonProps): JSX.Element {
  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  );
}

const ButtonMemo = memo(Button);

interface IUserInfoProps {
  user: User;
}

function UserInfo({ user }: IUserInfoProps): JSX.Element {
  return (
    <table>
      <thead>
      <tr>
        <th>Username</th>
        <th>Phone number</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>{user.name}</td>
        <td>{user.phone}</td>
      </tr>
      </tbody>
    </table>
  );
}

function App(): JSX.Element {
  const [item, setItem] = useState<Record<number, User>>();

  const [counter, setCounter] = useState(0);

  const receiveRandomUser = async () => {
    const id = Math.floor(Math.random() * (10 - 1)) + 1;
    const response = await fetch(`${URL}/${id}`);
    const _user = (await response.json()) as User;
    setItem(_user);
  };

  const handleButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.stopPropagation();

      if (counter >= 10) {
        return;
      }

      receiveRandomUser();
      setCounter(counter + 1);
    },
    []
  );

  return (
    <div>
      <header>Get a random user. Api request used {counter} from 10</header>

      <ButtonMemo onClick={handleButtonClick}>
        <span>get random user</span>
      </ButtonMemo>

      <UserInfo user={item} />
    </div>
  );
}

export default App;
