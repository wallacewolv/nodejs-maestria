import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../../utils/api';

import styles from './AddPet.module.css';

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage';

function AddPet() {
  return (
    <section className={styles.addpet_header}>
      <div>
        <h1>Cadastre um Pet</h1>
        <p>Depois ele ficará disponível para adoção</p>
      </div>
      <p>formulário</p>
    </section>
  );
}

export default AddPet;
