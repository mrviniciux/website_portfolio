import React, { Component, useEffect, useState } from 'react';
import {connect} from 'react-redux';
import { Row, Col, Modal, Button, Form, Input, InputNumber, Select, Icon } from 'antd';
import 'isomorphic-fetch';
import CityRequest from '../../requests/CityRequest';
import StateRequest from '../../requests/StateRequest';

class CompanyForm extends Component {

  constructor() {
    super();
    this.state = {
      loading: false,
      visible: false
    };
  }

  fetchCities = value => {
    this.props.citiesIndex(value);
  }

  fetchStates = value => {
    this.props.stateIndex(value);
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }; 

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleOk = () => {
    this.props.form.validateFields((err, obj) => {
      if (!err) {
        this.props.create(obj);
        this.setState({ visible: false });
      }
    });
  };

  render() {
    const { getFieldDecorator, geItemtFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const { visible, loading } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    console.log(this.props)
    return (
      <div>
        <Button icon="plus" type="primary" onClick={this.showModal}>
          Nova empresa
        </Button>
        <Modal
          visible={visible}
          title="Nova Empresa"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Fechar
            </Button>,
            <Button key="submit" onClick={this.handleOk} htmlType="submit" type="primary" loading={loading}>
              Salvar
            </Button>,
          ]}>
          <Form>

            <Row gutter={10}>
                <Col span={12}>
                  <Form.Item label={<span>CNPJ</span>}>
                      {getFieldDecorator('cnpj', {
                        rules: [{required: true, message: 'Insira um apelido válido.' }],
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
                  })(
                    <Input className="margin-right" />
                  )}
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label={<span>Nome fantasia</span>}>
                  {getFieldDecorator('nick_name', {
                    rules: [{required: true, message: 'Insira um nome fantasia válido.' }],
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
                    })(
                      <Input type="text" />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={<span>E-mail</span>}> 
                    {getFieldDecorator('email', {
                      rules: [{ required: true, message: 'Insira o e-mail da empresa.' }],
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
                        rules: [
                          { required: true, message: 'Selecione uma UF' },
                        ]
                      })(  <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Selecione uma UF"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            onFocus={this.fetchStates}>
                              {this.props.states && this.props.states.map(state => <Select.Option key={state.id}>{state.attributes.uf}</Select.Option>)}
                          </Select>   )}
                  </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Cidade">
                    {getFieldDecorator('city_id', {
                      rules: [
                        { required: true, message: 'Selecione uma cidade' },
                      ]
                    })(  <Select
                          showSearch
                          style={{ width: '100%' }}
                          placeholder="Selecione uma cidade"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                          onFocus={this.fetchCities}>
                            {this.props.cities && this.props.cities.map(city => <Select.Option key={city.id}>{city.attributes.name}</Select.Option>)}
                        </Select>   )}
                  </Form.Item>
              </Col>
            </Row>

            <Row gutter={10}>

              <Col span={8}>
                <Form.Item label={<span>Bairro</span>}>
                    {getFieldDecorator('district', {
                      rules: [{ required: true, message: 'Insira um bairro válido.' }],
                    })(
                      <Input type="text" />
                    )}
                  </Form.Item>
              </Col>
         
              <Col span={8}>
                <Form.Item label={<span>Rua</span>}>
                  {getFieldDecorator('street', {
                    rules: [{ required: true, message: 'Insira uma rua válida.' }],
                  })(
                    <Input type="text" />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={<span>Número</span>}>
                  {getFieldDecorator('number', {
                    rules: [{ message: 'Insira um número válido.' }],
                  })(
                    <Input tcities/>
                  )}
                </Form.Item>cities
              </Col>
            </Row> 

          </Form>
        </Modal>
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {cities : state.cities.cities, states: state.states.states}
};

const mapDispatchToProps = dispatch => {
  return {
    citiesIndex : (value) => {
      dispatch(CityRequest.index({name: value}));      
    },
    stateIndex : (value) => {
      dispatch(StateRequest.index({name: value}));      
    }
  }
}

const CompanyContainer = connect(mapStateToProps, mapDispatchToProps)(CompanyForm);

export default Form.create({ name: 'company' })(CompanyContainer);