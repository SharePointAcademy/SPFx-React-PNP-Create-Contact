import * as React from 'react';
import { ICadastraUsuarioProps } from './ICadastraUsuarioProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { ContactForm } from './Formulario/formUsuario';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

export default class CadastraUsuario extends React.Component<ICadastraUsuarioProps, {}> {

  public render(): React.ReactElement<ICadastraUsuarioProps> {
    return (
      <div className="app-container">
        <ReactNotification />
        <ContactForm/>
      </div>
    );   
  }
}
