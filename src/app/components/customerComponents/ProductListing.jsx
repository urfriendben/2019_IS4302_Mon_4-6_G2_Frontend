import * as React from 'react';
import card1 from 'img/card1.jpg';
import card2 from 'img/card2.jpg';
import card3 from 'img/card3.jpg';
import 'sass/components/customerComponents/home.scss';

class ProductListing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            orders: []
        };
    }

    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        orders: result
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
        const { error, isLoaded, orders } = this.state;
        if (error) {
            return <div className="container"><div>Error: {error.message}</div></div>;
        } else if (!isLoaded) {
            return <div className="container"><div>Loading...</div></div>;
        } else {        
            return (
                <div>
                    {orders.map(item => (
                            
                            <div className="card" key={item.id}>
                            <img className="card-img-top" src={card3} alt="Card image cap"></img>
                                <div className="card-body">
                                   <h5 className="card-title">{item.id}</h5>
                                    <p className="card-text">Sir joy northward sportsmen education. Discovery incommode earnestly no he commanded if. Put still any about manor heard. </p>
                                   <a href={"customer/product/"+item.id} className="btn btn-primary">Read More</a>
                                 </div>
                             </div>
                         
                            ))
                            
                            }
                </div>
            );
            }
    }

}

export default ProductListing;
