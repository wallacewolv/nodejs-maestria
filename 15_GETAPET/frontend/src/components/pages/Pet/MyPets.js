import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import styles from './MyPets.module.css';

function MyPets() {
  const [pets, setPets] = useState([]);

  return (
    <section>
      <h1>Meus Pets</h1>
      <Link to="/pet/add">Cadastrar</Link>
      <div>
        {pets.length > 0 && (<p>Meus Pets cadastrados</p>)}
        {pets.length === 0 && <p>Não há Pets cadastrados</p>}
      </div>
    </section>
  );
}

export default MyPets;
