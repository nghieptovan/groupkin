import React from 'react'
import { Route, Switch } from 'react-router'
import LoginPage from '../../src/page/login'
import PaymentList from '../../src/page/payment/payment.list'
import Dashboard from '../../src/page/dashboard'
import TopupList from '../../src/page/coin/topup.list'
import CoinList from '../../src/page/coin/coin.list'
import CoinPromotion from '../../src/page/coin/coin.promotion'
import Error404 from '../../src/page/error404'
import PublicLayout from '../../src/components/layout/public-layout'
import PrivateLayout from '../../src/components/layout/private-layout'

const routeslist = [  
  {
    layout:PublicLayout,
    subRoutes:[
      { path:"/login", component:LoginPage },  
    ]
  },
  {
    layout:PrivateLayout,
    subRoutes:[
      { exact:true, path:"/", component:PaymentList},
      { exact:true, path:"/payment", component:PaymentList},
      { exact:true, path:"/account", component:CoinList},
      { exact:true, path:"/coin", component:CoinList},
      { exact:true, path:"/coin/topup", component:TopupList},
      { exact:true, path:"/coin/list", component:CoinList},
      { exact:true, path:"/coin/promotion", component:CoinPromotion},
    ]
  },
];


const routes = (
 
  <Switch>
  {routeslist.map((route,i)=>
    <Route key={i} exact={route.subRoutes.some(r=>r.exact)} path={route.subRoutes.map(r=>r.path)}>
      <route.layout>
        {route.subRoutes.map((subRoute,i)=>
          <Route key={`child${i}`} {...subRoute} />
        )}
      </route.layout>
      
    </Route>
  )}
    <Route path="*" component={Error404} />
  </Switch>




)
export default routes
