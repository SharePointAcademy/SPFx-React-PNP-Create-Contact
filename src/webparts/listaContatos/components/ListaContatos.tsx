import * as React from 'react';
import { IListaContatosProps } from './IListaContatosProps';
import * as jquery from "jquery";
require("./styles.css");

import ModalImagens from './ModalImagem/Modal';

export interface IListaContatosState {
  items: [
    {
      "ID": "",
      "name": "",
      "email": "",
      "phone": "",
      "type": "",
      "defaultImage": "",
      "area": {        
        Title: ""
      }
    }];
    imagens: [{
      ServerRelativeUrl: string;
    }];
    showModal: boolean;
}

export default class ListaContatos extends React.Component<IListaContatosProps, IListaContatosState> {
  private pictureLibraryName: string = "Imagens";
  private listUsers: string = "Usuarios";

  public constructor(props: IListaContatosProps, state: IListaContatosState) {
    super(props);
    this.state = {
      items: [
        {
          "ID": "",
          "name": "",
          "email": "",
          "phone": "",
          "type": "",
          "defaultImage": "",
          "area": {
            Title: ""
          }
        }
      ],
      imagens: [{
        ServerRelativeUrl: ""
      }],
      showModal: false
    };
  }

  public componentDidMount() {
    var reactHandler = this;
    jquery.ajax({
      url: `${this.props.siteUrl}/_api/web/lists/getByTitle('${this.listUsers}')/items?$select=ID,name,area/Title,email,phone,type,defaultImage&$expand=area`,
      type: "GET",
      headers: { 'Accept': 'application/json; odata=verbose;' },
      success: (resultData) => {
        reactHandler.setState({          
          items: resultData.d.results
        });

      },
      error: () => {
        console.log("Erro na API ");
      }
    });
  }

  public listarImagens(nomeBiblioteca: string) : void
  {
    var reactHandler = this;
    jquery.ajax({
      url: `${this.props.siteUrl}/_api/web/GetFolderByServerRelativeUrl('${nomeBiblioteca}')/Files`,
      type: "GET",
      headers: { 'Accept': 'application/json; odata=verbose;' },
      success: (resultData) => {        
        console.log(resultData.d.results);
        reactHandler.setState({          
          imagens: resultData.d.results,
          showModal: true          
        });

      },
      error: () => {
        console.log("Erro na API.");
      }
    });
  }

  public render(): React.ReactElement<IListaContatosProps> {
    return (

      <table>
      <thead>
          <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Type</th>
              <th>Area</th>
              <th>Imagens</th>
              <th>Ação</th>
          </tr>
      </thead>
      <tbody>
          {this.state.items.map( (item, key) => 

            <tr key={key}>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.type}</td>
            <td>{item.area.Title}</td>            
            <td>
              <img className="imagemContato"
              src={`${this.props.siteUrl}/${this.pictureLibraryName}/${item.ID}/${item.defaultImage}`} />              
            </td>
            <td>
              <ModalImagens 
                  showModal={this.state.showModal} 
                  imagens={this.state.imagens}
                  onPress={() => this.listarImagens(`${this.pictureLibraryName}/${item.ID}`)}
              />
            </td>
            </tr>            
          )}
      </tbody>
      </table>

    );
  }
}
