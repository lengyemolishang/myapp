/**
 * Created by lengye on 2017/9/5.
 */
import React, {Component,PropTypes} from 'react'
import {Link} from 'react-router'
import axios from 'axios'
import {Card} from 'antd'

export default class NewsImageBlock extends Component{
    static propTypes={
        cardTitle:PropTypes.string.isRequired,
        cardWidth:PropTypes.string.isRequired,
        type:PropTypes.string.isRequired,
        count:PropTypes.number.isRequired,
        imageWidth:PropTypes.string.isRequired,
    }
    state={
        newsArr:null
    }
    showNewsDetail(type,count){
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
        axios.get(url)
            .then(response =>{
                const newsArr = response.data.map(item =>(
                    {
                        title:item.title,
                        uniquekey:item.uniquekey,
                        url:item.url,
                        author_name:item.author_name,
                        thumbnail_pic_s:item.thumbnail_pic_s
                    }
                ))
                this.setState({newsArr})
            })
    }
    componentDidMount(){
        const {newsArr} =this.state
        const {type,count} = this.props
        this.showNewsDetail(type,count)

    }
    componentWillReceiveProps (newsProps) {
        const {newsArr} =this.state
        const {type,count} = newsProps
        this.showNewsDetail(type,count)
    }
    render() {
        const {cardTitle, imageWidth, cardWidth} = this.props
        const {newsArr} =this.state
        const imgstyle={
            width:imageWidth,
            height:'90px',
            display:'block'
        }
        const hstyle={
            width:imageWidth,
            whiteSpace:'nowrap',
            overflow:'hidden',
            textOverflow:'ellipsis'
        }
        if (!newsArr){
            return        <Card title={cardTitle} className="topNewsList" style={{width: cardWidth}}><h2>没有任何新闻</h2></Card>
        }else{
            const {type} = this.props
            return(
                <Card title={cardTitle} className="topNewsList" style={{width: cardWidth}}>
                    {
                        newsArr.map((news,index) =>(
                            <div key={index} className="imageblock">
                                <Link to={`/news_main/${news.uniquekey}`}>
                                    <div>
                                        <img src={news.thumbnail_pic_s} style={imgstyle}/>
                                    </div>
                                    <div className="custom-card">
                                        <h3 style={hstyle}>{news.title}</h3>
                                        <p>{news.author_name}</p>
                                    </div>
                                </Link>
                            </div>

                        ))
                    }
                </Card>
            )
        }
    }


}


