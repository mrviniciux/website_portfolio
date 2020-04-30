import React from 'react';
import { Cookies } from 'react-cookie';
import CompanyRequest from '../../requests/CompanyRequest';
import {connect} from 'react-redux';
import { DataTable } from '../../components/Table/DataTable';
import CompanyForm from '../../forms/company/form';

// set up cookies
const cookies = new Cookies();

class Empresas extends React.Component {

  constructor(props){
    super();
    
    this.state = {
      pageLoading: true,
      list: props.companies
    }

    this.config = {
      perPage: 15,
      columns: [
        {
          title: "Código",
          dataIndex: "id",
          key: "id"
        },
        {
          title: "Nome fantasia",
          dataIndex: "nick_name",
          key: "nick_name"
        },
        {
          title: "CNPJ",
          dataIndex: "cnpj",
          key: "cnpj"
        },
        {
          title: "E-mail",
          dataIndex: "email",
          key: "email"
        },
        {
          title: "UF",
          dataIndex: "state",
          dataIndexAttr: "uf",
          key: "state"
        },
        {
          title: "Cidade",
          dataIndex: "city",
          dataIndexAttr: "name",
          key: "city"
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
    this.config.new = {partial: <CompanyForm create={this.props.create}/>}
    return (
        <main>
         <DataTable    path={this.props.path}  
                       mousepointer={true}  
                       currentRoute={this.props.currentRoute}
                       destroy={this.props.destroy} 
                       config={this.config} 
                       list={this.props.companies} />
        </main>
    );
  }
}

const mapStateToProps = state => {
  return {companies : state.companies}
};

const mapDispatchToProps = dispatch => {
  return {
    index : () => {
      dispatch(new CompanyRequest().index);      
    },
    destroy: (params) => {
      dispatch(new CompanyRequest(params).destroy); 
    },
    create: (params) => {
      dispatch(new CompanyRequest(params).create); 
    }
  }
}

const CompanyContainer = connect(mapStateToProps, mapDispatchToProps)(Empresas);

export default CompanyContainer;