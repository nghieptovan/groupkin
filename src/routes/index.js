import React from 'react'
import { Route, Switch } from 'react-router'
import LoginPage from '../../src/page/login'
import Dashboard from '../../src/page/dashboard'
import InvestorList from '../../src/page/investor/investor.list'
import TransactionList from '../../src/page/transaction/transaction.list'
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
      { exact:true, path:"/", component:Dashboard},
      { exact:true, path:"/dashboard", component:Dashboard},
      { exact:true, path:"/transactions", component:TransactionList},
      { exact:true, path:"/investors", component:InvestorList},
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
