import React from 'react';
import { Cookies } from 'react-cookie';
import EmployeeRequest from '../../requests/EmployeeRequest';
import {connect} from 'react-redux';
import { DataTable } from '../../components/Table/DataTable';
import EmployeeForm from '../../forms/employee/form';

// set up cookies
const cookies = new Cookies();

class Funcionarios extends React.Component {

  constructor(props){
    super();
    this.state = {
      pageLoading: true,
      list: props.employee
    }

    this.config = {
      perPage: 15,
      columns: [
        {
          title: "Código",
          dataIndex: "id",
          "key": "id"
        },
        {
          title: "Nome",
          dataIndex: "name",
          key: "name"
        },
        {
          title: "Número de Registro",
          dataIndex: "registration_number",
          key: "registration_number"
        },
        {
          title: "Empresa",
          dataIndex: "company",
          key: "company",
          dataIndexAttr: "name"
        }
      ],
      delete: {
        icon: "delete"
      }
    };
  }

  componentWillMount(){
    this.props.index();
    this.setState({pageLoading: false});
  }

  render() {
    this.config.new = {partial: <EmployeeForm create={this.props.create}/>}
    return (
        <main>
            <DataTable path={this.props.path}
                       mousepointer={true} 
                       currentRoute={this.props.currentRoute}
                       destroy={this.props.destroy} 
                       config={this.config} 
                       list={this.props.employees} />
        </main>
    );
  }
}

const mapStateToProps = state => {
  return {employees : state.employees}
};

const mapDispatchToProps = dispatch => {
  return {
    index : () => {
      dispatch(new EmployeeRequest().index);      
    },
    destroy: (params) => {
      dispatch(new EmployeeRequest(params).destroy); 
    },
    create: (params) => {
      dispatch(new EmployeeRequest(params).create); 
    }
  }
}

const EmployeeContainer = connect(mapStateToProps, mapDispatchToProps)(Funcionarios);

export default EmployeeContainer

//
//Admins.getInitialProps = async (ctx) => {
//   // Must validate JWT
//   // If the JWT is invalid it must redirect
//   // back to the main page. You can do that
//   // with Router from 'next/router
//   await handleAuthSSR(ctx);
//
//   // Must return an object
//   return {}
// }