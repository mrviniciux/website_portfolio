import React from 'react';
import CompanyRequest from '../../../requests/CompanyRequest';
import {connect} from 'react-redux';
import CompanySingle from '../../../forms/company/single';
import {RecursiveBreadcrumb} from '../../../components/Breadcrumb/RecursiveBreadcrumb';
import CityRequest from '../../../requests/CityRequest';
import StateRequest from '../../../requests/StateRequest';

class Empresa extends React.Component {

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
    const CompanyForm = this.props.company && this.props.company.id ?  <CompanySingle company={this.props.company}/> : "";
    return (
      <main>
        <RecursiveBreadcrumb config={this.props.config} currentRoute={this.props.currentRoute} path={this.props.path}/>
        <div className="content-margin content-single">
          {this.props.company && this.props.company.id ? (<CompanySingle {...this.props}/>) : ""}
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => {
  return {company : state.company, cities: state.cities.cities, states: state.states.states}
};

const mapDispatchToProps = dispatch => {
  return {
    statesIndex : (value) => {
      dispatch(StateRequest.index({name: value}));      
    },
    citiesIndex : (value) => {
      dispatch(CityRequest.index({name: value}));      
    },
    update : (params) => {
      dispatch(new CompanyRequest(params).update);      
    },
    show : (params) => {
      dispatch(new CompanyRequest(params).show);      
    },
    destroy: (params) => {
      dispatch(new CompanyRequest(params).destroy); 
    },
    create: (params) => {
      dispatch(new CompanyRequest(params).create); 
    },
    destroyPhoto: (params) => {
      dispatch(new CompanyRequest(params).destroyPhoto); 
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Empresa);