import * as React from 'react';

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            productInfo: this.props.match.params.userId,
        };
    }

    componentDidMount() {
        fetch("https://api.github.com/users/"+this.state.productInfo)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        productInfo: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, productInfo} = this.state;
        if (error) {
            return <div className="container"><div>Error: {error.message}</div></div>;
        } else if (!isLoaded) {
            return <div className="container"><div>Loading...</div></div>;
        } else {
            return (
                <div className="container">
                <div>
                    <h3>Product ID: {productInfo.node_id}</h3>
                    <p>Name: </p>
                    <p>Type: </p>
                    <p>Quantity: </p>
                    <p>Price: </p>
            </div>
                </div>)
        }

    }

}

export default ProductDetail;
