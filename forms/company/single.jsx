import React, { Component } from 'react';
import { Button, Form, Input, Card, Row, Col, Select } from 'antd';
import 'isomorphic-fetch';

class CompanySingle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            visible: false,
            selectState: {},
            selectCity: {}
        };
    }

    componentWillMount(){
        this.props.statesIndex();
        this.props.citiesIndex();
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
              //When select values doesn't have a ID then catch it from props
              if(!(parseInt(values.state_id) > 0))
                values.state_id = this.props.company.attributes.state.id;

              if(!(parseInt(values.city_id) > 0))
                values.city_id = this.props.company.attributes.city.id;

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
                        <Col span={12}>
                            <Form.Item label={<span>CNPJ</span>}>
                                {getFieldDecorator('cnpj', {
                                    rules: [{ required: true, message: 'Insira um apelido válido.' }],
                                    initialValue: this.props.company.attributes.cnpj
                                })(
                                    <Input type="text" />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>


                    <Row gutter={10}>

                        <Col span={12}>
                            <Form.Item label={<span>Razão social</span>}>
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: 'Insira a Razão social da empresa.' }],
                                    initialValue: this.props.company.attributes.name
                                })(
                                    <Input className="margin-right" />
                                )}
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item label={<span>Nome fantasia</span>}>
                                {getFieldDecorator('nick_name', {
                                    rules: [{ required: true, message: 'Insira um nome fantasia válido.' }],
                                    initialValue: this.props.company.attributes.nick_name
                                })(
                                    <Input type="text" />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={10}>

                        <Col span={12}>
                            <Form.Item label={<span>Telefone/Celular</span>}>
                                {getFieldDecorator('phone', {
                                    rules: [{ required: true, message: 'Insira um número de celular válido.' }],
                                    initialValue: this.props.company.attributes.phone
                                })(
                                    <Input type="text" />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label={<span>E-mail</span>}>
                                {getFieldDecorator('email', {
                                    rules: [{ required: true, message: 'Insira o e-mail da empresa.' }],
                                    initialValue: this.props.company.attributes.email
                                })(
                                    <Input className="margin-right" />
                                )}
                            </Form.Item>
                        </Col>

                    </Row>

                    <Row gutter={10}>
                        <Col span={12}>
                            <Form.Item label={<span>CEP</span>}>
                                {getFieldDecorator('zipcode', {
                                    rules: [{ required: true, message: 'Insira um CEP válido.' }],
                                    initialValue: this.props.company.attributes.zipcode
                                })(
                                    <Input type="text" />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={10}>
                        <Col span={12}>
                            <Form.Item label="UF">
                                {getFieldDecorator('state_id', {
                                    rules: [{ required: true, message: 'Selecione uma UF' }],
                                    initialValue: this.props.company.attributes.state.uf
                                })(<Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Selecione uma UF"
                                    optionFilterProp="children"
                                    onChange={this.handleSelectState}
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    onFocus={this.fetchStates}>
                                    {this.props.states && this.props.states.map(state => <Select.Option key={state.id}>{state.attributes.uf}</Select.Option>)}
                                </Select>)}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Cidade">
                                {getFieldDecorator('city_id', {
                                    rules: [{ required: true, message: 'Selecione uma cidade' }],
                                    initialValue: this.props.company.attributes.city.name
                                })(<Select
                                    showSearch
                                    style={{ width: '100%' }}
                                    placeholder="Selecione uma cidade"
                                    optionFilterProp="children"
                                    onChange={this.handleSelectState}
                                    filterOption={(input, option) =>
                                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    onFocus={this.fetchCities}>
                                    {this.props.cities && this.props.cities.map(city => <Select.Option key={city.id}>{city.attributes.name}</Select.Option>)}
                                </Select>)}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={10}>

                        <Col span={8}>
                            <Form.Item label={<span>Bairro</span>}>
                                {getFieldDecorator('district', {
                                    rules: [{ required: true, message: 'Insira um bairro válido.' }],
                                    initialValue: this.props.company.attributes.district
                                })(
                                    <Input type="text" />
                                )}
                            </Form.Item>
                        </Col>

                        <Col span={8}>
                            <Form.Item label={<span>Rua</span>}>
                                {getFieldDecorator('street', {
                                    rules: [{ required: true, message: 'Insira uma rua válida.' }],
                                    initialValue: this.props.company.attributes.street
                                })(
                                    <Input type="text" />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label={<span>Número</span>}>
                                {getFieldDecorator('number', {
                                    rules: [{ message: 'Insira um número válido.' }],
                                    initialValue: this.props.company.attributes.number
                                })(
                                    <Input type="number" min="0" />
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

export default Form.create({ name: 'company' })(CompanySingle);
