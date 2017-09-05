/**
 * Created by lengye on 2017/9/5.
 */
import React, {Component} from 'react'
import axios from 'axios'
import  {Row,Col} from 'antd'
import NewsImageBlock from './default_file/news_imageblock'
import NewsComments from './news_comments'

export default class NewsMain extends Component {

    state = {
        news:{},
        type:''
    }
    showNewsDetail(uniquekey) {
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`
        axios.get(url)
            .then(response => {
                const news = response.data
                const realtype =news.realtype;
                var type;
                switch (realtype){
                    case '头条':
                        type='toutiao';
                        break;
                    case '社会':
                        type='shehui';
                        break;
                    case '国内':
                        type='guonei';
                        break;
                    case '国际':
                        type='guoji';
                        break;
                    case '娱乐':
                        type='yule';
                        break;
                    case '体育':
                        type='tiyu';
                        break;
                    case '科技':
                        type='keji';
                        break;
                    case '时尚':
                        type='shishang';
                        break;
                }
                this.setState({news,type})
                document.title = news.title
            })
    }
    componentDidMount(){
        const {uniquekey} = this.props.params
        this.showNewsDetail(uniquekey)
    }
    componentWillReceiveProps (newProps) {
        this.showNewsDetail(newProps.params.uniquekey)
    }
    render () {
        const {news,type} = this.state
        const {uniquekey} = this.props.params;
        return (
            <div>
                <Row>
                    <Col span={1}></Col>
                    <Col span={16} className='container'>
                        <div dangerouslySetInnerHTML={{__html:news.pagecontent}}></div>
                        <NewsComments uniquekey={uniquekey}></NewsComments>
                    </Col>
                    <Col span={6}>
                        <NewsImageBlock type={type} count={40} cardWidth='100%' imageWidth='150px' cardTitle="相关新闻"></NewsImageBlock>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
        )
    }
}

