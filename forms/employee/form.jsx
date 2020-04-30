import {connect} from 'react-redux';
import React, { Component, useEffect, useState } from 'react';
import { Modal, Button, Form, Input, Tooltip, Icon, Select } from 'antd';
import CompanyRequest from '../../requests/CompanyRequest';
import 'isomorphic-fetch';

class EmployeeForm extends Component {

  constructor(){
    super();
    this.state = {
        loading: false,
        visible: false
    };
  }

  fetchCompanies = value => {
    this.props.companiesIndex(value);
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
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const { visible, loading } = this.state;
    return (
        <div>
        <Button icon="plus" type="primary" onClick={this.showModal}>
          Novo Funcionário
        </Button>
        <Modal
          visible={visible}
          title="Nova Pessoa"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Fechar
            </Button>,
            <Button key="submit" onClick={this.handleOk} htmlType="submit" type="primary" loading={loading}>
              Salvar
            </Button>,
          ]}
        >
            <Form>
                <Form.Item  label={
                                <span>
                                Nome&nbsp;
                                <Tooltip title="Informe o nome da pessoa em questão que deseja cadastrar no sistema para futuras ações.">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                                </span>
                            }>
                    {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Insira o nome da pessoa!' }],
                    })(
                    <Input className="margin-right"/>
                    )}
                </Form.Item>
                <Form.Item label="Empresa">
                    {getFieldDecorator('company_id', {
                        rules: [
                          { required: true, message: 'Selecione uma empresa' },
                        ]
                      })(  <Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Selecione uma empresa"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            onFocus={this.fetchCompanies}>
                              {this.props.companies && this.props.companies.map(company => <Select.Option key={company.id}>{company.attributes.name}</Select.Option>)}
                          </Select>   )}
                </Form.Item>
                <Form.Item   label={
                                <span>
                                Número de Registro&nbsp;
                                <Tooltip title="O número de registro é um identificador único da pessoa.">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                                </span>
                            }>
                    {getFieldDecorator('registration_number', {
                    rules: [{ required: true, message: 'Insira um número de registro válido!' }],
                    })(
                    <Input type="number" />
                    )}
                </Form.Item>
                </Form>
            </Modal>
       </div>
    )
  }
}




const mapStateToProps = (state, ownProps) => {
  return {companies : state.companies}
};

const mapDispatchToProps = dispatch => {
  return {
    companiesIndex : (value) => {
      dispatch(new CompanyRequest({name: value}).index);      
    }
  }
}

const EmployeeContainer = connect(mapStateToProps, mapDispatchToProps)(EmployeeForm);

export default Form.create({name: 'employee'})(EmployeeContainer);