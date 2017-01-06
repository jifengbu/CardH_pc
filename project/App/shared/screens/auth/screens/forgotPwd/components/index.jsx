import React, { PropTypes } from 'react';
import antd_form_create from 'decorators/antd_form_create';
import styles from './index.less';
import _ from 'lodash';
import { Button, Form, Input, Spin, Modal, notification } from 'ant-design';
const FormItem = Form.Item;

@antd_form_create
export default class ForgotPwd extends React.Component {
    state = { waiting: false }
    handleReset (e) {
        e.preventDefault();
        this.props.form.resetFields();
    }
    handleSubmit (e) {
        e.preventDefault();
        const self = this;
        const { actions, form, history } = this.props;
        form.validateFields((errors, value) => {
            if (errors) {
                _.mapValues(errors, (item) => {
                    notification.error({ description: _.last(item.errors.map((o) => o.message)) });
                });
                return;
            }
            self.setState({ waiting: true });
            actions.forgotPwd(value.phone, value.email, (data) => {
                const { success, msg } = data;
                self.setState({ waiting: false });
                if (success) {
                    Modal.success({
                        content: msg,
                        onOk () {
                            history.push({ pathname: '/admin/login', state: { phone: form.getFieldValue('phone') } });
                        },
                    });
                } else {
                    notification.error({ description: msg });
                }
            });
        });
    }
    render () {
        const { form } = this.props;
        const { waiting } = this.props.states || {};
        const { email, phone } = {};
        const { getFieldDecorator, getFieldError, isFieldValidating } = form;
        const phoneDecorator = getFieldDecorator('phone', {
            initialValue: phone,
            rules: [
                { required: true, message: '请填写电话号码' },
            ],
        });
        const emailDecorator = getFieldDecorator('email', {
            initialValue: email,
            validate: [{
                rules: [
                    { required: true, message: '请输入邮箱' },
                ],
                trigger: 'onBlur',
            }, {
                rules: [
                    { type: 'email', message: '请输入正确的邮箱地址' },
                ],
                trigger: ['onBlur', 'onChange'],
            }],
        });
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12 },
        };
        return (
            <div>
                <div className={styles.title}>找回密码</div>
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
                        label='找回密码的邮箱:'
                        hasFeedback
                        >
                        {emailDecorator(
                            <Input placeholder='请输入找回密码的邮箱' />
                        )}
                    </FormItem>
                    <div className={styles.buttonContainer}>
                        {
                            waiting ?
                                <div style={{ textAlign:'center' }}>
                                    <Spin />
                                    <div>请稍后...</div>
                                </div>
                            :
                                <Button type='primary' onClick={::this.handleSubmit}>确 定</Button>
                        }
                    </div>
                </Form>
            </div>
        );
    }
}
