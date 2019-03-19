import * as React from 'react';
import 'sass/components/customerComponents/menu.scss';

class CustomerMenu extends React.Component {
    render() {
        return (
            <div class="customerMenu">
                <p>MENU</p>
                <div><a href="/customer/viewAllOrder">View All Order</a></div>
                <div><a href="/customer/order1">View Order Detail</a></div>
            </div>

        );
    }
}

export default CustomerMenu;
