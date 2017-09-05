/**
 * Created by lengye on 2017/9/5.
 */
import React, {Component} from 'react'
import MobileHeader from './mhead'
import NewsFooter from '../app/news_foot'
import '../../mobile.css'

export default class MobileApp extends Component {
    render () {
        return (
            <div>
                <MobileHeader />
                {this.props.children}
                <NewsFooter />
            </div>
        )
    }
}