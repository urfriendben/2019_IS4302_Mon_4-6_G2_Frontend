import * as React from 'react';
import 'sass/components/customerComponents/home.scss';
import Carousell from 'app/components/customerComponents/Carousell';
import ProductListing from 'app/components/customerComponents/ProductListing';

class CustomerHome extends React.Component {
  render() {
    return (
        <div>
            <Carousell></Carousell>
            <div className="container" style={{marginTop: '20px'}}>
                <ProductListing></ProductListing>
            </div>
        </div>
    );
  }
}

export default CustomerHome;
