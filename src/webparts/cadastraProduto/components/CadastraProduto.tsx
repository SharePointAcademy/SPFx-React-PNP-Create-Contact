import * as React from 'react';
import { ICadastraProdutoProps } from './ICadastraProdutoProps';
import { escape } from '@microsoft/sp-lodash-subset';
import Produto from './Produto/App';

export default class CadastraProduto extends React.Component<ICadastraProdutoProps, {}> {

  public render(): React.ReactElement<ICadastraProdutoProps> {
    return (
      
    <Produto siteUrl={this.props.siteUrl} />
        
    );
  }
}
