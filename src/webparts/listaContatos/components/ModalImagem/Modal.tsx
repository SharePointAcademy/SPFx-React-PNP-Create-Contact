import * as React from 'react';
import ReactModal from 'react-modal';
import ImodalProps from './ImodalProps';

interface IModalState{
    showModal: boolean;
}

export default class ModalImagens extends React.Component<ImodalProps, IModalState> {
    constructor (props: ImodalProps, state: IModalState) {

      super(props);
      this.state = {
        showModal: props.showModal
      };
      
      this.handleOpenModal = this.handleOpenModal.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
    }
    
    handleOpenModal () {
      this.setState({ showModal: true });
      this.props.onPress();
    }
    
    handleCloseModal () {
      this.setState({ showModal: false });
    }
    
    render () {        

      return (
        <div>
          <button onClick={this.handleOpenModal}>Ver Imagens</button>
          <ReactModal 
             isOpen={this.state.showModal}
             contentLabel="Modal Simples"
          >
            {this.props.imagens.map((imagem) =>
                <img className="imagemContatoGrande" src={imagem.ServerRelativeUrl} />
            )}

            <button onClick={this.handleCloseModal}>Close Modal</button>
          </ReactModal>
        </div>
      );
    }
  }