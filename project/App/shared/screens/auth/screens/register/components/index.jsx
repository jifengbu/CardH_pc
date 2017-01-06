import React, { PropTypes } from 'react';
import antd_form_create from 'decorators/antd_form_create';
import styles from './index.less';
import _ from 'lodash';
import { Button, Form, Input, Spin, Modal, notification } from 'ant-design';
const FormItem = Form.Item;

@antd_form_create
export default class Register extends React.Component {
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
            actions.register({
                phone: value.phone,
                password: value.password,
                email: value.email,
            }, (data) => {
                const { success, msg } = data;
                self.setState({ waiting: false });
                if (data.success) {
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
    checkPhone (rule, value, callback) {
        if (!value) {
            callback('用户名不能为空');
        } else if (!/^[a-zA-Z].*/.test(value)) {
            callback('用户名只能以字母开头');
        } else if (/^[a-zA-Z]{1}[a-zA-Z0-9_]*/.test(value)) {
            if (value.length < 4) {
                callback('用户名长度不能小于4');
            } else {
                callback();
            }
        } else {
            callback('用户名只能由大小写字母，数字，下划线组成且只能有字母开头');
        }
    }
    checkPass (rule, value, callback) {
        const { validateFields } = this.props.form;
        if (value) {
            validateFields(['rePassword'], { force: true });
        }
        callback();
    }
    checkPass2 (rule, value, callback) {
        const { getFieldValue } = this.props.form;
        if (value && value !== getFieldValue('password')) {
            callback('两次输入密码不一致');
        } else {
            callback();
        }
    }
    render () {
        const { form } = this.props;
        const { waiting } = this.state;
        const { phone, name, email } = {};
        const { getFieldDecorator, getFieldError, isFieldValidating } = form;
        const phoneDecorator = getFieldDecorator('phone', {
            initialValue: phone,
            rules: [
                { required: true },
                { validator: ::this.checkPhone },
            ],
        });
        const passwdDecorator = getFieldDecorator('password', {
            rules: [
                { required: true, whitespace: true, min:3, message: '请输入密码' },
                { validator: ::this.checkPass },
            ],
        });
        const rePasswdDecorator = getFieldDecorator('rePassword', {
            rules: [{
                required: true,
                whitespace: true,
                message: '请再次输入密码',
            }, {
                validator: ::this.checkPass2,
            }],
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
                <div className={styles.title}>用户注册</div>
                <Form horizontal>
                    <FormItem
                        {...formItemLayout}
                        label='电话号码:'
                        hasFeedback
                        help={isFieldValidating('phone') ? '校验中...' : _.last(getFieldError('phone'))}
                        >
                        {phoneDecorator(
                            <Input placeholder='请输入电话号码' />
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
                    <FormItem
                        {...formItemLayout}
                        label='确认密码:'
                        hasFeedback
                        >
                        {rePasswdDecorator(
                            <Input type='password' autoComplete='off' placeholder='两次输入密码保持一致'
                                onContextMenu={_.noop} onPaste={_.noop} onCopy={_.noop} onCut={_.noop}
                                />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='邮箱:'
                        hasFeedback
                        >
                        {emailDecorator(
                            <Input placeholder='请输入找回密码的邮箱（非常重要）' />
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
                                <div className={styles.buttonInnerContainer}>
                                    <Button type='primary' onClick={::this.handleSubmit}>确 定</Button>
                                    <Button type='ghost' onClick={::this.handleReset}>重 置</Button>
                                </div>
                        }
                    </div>
                </Form>
            </div>
        );
    }
}
