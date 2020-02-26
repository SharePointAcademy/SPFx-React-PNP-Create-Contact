import * as React from 'react';
import IntlCurrencyInput from "react-intl-currency-input";

const currencyConfig = {
    locale: "pt-BR",
    formats: {
        number: {
            BRL: {
                style: "currency",
                currency: "BRL",
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            },
        },
    },
};

const ProdutoForm = (props) => {

    let defaultValue = 0;
    const { onSubmit } = props;

    const [product, setProduct] = React.useState({
        name: '',
        stock: '',
        price: 0,        
      });

    const { name, stock, price } = product;

    const clearAll = () => {
        setProduct({      
            name: '',
            stock: '',
            price: 0, 
        });        
    }

    async function handleAddProduct(e) {
        e.preventDefault();

        await onSubmit({    
            name,
            stock,
            price    
        });        
        
        clearAll();

    }

    const onChange = event =>
        setProduct({ ...product, [event.target.name]: event.target.value });

    const handleChange = (event, value, maskedValue) => {
        event.preventDefault();
        setProduct({ ...product, price: value });
        // console.log(value); // value without mask (ex: 1234.56)
        // console.log(maskedValue); // masked value (ex: R$1234,56)
    };

    return (
        <form onSubmit={handleAddProduct}>
            <label>Name</label>
            <input type="text" name="name" onChange={onChange} value={ name }/>
            <label>Stock</label>
            <input type="text" name="stock" onChange={onChange} value={ stock }/>
            <label>Preço</label>
            <IntlCurrencyInput name="price" currency="BRL" config={currencyConfig} onChange={handleChange} 
            defaultValue={defaultValue}/>

            <button type="submit">Salvar</button>
        </form>
    );
}

export default ProdutoForm;