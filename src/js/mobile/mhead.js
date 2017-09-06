/**
 * Created by lengye on 2017/9/5.
 */
import React, {Component} from 'react'
import {
    Row,
    Col,
    Icon,
    Button,
    Modal,
    Tabs,
    Form,
    Input,
    message
} from 'antd'
import {Link} from 'react-router'
import axios from 'axios'
import logo from '../../images/logo.png'
const TabPane = Tabs.TabPane
const FormItem = Form.Item
class MobileNewsHeader extends Component {
    state = {
        username: null,
        modalVisible: false
    }
    componentWillMount = () => {
        const username = localStorage.getItem('username')
        if (username) {
            this.setState({username})
        }
    }
    setModalVisible = (modalVisible) => {
        this.setState({modalVisible})
    }
    tuichu = ()=>{
        this.setState({username:null})
        localStorage.removeItem('username')
        localStorage.removeItem('userId')

    }
    handleSubmit = (isRegist, event) => {
        event.preventDefault()
        const {username, password, r_userName, r_password, r_confirmPassword} = this.props.form.getFieldsValue()
        const action = isRegist ? 'register' : 'login'
        const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=${action}&username=${username}&password=${password}&r_userName=${r_userName}&r_password=${r_password}&r_confirmPassword=${r_confirmPassword}`

        axios.get(url)
            .then(response => {
                const result = response.data
                if (isRegist) {
                    message.success('注册成功')
                } else {
                    if (!result) {
                        message.error('登陆失败')
                    } else {
                        message.success('登陆成功')
                        console.log(result)
                        const userId = result.UserId
                        const username = result.NickUserName
                        this.setState({username})
                        localStorage.setItem('userId', userId)
                        localStorage.setItem('username', username)
                        console.log(localStorage.getItem('username')+'111111')
                    }
                }
            })
        this.setState({modalVisible: false})
    }
    render() {
        const {username, modalVisible} = this.state
        const {getFieldDecorator} = this.props.form


        const userItem = username
            ?<div id="d1">
                <Link to='/user_center'>
                    <Icon type="inbox"/>
                </Link>
                <Button type='dashed' size="small" onClick={this.tuichu}>退出</Button>
            </div>
            : <Icon type="setting" onClick={this.setModalVisible.bind(this, true)}/>

        return (
            <div id="mobileheader">
                <header>
                    <Row>
                        <Col span={15}>
                        <Link to='/'>
                            <img src={logo} alt="logo"/>
                            <span>React</span>
                        </Link>
                        </Col>
                        <Col span={9}>
                            {userItem}
                        </Col>

                    </Row>
                </header>
                <Modal title="用户中心"
                       visible={modalVisible}
                       onOk={this.setModalVisible.bind(this, false)}
                       onCancel={this.setModalVisible.bind(this, false)}
                       okText='关闭'>
                    <Tabs type="card" onChange={() => this.props.form.resetFields()}>
                        <TabPane tab="登陆" key="1">
                            <Form onSubmit={this.handleSubmit.bind(this, false)}>
                                <FormItem label='账户'>
                                    {
                                        getFieldDecorator('username')(
                                            <Input placeholder="请输入账号"/>
                                        )
                                    }
                                </FormItem>
                                <FormItem label='密码'>
                                    {
                                        getFieldDecorator('password')(
                                            <Input type='password' placeholder="请输入密码"/>
                                        )
                                    }
                                </FormItem>
                                <Button type='primary' htmlType="submit">登陆</Button>
                            </Form>
                        </TabPane>
                        <TabPane tab="注册" key="2">
                            <Form onSubmit={this.handleSubmit.bind(this, true)}>
                                <FormItem label='账户'>
                                    {
                                        getFieldDecorator('r_userName')(
                                            <Input placeholder="请输入账号"/>
                                        )
                                    }
                                </FormItem>
                                <FormItem label='密码'>
                                    {
                                        getFieldDecorator('r_password')(
                                            <Input type='password' placeholder="请输入密码"/>
                                        )
                                    }
                                </FormItem>
                                <FormItem label='确认密码'>
                                    {
                                        getFieldDecorator('r_confirmPassword')(
                                            <Input type='password' placeholder="请输入确认密码"/>
                                        )
                                    }
                                </FormItem>
                                <Button type='primary' htmlType="submit">注册</Button>
                            </Form>
                        </TabPane>
                    </Tabs>
                </Modal>
            </div>
        )
    }
}

export default Form.create()(MobileNewsHeader)



