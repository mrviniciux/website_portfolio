import React from 'react';
import EmployeeRequest from '../../../requests/EmployeeRequest';
import {connect} from 'react-redux';
import EmployeeSingle from '../../../forms/employee/single';
import {RecursiveBreadcrumb} from '../../../components/Breadcrumb/RecursiveBreadcrumb';
import CompanyRequest from '../../../requests/CompanyRequest';
import StateRequest from '../../../requests/StateRequest';

class Funcionario extends React.Component {

  constructor(props){
    super();
    this.state = {
      pageLoading: true
    }
  }

  componentWillMount(){
    this.props.show(this.props.query);
    this.setState({pageLoading: false});
  }

  render() {
    const EmployeeForm = this.props.employee && this.props.employee.id ?  <EmployeeSingle employee={this.props.employee}/> : "";
    return (
      <main>
        <RecursiveBreadcrumb config={this.props.config} currentRoute={this.props.currentRoute} path={this.props.path}/>
        <div className="content-margin content-single">
          {this.props.employee && this.props.employee.id ? (<EmployeeSingle {...this.props}/>) : ""}
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {employee : state.employee, mainObject: state.employee, companies: state.companies}
};

const mapDispatchToProps = dispatch => {
  return {
    companiesIndex : (value) => {
      dispatch(new CompanyRequest().index);      
    },
    update : (params) => {
      dispatch(new EmployeeRequest(params).update);      
    },
    show : (params) => {
      dispatch(new EmployeeRequest(params).show);      
    },
    destroy: (params) => {
      dispatch(new EmployeeRequest(params).destroy); 
    },
    create: (params) => {
      dispatch(new EmployeeRequest(params).create); 
    },
    upload: (params) => {
      dispatch(new EmployeeRequest(params).upload); 
    },
    destroyPhoto: (params) => {
      dispatch(new EmployeeRequest(params).destroyPhoto); 
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Funcionario);