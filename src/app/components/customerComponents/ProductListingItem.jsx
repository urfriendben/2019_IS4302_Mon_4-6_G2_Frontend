import * as React from 'react';
import card1 from 'img/card1.jpg';
// import card2 from 'img/card2.jpg';
// import card3 from 'img/card3.jpg';
import "sass/components/customerComponents/components.scss";

class ProductListingItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item, // productId:product}
        };
    }

    render() {
        var item = this.state.item;
        if(item == "undefined" || item == null){
            return <div className="col-4"></div>
        }else{
        return (
            <div className="col-4" style={{marginBottom:'20px'}}>
                <div className="card" key={item.goodsId}>
                <img className="card-img-top" src={card1} alt="Card image cap"></img>
                    <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">Type: {item.type}</p>
                    <a href={"customer/product/"+item.goodsId} className="btn btn-info">Read More</a>
                    </div>
                </div>
            </div>
            
        );}
    }

}

export default ProductListingItem;
