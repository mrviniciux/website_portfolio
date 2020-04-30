import React, { Component } from 'react';
import { Table, Button, Row, Col } from 'antd';
import ShowConcern from '../Concern/ShowConcern';
import {RecursiveBreadcrumb} from '../Breadcrumb/RecursiveBreadcrumb';
import 'isomorphic-fetch';
import Router from 'next/router'


export class DataTable extends Component {

  constructor(props){
    super();
    this.state = {
        active: true,
        list: props.list,
        actionFired: false
    };
  }

  componentDidMount() {
  };

    // select the row
    onClickRow = (record) => {
      return {
        onClick: (event) => {
          if(this.props.mousepointer && event.target.localName === "td"){
            console.log(record)
            Router.push({
              pathname: `${this.props.currentRoute}/${record.key}`,
              slug: 'teste'
            })
          }
        },
      };
    }
   
  

  componentWillUnmount() {
    
  };

  isKeyColumnPresent(columns){
    return columns.filter(column => column.dataIndex === 'id').length > 0
  }

  isActionColumnPresent(columns){
    return columns.filter(column => column.dataIndex === 'action').length > 0
  }

  destroy = (id) => {
    this.props.destroy({id: id});
  }

  render() {
    let columns = [];
    let actions = [];


    if(!this.props.config){
      throw new Error("Table config is not defined");
    } else {
      columns = this.props.config.columns;
      actions = this.props.config.actions;
    }  
  
    if(!columns.length)
      throw new Error("Table must have at least one column ¯\_(ツ)_/¯");

    if(!this.isKeyColumnPresent(columns))
      throw new Error("Table need a column with dataIndex === 'id'. This id is used to do a track by.");

    if( ((actions && actions.length > 0) || this.props.config.edit || this.props.config.delete) && !this.isActionColumnPresent(columns)){
      columns.push({dataIndex: "action", title: "", align: 'right'});
    }
    
    let data = [];
  
    this.props.list.forEach(item => {
      let line = {};
      columns.forEach((column, key) => {
            let attributeValue = "";
            
            if(column.dataIndex === "id"){
              attributeValue = item[column.dataIndex];
            } else if(!column.dataIndexAttr){
              attributeValue = item.attributes[column.dataIndex];
            } else {
              attributeValue = item.attributes[column.dataIndex][column.dataIndexAttr];
            }

            line[column.dataIndex] = attributeValue;
            line["id"] = item.id;
            line["key"] = item.id;
           
      });
        line["action"] =  <Row type="flex" gutter={2} justify="end">
                           {this.props.config.edit && (<Col><ShowConcern line={line}></ShowConcern></Col>)}
                           {this.props.config.delete && (<Col><Button line={line} onClick={() => this.destroy(line.id)} shape="circle" icon="delete"/></Col>) }
                          </Row>;


        data.push(line);    
    });

    return (
      <main>
        <RecursiveBreadcrumb config={this.props.config} currentRoute={this.props.currentRoute} path={this.props.path}/>
        <div className="content-margin">
          <Table className={(this.props.mousepointer ? 'tr-mouse-pointer-on' : 'tr-mouse-pointer-off')} 
                columns={columns} 
                onRow={this.onClickRow}
                dataSource={data} />
        </div>
      </main>
    );
  }
}