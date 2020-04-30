//TODO: no momento, não é possivel criar selects individuais e usar como HOC nos formularios.
//pensar numa estrátegia de poder deixar eles reutilizaveis. 

import React from 'react';
import {connect} from 'react-redux';
import { Select, Spin } from 'antd';
import CityRequest from '../../requests/CityRequest';
import debounce from 'lodash/debounce';

const { Option } = Select;

class CitySelect extends React.Component {
  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetch = debounce(this.fetch, 2000);
  }

  componentWillMount(){
    this.setState({pageLoading: false});
  }

  state = {
    data: [],
    value: [],
    fetching: false,
  };

  handleChange = value => {
    this.setState({
      value,
      data: [],
      fetching: false,
    });
  };

  fetch = value => {
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({data: []});
    this.props.index(value);
  }

  render() {
    const { fetching, data, value } = this.state;
    return (
      
        <Select
          id="citySelect"
          showSearch
          style={{ width: '100%' }}
          placeholder="Selecione uma cidade"
          notFoundContent={this.props ? <Spin size="small" /> : null}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          onFocus={this.fetch}>
            {this.props.cities && this.props.cities.map(city => <Option key={city.id}>{city.attributes.name}</Option>)}
        </Select>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {cities : state.cities.cities, loading: state.cities.loading}
};

const mapDispatchToProps = dispatch => {
  return {
    index : (value) => {
      dispatch(CityRequest.index({name: value}));      
    }
  }
}

const CitySelectContainer = connect(mapStateToProps, mapDispatchToProps)(CitySelect);

export default CitySelectContainer;