import * as React from 'react';
import ProductListingItem from 'app/components/customerComponents/ProductListingItem';
import 'sass/components/customerComponents/home.scss';

class ProductListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            orders: [],
        };
    }

    componentDidMount() {
        fetch("http://52.15.98.17:8010/goods",{headers: {'port': 3000}})
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    orders: result.data
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
        console.log(this.state.orders);
        var { error, isLoaded, orders} = this.state;
        if (error) {
            return <div className="container"><div>Error: {error.message}</div></div>;
        } else if (!isLoaded) {
            return <div className="container"><div>Loading...</div></div>;
        } else {        
            return (
                <div>
                    {orders.map((item, index) => {
                        if(index % 3 == 0){
                            return (
                                <div className="row" key={item.goodsId} style={{marginBottom: '20px',height: "350px"}}> 
                                    <ProductListingItem item={orders[index]}></ProductListingItem>
                                    <ProductListingItem item={orders[index + 1]}></ProductListingItem>
                                    <ProductListingItem item={orders[index + 2]}></ProductListingItem>
                                </div>
                            )}
                            }
                        )
                    }
                </div>
            );
            }
    }

}

export default ProductListing;
