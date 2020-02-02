
import * as React from 'react';
import { useState } from 'react';

import { sp } from '@pnp/sp';
import './styles.css';
import { store } from 'react-notifications-component';

export const ContactForm: React.FunctionComponent = () => {  

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'pessoal'
  });

  const { name, email, phone, type } = contact;

  const onChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const clearAll = () =>
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'pessoal'
    });

  const notificar = (title, message, type) => 
  store.addNotification({
    title,
    message,
    type,
    insert: "top",
    container: "top-center",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    dismiss: {
      duration: 4000,
      onScreen: true
    }
  });

  const onSubmit = e => {
    e.preventDefault();
    
    sp.web.lists.getByTitle("Usuarios").items.add({
        name,
        email,
        phone,
        type
      }).then(i => {
          console.log(i);
          notificar("Sucesso", "Cadastro realizado com sucesso!", "success");
      },
      (err) => {
        console.log(err);
        notificar("Erro", "Ocorreu um erro no cadastro!", "danger");
      });
    
    clearAll();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
       Cadastro do Contato
      </h2>
      <input
        type='text'
        placeholder='Nome'
        name='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Celular'
        name='phone'
        value={phone}
        onChange={onChange}
      />
      <h5>Tipo do Contato</h5>
      <input
        type='radio'
        name='type'
        value='pessoal'
        checked={type === 'pessoal'}
        onChange={onChange}
      />{' '}
      Pessoal{' '}
      <input
        type='radio'
        name='type'
        value='profissional'
        checked={type === 'profissional'}
        onChange={onChange}
      />{' '}
      Profissional
      <div>
        <input
          type='submit'
          value='Adicionar Contato'
          className='btn btn-primary btn-block'
        />
      </div>
      
    </form>
  );
};