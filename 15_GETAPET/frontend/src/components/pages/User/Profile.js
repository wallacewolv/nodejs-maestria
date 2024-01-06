import { useState, useEffect } from 'react';

import api from '../../../utils/api';

import styles from './Profile.module.css';
import formStyles from '../../form/Form.module.css';

import Input from '../../form/Input';

function Profile() {
  const [user, setUser] = useState({});
  const [token] = useState(localStorage.getItem('token'));

  useEffect(() => {
    api.get('/users/checkuser', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    }).then((response) => {
      setUser(response.data);
    })
  }, [token]);

  function onFileChange(event) { }

  function handleChange(event) { }

  const handlePhone = (event) => {
    let input = event.target;
    input.value = phoneMask(input.value);
  }

  const phoneMask = (value) => {
    if (!value) {
      return "";
    }

    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");

    return value;
  }

  return (
    <section>
      <div className={styles.profile_header}>
        <h1>Perfil</h1>
        <p>Preview Imagem</p>
      </div>
      <form className={formStyles.form_container}>
        <Input
          text="Imagem"
          type="file"
          name="image"
          handleOnChange={onFileChange}
        />
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o seu e-mail"
          handleOnChange={handleChange}
          value={user.email || ''}
        />
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite o seu nome"
          handleOnChange={handleChange}
          value={user.name || ''}
        />
        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite o seu telefone"
          handleOnChange={handleChange}
          onKeyUp={handlePhone}
          value={user.phone || ''}
        />
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a sua senha"
          handleOnChange={handleChange}
        />
        <Input
          text="Confirmação de senha"
          type="password"
          name="confirmpassword"
          placeholder="Confirme a sua senha"
          handleOnChange={handleChange}
        />

        <input type="submit" value="Editar" />
      </form>
    </section>
  );
}

export default Profile;
