import * as React from 'react';
import "sass/components/customerComponents/components.scss";

class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            productInfo: this.props.match.params.productId,
            quantity: 1, 
            supplierId: null,
        };
    }

    componentDidMount() {
        console.log(this.state.productInfo);
        fetch("http://localhost:8010/good/"+this.state.productInfo)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        productInfo: result.data,
                        supplierId: result.data.supplier.toString().split("#")[1], 
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

    addItem = (pid, productInfo) => {
        var item = JSON.parse(localStorage.getItem(pid));
        if(item == 'undefined' || item == null) {
            item = {quantity: this.state.quantity, product:productInfo};
        }else{
            item.quantity = (parseInt(this.state.quantity) + parseInt(item.quantity)).toString();
        }
        console.log(item, " has been added successfully!");
        localStorage.setItem(pid, JSON.stringify(item));
        alert("Added Successfully! Current you have "+item.quantity+" of this item in your shopping cart!");
    }

    handleChange = (event) => {
        this.setState({quantity: event.target.value});
      }

    render() {
        console.log(this.state.productInfo);
        const { error, isLoaded, productInfo} = this.state;
        if (error) {
            return <div className="container"><div>Error: {error.message}</div></div>;
        } else if (!isLoaded) {
            return <div className="container"><div>Loading...</div></div>;
        } else {
            return (
                <div className="container">
                    <div>
                        <h3>Product ID: {productInfo.goodsId}</h3>
                        <p>Name: {productInfo.name}</p>
                        <p>Type: {productInfo.type}</p>
                        <p>Price: {productInfo.price}</p>
                        <p>Supplier: {this.state.supplierId}</p>
                    </div>
                    
                    
                    <label>Quantity: </label>
                        <input className="form-control mr-sm-2 quantity-input" placeholder="1" type="number" min="1" max={productInfo.length} onChange={this.handleChange}></input>
                        <button className="btn btn-outline-success my-2 my-sm-0" onClick={() => this.addItem(productInfo.goodsId, productInfo)} style={{marginLeft: '10px'}}> Add To Cart</button>
                    
                </div>)
        }

    }

}

export default ProductDetail;
