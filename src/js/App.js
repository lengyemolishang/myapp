/**
 * Created by lengye on 2017/9/5.
 */
import React,{Component} from 'react'
import Newsfoot from './app/news_foot'
import Newshead from './app/news_head'


export default class APP extends Component{
    render(){
        return(
            <div>
                <Newshead/>
                {this.props.children}
                <Newsfoot/>
            </div>


        )
    }


}