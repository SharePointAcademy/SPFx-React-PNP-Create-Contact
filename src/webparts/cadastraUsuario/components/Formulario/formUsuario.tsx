
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
    tipo: 'pessoal',
    area: ''
  });

  const [areas, setAreas] = React.useState([]);

  const { name, email, phone, tipo, area } = contact;

  const popularAreas = () => {
    sp.web.lists
     .getByTitle("Areas")
     .select("Title, ID")
     .items.top(5000)
     .get()
     .then(items => {
       
       setAreas(items);  
     },
     (err) => {
       console.log(err);
     });
 };

 React.useEffect(() => {
  console.log("pageload");
  popularAreas();
  }, []);

  const onChange = e =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const clearAll = () =>
    setContact({      
      name: '',
      email: '',
      phone: '',
      tipo: 'pessoal',
      area: ''
    });

  const notificar = (title, message, tipoMensagem) => 
  store.addNotification({
    title,
    message,
    type: tipoMensagem,
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
        type: tipo,
        areaId: area //lookup field on the list Usuarios
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
      <select id="area" name="area" onChange={onChange}>
        <option value="">Selecione a área</option>
        {        
            areas.map((areaAtual, key) => 
                <option value={areaAtual.ID}>{areaAtual.Title}</option>
            )
        }
      </select>
      <input
        type='text'
        placeholder='Nome'
        name='name'
        id='name'
        value={name}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email'
        name='email'
        id='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Celular'
        name='phone'
        id='phone'
        value={phone}
        onChange={onChange}
      />
      <h5>Tipo do Contato</h5>
      <input
        type='radio'
        name='tipo'
        id='tipo'
        value='pessoal'
        checked={tipo === 'pessoal'}
        onChange={onChange}
      />{' '}
      Pessoal{' '}
      <input
        type='radio'
        name='tipo'
        id='tipo'
        value='profissional'
        checked={tipo === 'profissional'}
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