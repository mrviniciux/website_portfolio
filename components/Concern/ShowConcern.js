import React, { Component, useEffect, useState } from 'react';
import { Modal, Button, Form, Input, Tooltip, Icon, Select } from 'antd';
import {getSessionInfo} from '../../utils/auth';
import 'isomorphic-fetch';
import {apiUrl} from "../../config/ApiConfig";
import axios from "axios/index";
import { Flash } from '../Flash';
import EmployeeRequest from '../../requests/EmployeeRequest';
import CompanyRequest from '../../requests/CompanyRequest';
import {connect} from 'react-redux';



class ShowConcern extends Component {

  constructor(props){
    super();
    this.state = {
        loading: false,
        visible: false,
        id: props.line.id,
        name: props.line.name,
        registration_number: props.line.registration_number
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  fetchCompanies = value => {
    this.props.companiesIndex(value);
  }

  handleOk = () => {
     const id = this.props.line.id;
     this.props.form.validateFields((err, obj) => {
       if (!err) {
           this.setState({ loading: true });
           const headers = getSessionInfo();

           if(!(parseInt(obj.company_id) > 0)){
             console.log(this.props)
           }

           
           axios.put(apiUrl + '/employees/'+this.state.id, {employee: obj}, {headers: headers}).then(res => {
             Flash.create('success', [res.data.success]);
             this.setState({ loading: false, visible: false });
             this.props.refreshList();
           }).catch(err => {
             Flash.create('error', ["Falha ao gravar registro."]);
             this.setState({ loading: false});
          });
       } 
     });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };


  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const { visible, loading } = this.state;

    console.log(this.props)

    return (
      <div>
        <Button onClick={this.showModal} shape="circle" icon="edit" />
        <Modal
          visible={visible}
          title="Editar Pessoa"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Fechar
            </Button>,
            <Button key="submit" onClick={this.handleOk.bind(this)} htmlType="submit" type="primary" loading={loading}>
              Salvar
            </Button>
          ]}
        >

        <Form onSubmit={this.handleOk}>
              <Form.Item  label={
                            <span>
                              Nome&nbsp;
                              <Tooltip title="Informe o nome da pessoa em questão que deseja cadastrar no sistema para futuras ações.">
                                <Icon type="question-circle-o" />
                              </Tooltip>
                            </span>
                          }>
                {getFieldDecorator('name', {
                   initialValue: this.state.name,
                  rules: [{ required: true, message: 'Insira o nome da pessoa!' }],
                })(
                  <Input className="margin-right"/>
                )}
              </Form.Item>
              <Form.Item label="Empresa">
                                {getFieldDecorator('company_id', {
                                    rules: [{ required: true, message: 'Selecione uma empresa' }],
                                    initialValue: this.props.line.company

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
              <Form.Item   label={
                            <span>
                              Número de Registro&nbsp;
                              <Tooltip title="O número de registro é um identificador único da pessoa.">
                                <Icon type="question-circle-o" />
                              </Tooltip>
                            </span>
                          }>
                {getFieldDecorator('registration_number', {
                  initialValue: this.state.registration_number,
                  rules: [{ required: true, message: 'Insira um número de registro válido!' }],
                })(
                  <Input type="number" />
                )}
              </Form.Item>
            </Form>
        </Modal>
      </div>)
  }
}

const mapStateToProps = state => {
  return {people : state.index, companies: state.companies}
};

const mapDispatchToProps = dispatch => {
  return {
    refreshList : () => {
      dispatch(PeopleApi.index());      
    },
    companiesIndex : (value) => {
      dispatch(CompanyRequest.index({name: value}));      
    },
    employeeShow : (id) => {
      dispatch(EmployeeRequest.show({id: id}));      
    }
  }
}

const ShowConcernContainer = connect(mapStateToProps,mapDispatchToProps)(ShowConcern);

export default Form.create({name: 'people'})(ShowConcernContainer);