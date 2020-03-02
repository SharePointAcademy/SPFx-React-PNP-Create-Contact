import * as React from 'react';
import * as jquery from "jquery";
import * as moment from 'moment';
import Datatable from 'react-bs-datatable';

import '../../../../../node_modules/bootstrap-4-required/src/css/bootstrap.css';
require('../../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css');
import { sp } from '@pnp/sp';

interface Properties {
    siteUrl: string;
  }

export const ProdutoList: React.FunctionComponent<Properties> = props => {    
    
    var response = response || [];
    let url = props.siteUrl + "/_api/web/lists/getbytitle('Product')/items?$select=ID,name,stock,price&$top=4999";

    const [products, setProducts] = React.useState([]);

    var header = [
        { title: 'ID', prop: 'ID'  },
        { title: 'Name (filtro)', prop: 'name', sortable: true, filterable: true },
        { title: 'Stock', prop: 'stock' },
        { title: 'Price', prop: 'price', sortable: true }
      ];

    const onSortFunction = {
    date(columnValue) {
        // Convert the string date format to UTC timestamp
        // So the table could sort it by number instead of by string
        return moment(columnValue, 'Do MMMM YYYY').valueOf();
    }
    };
    
    function onRowClick(data) {
        console.log(data);
    }

    async function GetListItems() {        
        
        return await jquery.ajax({
            url: url,
            method: "GET",
            headers: {
                "Accept": "application/json; odata=verbose"
            },
            success: function (data) {
                response = response.concat(data.d.results);
                setProducts(response);
                if (data.d.__next) {
                    url = data.d.__next;
                    GetListItems();
                }
            },
            error: function (error) {
            }
        });

    }

    React.useEffect(() => {

        //Insert();
        GetListItems();

    }, []);

    async function Insert() {
        let name: string;
        let stock, price: number;

        for (let cont = 5051; cont < 100050; cont++) {
            name = "Product " + cont.toString();
            stock = 20;
            price = 122.60;

            await sp.web.lists.getByTitle("Product").items.add({
                name,
                stock,
                price,
            }).then(i => {
                console.log(i.data.ID);
            },
                (err) => {
                    console.log(err);
                });
        }
    }

    return (
        <div className="container mt-4">

            <Datatable
                tableHeaders={header}
                tableBody={products}
                tableClass="striped hover responsive"
                rowsPerPage={50}
                rowsPerPageOption={[20, 50, 100]}
                onRowClick={onRowClick}
                initialSort={{ prop: 'ID', isAscending: true }}
                onSort={onSortFunction}
            />

        </div>
    );

}

export default ProdutoList;