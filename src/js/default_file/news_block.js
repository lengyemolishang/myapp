/**
 * Created by lengye on 2017/9/5.
 */
import React, {Component,PropTypes} from 'react'
import {Link} from 'react-router'
import axios from 'axios'
import {Card} from 'antd'

export default class NewsBlock extends Component{
    static propTypes={
        type:PropTypes.string.isRequired,
        count:PropTypes.number.isRequired,
    }
    state={
        newsArr:null
    }
    componentDidMount(){
        const {newsArr} =this.state
        const {type,count} = this.props
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
        axios.get(url)
            .then(response =>{
                const newsArr = response.data.map(item =>({title:item.title,uniquekey:item.uniquekey,url:item.url}))
                this.setState({newsArr})
            })
    }
    render(){
        const {newsArr} = this.state
        if (!newsArr){
            return <Card className="topNewsList"><p>暂时没有新闻</p></Card>
        }else{
            return(
                <Card className="topNewsList">
                    <ul>
                        {
                            newsArr.map((news,index) =>(
                                <li key={index}>
                                    <Link to={`/news_main/${news.uniquekey}`}>{news.title}</Link>
                                </li>

                            ))
                        }

                    </ul>
                </Card>
            )
        }
    }



}