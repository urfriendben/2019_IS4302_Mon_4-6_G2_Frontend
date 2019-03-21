import * as React from 'react';

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            ord2erId: this.props.match.params.userId,
        };
    }

    componentDidMount() {
        Promise.all([
            fetch("https://api.github.com/users/"+this.state.orderId),
            fetch("https://api.github.com/users/"+this.state.orderId+"/followers")
        ])
            .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
            .then(([data1, data2]) => {
                this.setState({
                isLoaded: true,
                orderInfo: data1,
                products: data2,
            });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
        });
    }

    render() {
        const { error, isLoaded, orderInfo, products} = this.state;
        if (error) {
            return <div className="container"><div>Error: {error.message}</div></div>;
        } else if (!isLoaded) {
            return <div className="container"><div>Loading...</div></div>;
        } else {
            return (
                <div className="container">
                <div>
                    <h3>Product ID: {orderInfo.id}</h3>
                    <p>Status: </p>
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(p => (
                        <tr key={p.login}>
                            <td><a>{p.login}</a></td>
                            <td>john@example.com</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
                </div>)
        }

    }

}

export default ProductDetail;
