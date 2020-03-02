import * as React from 'react';
import { sp } from '@pnp/sp';
import ProdutoForm from '../ProdutoForm/ProdutoForm';
import ProdutoList from '../ProdutoList/ProdutoList';

function App(props) {

  const [products, setProducts] = React.useState([]);

  async function handleAddProduct(data) {    

    const { name, stock, price } = data;

    sp.web.lists.getByTitle("Product").items.add({
      name,
      stock,
      price,      
    }).then(i => {          
        console.log("criou");
    },
    (err) => {
      console.log(err);      
    });

    setProducts([...products, data]);

  }

  return (
    <div className="App">
      <ProdutoForm onSubmit={handleAddProduct} />
      <ProdutoList siteUrl={props.siteUrl}/>
    </div>
  );
}

export default App;