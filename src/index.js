/**
 * Created by lengye on 2017/9/1.
 */
import React from 'react'
import {render} from 'react-dom'
import {Router,Route,hashHistory,IndexRoute} from 'react-router'
import App from './js/App'
import NewsUser from './js/news_user'
import NewsMain from './js/news_main'
import NewsDefault from './js/news_default'
import MediaQuery from 'react-responsive'
import './pc.css'

import MobileApp from './js/mobile/mapp'
import MobileNewsDefault from './js/mobile/mnewsdefault'
import MobileNewsMain from './js/mobile/mnewsmain'
import MobileUser from './js/mobile/musers'


render((
    <div>
        <MediaQuery query='(min-device-width: 1224px)'>
        <Router history={hashHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={NewsDefault}>default</IndexRoute>
                <Route path="/news_main/:uniquekey" component={NewsMain}>新闻主体</Route>
                <Route path="/news_user" component={NewsUser}>NewsUser</Route>
            </Route>
        </Router>
        </MediaQuery>
        <MediaQuery query='(max-device-width: 1224px)'>
            <Router history={hashHistory}>
                <Route path='/' component={MobileApp}>
                    <IndexRoute component={MobileNewsDefault}></IndexRoute>
                    <Route path='/news_detail/:uniquekey' component={MobileNewsMain}></Route>
                    <Route path='/user_center' component={MobileUser}></Route>
                </Route>
            </Router>
        </MediaQuery>
    </div>
),document.getElementById('root'))