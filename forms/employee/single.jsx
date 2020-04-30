import React, { Component } from 'react';
import { Button, Form, Input, Card, Row, Col, Select, Tooltip, Icon } from 'antd';
import Avatar from '../../components/Upload/Avatar';
import 'isomorphic-fetch';

class EmployeeSingle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false
        };
    }

    componentWillMount() {
        this.props.companiesIndex();
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };


    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {

                if (!(parseInt(values.company_id) > 0))
                    values.company_id = this.props.employee.attributes.company.id;

                this.props.update(Object.assign(values, this.props.query, {}));
            }
        });
    };

    render() {
        function hasErrors(fieldsError) {
            return Object.keys(fieldsError).some(field => fieldsError[field]);
        }

        const { getFieldDecorator, getFieldsError } = this.props.form;
        return (
            <Card title="Dados cadastrais" bordered={true}>
                <Form onSubmit={this.handleSubmit}>

                    <Row gutter={10}>
                        <Col span={8}>
                            <Avatar {...this.props}/>
                        </Col>
                        <Col span={16}>
                            <Form.Item label={
                                <span>
                                    Nome&nbsp;
                                        <Tooltip title="Informe o nome da pessoa em questão que deseja cadastrar no sistema para futuras ações.">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </span>
                            }>
                                {getFieldDecorator('name', {
                                    initialValue: this.props.employee.attributes.name,
                                    rules: [{ required: true, message: 'Insira o nome da pessoa!' }],
                                })(
                                    <Input className="margin-right" />
                                )}
                            </Form.Item>
                            <Form.Item label="Empresa">
                                {getFieldDecorator('company_id', {
                                    rules: [{ required: true, message: 'Selecione uma empresa' }],
                                    initialValue: this.props.employee.attributes.company.name
                                })(<Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Selecione uma empresa"
                                    optionFilterProp="children"
                                    onChange={this.handleSelectState}
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    onFocus={this.fetchCompanies}>
                                    {this.props.companies && this.props.companies.map(state => <Select.Option key={state.id}>{state.attributes.name}</Select.Option>)}
                                </Select>)}
                            </Form.Item>
                            <Form.Item label={
                                <span>
                                    Número de Registro&nbsp;
                                            <Tooltip title="O número de registro é um identificador único da pessoa.">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </span>
                            }>
                                {getFieldDecorator('registration_number', {
                                    rules: [{ required: true, message: 'Insira um número de registro válido!' }],
                                    initialValue: this.props.employee.attributes.registration_number
                                })(
                                    <Input type="number" />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>



                    <Row>
                        <Col>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                                    Salvar
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
        )
    }
}

export default Form.create({ name: 'employee' })(EmployeeSingle);
