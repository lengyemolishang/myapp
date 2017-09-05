/**
 * Created by lengye on 2017/9/5.
 */
import React from 'react'
import {
    Row,
    Col,
    Tabs,
    Card,
} from 'antd'
import {Link} from 'react-router'
import axios from 'axios'
const TabPane = Tabs.TabPane
export default class MobileUserCenter extends React.Component {
    state={
        collections: null,
        comments: null,
    }

    componentDidMount () {

        const userId = localStorage.getItem('userId')

        // ajax请求收藏列表数据
        let url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=${userId}`
        axios.get(url)
            .then(response => {
                const collections = response.data
                this.setState({collections})
            })
        // ajax请求评论列表数据
        url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=${userId}`
        axios.get(url)
            .then(response => {
                const comments = response.data
                this.setState({comments})
            })
    }
    render(){
        const {collections, comments} = this.state
        const collectionList = !collections
            ? <h3>没有任何收藏, 立即去收藏文章</h3>
            : collections.map((collection, index) => (
                <Card key={index} title={collection.uniquekey}
                      extra={<Link to={`/news_detail/${collection.uniquekey}/top`}>查看</Link>}>
                    {collection.Title}
                </Card>
            ))
        const commentList = !comments
            ? <h3>没有任何评论</h3>
            : comments.map((comment, index) => (
                <Card key={index} title={`于 ${comment.datetime} 评论了文章 ${comment.uniquekey}`}
                      extra={<Link to={`/news_detail/${comment.uniquekey}/top`}>查看</Link>}>
                    {comment.Comments}
                </Card>
            ))

        return (
            <Row>
                <Col span={1}></Col>
                <Col span={22}>
                    <Tabs>
                        <TabPane key="1" tab="我的收藏列表">
                            {collectionList}
                        </TabPane>
                        <TabPane key="2" tab="我的评论列表">
                            {commentList}
                        </TabPane>

                    </Tabs>

                </Col>
                <Col span={1}></Col>

            </Row>

        )

    }
}