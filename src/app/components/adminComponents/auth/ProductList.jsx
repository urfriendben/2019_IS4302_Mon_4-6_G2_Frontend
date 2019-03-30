import * as React from 'react';
import Axios from 'axios';
import ProductForm from './ProductForm';
import { url } from 'enum.json';
class ProductList extends React.Component {
    constructor(props) {
        const loggedIn = JSON.parse(sessionStorage.getItem('loggedIn'));

        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            products: [],
            role: loggedIn.role,
            port: loggedIn.port
        };
    }

    componentDidMount() {
        Axios.get(url + '/goods', { headers: {'port': this.state.port}})
        .then(
          (result) => {
            console.log(result);
            this.setState({
                isLoaded: true,
                products: result.data.data
            });
          }
        )
        .catch(
          (error) => {
            this.setState({
                isLoaded: true,
                error
            });
          }
        )
    }

    render() {
        const { error, isLoaded, products, role } = this.state;
        if (error) {
            return <div className="container"><div>Error: {error.message}</div></div>;
        } else if (!isLoaded) {
            return <div className="container"><div style={{textAlign: 'center'}}>Loading...</div></div>;
        } else {
            return (
                <div className="container">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p.goodsId}>
                                <td>{p.goodsId}</td>
                                <td>{p.name}</td>
                                <td>{p.quantity}</td>
                                <td><ProductForm product={p} type="IMPORT"/></td>
                                <td><ProductForm product={p} type="UPDATE"/></td>
                                <td><ProductForm product={p} type="DELETE"/></td>
                            </tr>
                            ))}
                    </tbody>
                </table>
                </div>)
        }
    }

}

export default ProductList;
