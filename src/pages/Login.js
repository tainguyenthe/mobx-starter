import {
  Form, Icon, Input, Button, Checkbox,
} from 'antd';

import React from 'react'
import PropTypes from 'prop-types'
import { observer, inject } from 'mobx-react'
import Loading from '../components/common/Loading'
import Error from '../components/common/Error'

const FormItem = Form.Item;

@inject('store')
@observer
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loading: false,
      error: null
    }
  }

  // When route is loaded (isomorphic)
  static onEnter({ state }) {
    state.common.title = 'Login'
  }

  static contextTypes = {
    router: PropTypes.any,
    // getFieldDecorator: PropTypes.func
  }

  componentWillMount() {
    this.requiredDecorator = this.props.form.getFieldDecorator('required', {
      rules: [{required: true}],
    });
  }

  // handleChange = (e) => {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   })
  // }

  // handleLogin = (e) => {
  //   e.preventDefault()
  //   const { store, router } = this.props
  //   const { username, password } = this.state

  //   this.setState({
  //     error: null,
  //     loading: true
  //   })

  //   store.account.login({ username, password }).then(() => {
  //     router.history.push('/')
  //   }).catch(error => {
  //     this.setState({
  //       error,
  //       loading: false,
  //     })
  //   })
  // }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { loading, error, username } = this.state
    const { getFieldDecorator } = this.props.form;

    if (loading) {
      return <Loading/>
    }
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </FormItem>
      </Form>
    );
    // return (
    //   <main>
    //     <h1>sign-in</h1>
    //     <form className="account" onSubmit={this.handleLogin}>
    //       <label>
    //         Usernames
    //         <input
    //           type="text"
    //           name="username"
    //           onChange={this.handleChange}
    //           value={username}
    //           required
    //         />
    //       </label>

    //       <label>
    //         Password
    //         <input
    //           type="password"
    //           name="password"
    //           onChange={this.handleChange}
    //           required
    //         />
    //       </label>

    //       {loading
    //         ? <button disabled>Loading</button>
    //         : <button type="submit">Login</button>
    //       }

    //       {error && <Error text={error}/>}
    //     </form>
    //   </main>
    // )
  }
}

export default Login
