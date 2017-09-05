/**
 * Created by lengye on 2017/9/5.
 */
/**
 * 默认显示--初始化页面
 */
import React, {Component} from 'react'
import {Row,Col,Carousel,Tabs} from 'antd'
import Carousel_1 from '../images/carousel_1.jpg'
import Carousel_2 from '../images/carousel_2.jpg'
import Carousel_3 from '../images/carousel_3.jpg'
import Carousel_4 from '../images/carousel_4.jpg'
import NewsBlock from './default_file/news_block'
import NewsImageBlock from './default_file/news_imageblock'
import NewsProducts from './default_file/news_pro'

const TabPane =Tabs.TabPane

export default class NewsDetail extends Component {
    render() {
        return (
            <div>
                <Row className='container'>
                    <Col span={1}></Col>
                    <Col span={22}>
                        <div className="leftContainer" style={{width:'35%'}}>
                            <Carousel autoplay>
                                <div><img src={Carousel_1}/></div>
                                <div><img src={Carousel_2}/></div>
                                <div><img src={Carousel_3}/></div>
                                <div><img src={Carousel_4}/></div>
                            </Carousel>
                            <NewsImageBlock count={6} type='guoji' cardTitle='国际新闻' cardWidth='100%' imageWidth='112px'></NewsImageBlock>
                        </div>
                        <Tabs className='tabs_news' style={{width:'35%'}}>
                            <TabPane tab="头条新闻" key="1">
                                <NewsBlock type='top' count={21}/>
                            </TabPane>
                            <TabPane tab="国际新闻" key="2">
                                <NewsBlock type='guoji' count={21}/>
                            </TabPane>
                        </Tabs>
                        <Tabs style={{width:'30%'}}>
                            <TabPane key="1" tab="React News产品">
                                <NewsProducts></NewsProducts>
                            </TabPane>
                        </Tabs>
                        <div>
                            <NewsImageBlock count={8} type='guonei' cardTitle='国内新闻' cardWidth='100%' imageWidth='130px'></NewsImageBlock>
                            <NewsImageBlock count={16} type='yule' cardTitle='娱乐新闻' cardWidth='100%' imageWidth='130px'></NewsImageBlock>
                        </div>
                    </Col>
                    <Col span={1}></Col>
                </Row>
            </div>
        )
    }
}