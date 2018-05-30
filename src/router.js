import React from 'react';
import { Router, Route,Switch } from 'dva/router';

import IndexPage from './routes/IndexPage';
import products from './routes/products';
import MapLine from './routes/map/mapLine';
import Custom from './routes/map/custom';
import MackerMap from './routes/map/markerMap';
import Change from './routes/map/chang';
// import MapLine from './routes/map/mapline';
// import Custom from './routes/map/custom';
// import MackerMap from './routes/map/markerMap';
// import Change from './routes/map/chang';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
        <Route path="/" component={IndexPage} />
        <Route path="/products" component={products} />
        <Route path="/mapline" exact component={MapLine} />
        <Route path="/custom" exact component={Custom} />
        <Route path="/mackermap" exact component={MackerMap} />
        <Route path="/change" exact component={Change} />
    </Router>
  );
}

export default RouterConfig;
