import React, { PropTypes } from 'react';
import antd_form_create from 'decorators/antd_form_create';
import _ from 'lodash';
import styles from './index.less';
import { Link } from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Button, Form, Input, Spin, notification } from 'ant-design';
const FormItem = Form.Item;

@antd_form_create
export default class Login extends React.Component {
    state = { waiting : false }
    handleSubmit(e) {
        e.preventDefault();
        const { onSubmit, form } = this.props;
        const { validateFields } = form;
        validateFields((errors, value) => {
            if (!!errors) {
                _.mapValues(errors, (item)=>{
                    notification.error({description: _.last(item.errors.map((o)=>o.message))});
                })
                return;
            }
            onSubmit({username: value.phone, password: value.password});
        });
    }
    render () {
        const { waiting } = this.state;
        const { phone, form:{ getFieldDecorator, getFieldError, isFieldValidating } } = this.props;
        const phoneDecorator = getFieldDecorator('phone', {
            initialValue: phone,
            rules: [
                { required: true, message: '请填写电话号码' },
            ],
        });
        const passwdDecorator = getFieldDecorator('password', {
            rules: [
                { required: true, whitespace: true, message: '请填写密码' },
            ],
        });
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12 },
        };
        return (
            <div>
                <FloatingActionButton>
                    <ContentAdd />
                </FloatingActionButton>
                <br />
                <br />
                <br />
                <Form horizontal>
                    <FormItem
                        {...formItemLayout}
                        label='电话号码:'
                        hasFeedback
                        >
                        {phoneDecorator(
                            <Input placeholder='请电话号码' />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='密码:'
                        hasFeedback
                        >
                        {passwdDecorator(
                            <Input type='password' autoComplete='off'
                                onContextMenu={_.noop} onPaste={_.noop} onCopy={_.noop} onCut={_.noop}
                                />
                        )}
                    </FormItem>
                    <div className={styles.functionContainer}>
                        <Link to='/admin/forgotPwd'>
                            <Button className={styles.functionButton}>忘记密码？</Button>
                        </Link>
                        <Link to='/admin/register'>
                            <Button className={styles.functionButton}>立即注册</Button>
                        </Link>
                    </div>
                    <div className={styles.buttonContainer}>
                        <FormItem wrapperCol={{ span: 12, offset: 7 }}>
                            <Button type='primary' onClick={::this.handleSubmit} loading={waiting}>登录</Button>
                        </FormItem>
                    </div>
                </Form>
            </div>
        );
    }
}
