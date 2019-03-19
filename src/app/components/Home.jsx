import * as React from 'react';
import 'sass/components/customerComponents/home.scss';
import carousell1 from 'img/carousell1.jpg';
import carousell2 from 'img/carousell2.jpeg';
import card1 from 'img/card1.jpg';
import card2 from 'img/card2.jpg';
import card3 from 'img/card3.jpg';

class Home extends React.Component {
  render() {
    return (
        <div>
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100" src={carousell1} alt="First slide"></img>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={carousell2} alt="Second slide"></img>
                    </div>
                    {/*<div className="carousel-item">*/}
                        {/*<img className="d-block w-100" src="..." alt="Third slide">*/}
                    {/*</div>*/}
                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>



            <div class="container">
                <p className="product-title">Products</p>
                <div class="row">
                    <div class="col-md-4 col1" >
                        <div className="card" >
                            <img className="card-img-top" src={card1} alt="Card image cap"></img>
                                <div className="card-body">
                                    <h5 className="card-title">Product title</h5>
                                    <p className="card-text">Sir joy northward sportsmen education. Discovery incommode earnestly no he commanded if. Put still any about manor heard. </p>
                                    <a href="#" className="btn btn-primary">Read More</a>
                                </div>
                        </div>
                    </div>
                    <div className="col-md-4 col2">
                        <div className="card" >
                            <img className="card-img-top" src={card2} alt="Card image cap"></img>
                                <div className="card-body">
                                    <h5 className="card-title">Product title</h5>
                                    <p className="card-text">Sir joy northward sportsmen education. Discovery incommode earnestly no he commanded if. Put still any about manor heard. </p>
                                    <a href="#" className="btn btn-primary">Read More</a>
                                </div>
                        </div>
                    </div>
                    <div className="col-md-4 col3">
                        <div className="card">
                            <img className="card-img-top" src={card3} alt="Card image cap"></img>
                                <div className="card-body">
                                    <h5 className="card-title">Product title</h5>
                                    <p className="card-text">Sir joy northward sportsmen education. Discovery incommode earnestly no he commanded if. Put still any about manor heard. </p>
                                    <a href="#" className="btn btn-primary">Read More</a>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default Home;
