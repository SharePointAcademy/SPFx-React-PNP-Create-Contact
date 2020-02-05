
import * as React from 'react';

import { sp } from '@pnp/sp';
import './styles.css';
import { store } from 'react-notifications-component';

export const ContactForm: React.FunctionComponent = () => {  

  const [contact, setContact] = React.useState({
    name: '',
    email: '',
    phone: '',
    tipo: 'pessoal',
    area: '',
    defaultImage: ''
  });

  const [areas, setAreas] = React.useState([]);
  const [imageFiles, setImageFiles] = React.useState([]);

  const { name, email, phone, tipo, area, defaultImage } = contact;

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

  const onChange = event =>
    setContact({ ...contact, [event.target.name]: event.target.value });

  const clearAll = () =>
    setContact({      
      name: '',
      email: '',
      phone: '',
      tipo: 'pessoal',
      area: '',
      defaultImage: ''
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

  const onSubmit = event => {
    event.preventDefault();       
    
    sp.web.lists.getByTitle("Usuarios").items.add({
        name,
        email,
        phone,
        type: tipo,
        areaId: area, //lookup field on the list Usuarios
        defaultImage: (imageFiles[0].name != null ? imageFiles[0].name.toString() : "")
      }).then(i => {          
          CriarFolder("ProdutosImagens", i.data.ID.toString())
          UploadArquivo(`ProdutosImagens/${i.data.ID}`);
          notificar("Sucesso", "Cadastro realizado com sucesso!", "success");
      },
      (err) => {
        console.log(err);
        notificar("Erro", "Ocorreu um erro no cadastro!", "danger");
      });
    
    clearAll();
  };

  const UploadArquivo = (nomeBiblioteca: string) => {
    
    let files = imageFiles;

    if (files.length > 0) {
      
      files.forEach(element => {
        //Upload a file to the SharePoint Library
        sp.web.getFolderByServerRelativeUrl(nomeBiblioteca).files.add(element.name, element, true)
        .then((data) => {
            console.log(data);
        },
        (err) => {
            console.log(err);
        })
      });
    }
  }

  const CriarFolder = async (nomeBiblioteca: string, nomeFolder: string) => {
    await sp.web.lists.getByTitle(nomeBiblioteca).rootFolder.serverRelativeUrl.get()
        .then(response => {
            sp.web
                .getFolderByServerRelativeUrl(response)
                .folders.add(nomeFolder);
        },
        (err) => {
            console.log(err);
        });
  }
  
  const onChangeHandler = event =>{
  
    let files = event.target.files;
    let contador = 0;
    var arquivos = [];

    for(contador; contador < files.length; contador++)
    {
      arquivos.push(files[contador]);
    }

    setImageFiles(arquivos);
  }

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
        value='pessoal'
        checked={tipo === 'pessoal'}
        onChange={onChange}
      />{' '}
      Pessoal{' '}
      <input
        type='radio'
        name='tipo'
        value='profissional'
        checked={tipo === 'profissional'}
        onChange={onChange}
      />{' '}
      Profissional
      <div>
        <input type="file" name="imageFiles" onChange={onChangeHandler} multiple />
      </div>
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