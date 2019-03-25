import * as React from 'react';
import 'sass/components/customerComponents/components.scss';

class Loader extends React.Component {
  render() {
    return (
        <div>
            <div class="spinner-grow text-info" role="status">
  <span class="sr-only">Loading...</span>
</div>
</div>
    );
  }
}

export default Loader;


