import React, { Component } from 'react';
import { Card, Breadcrumb, Icon } from 'antd';
import {stringUppercase} from '../../utils/helpers';
import { Row, Col, Button } from 'antd';
import NewConcern from '../Concern/NewConcern';


export class RecursiveBreadcrumb extends Component {

    constructor() {
        super();
        this.state = {
            separator: "/"
        };
    }

    render() {
        const pathLength = this.props.path.length;
        const withHref = (key, item) => <Breadcrumb.Item key={key} href={`/${item}`}>{stringUppercase(item, true)}</Breadcrumb.Item>;
        const noHref = (key, item) => <Breadcrumb.Item key={key}><b>{stringUppercase(item, true)}</b></Breadcrumb.Item>;

        return (
            <Card className="default-box-shadow cardBreadcrumb">
              <Row type="flex" justify="space-between">
                <Col>
                    <Breadcrumb separator={this.state.separator}>
                        <Breadcrumb.Item href="/">
                            <Icon type="home" />
                        </Breadcrumb.Item>
                        {this.props.path.map( (item, key) => (pathLength === key + 1) ? noHref(key, item) : withHref(key, item))}
                    </Breadcrumb>
                </Col>
                {this.props.config && this.props.config.new && (  <Col>
                    <NewConcern config={this.props.config.new} store={this.props.store}></NewConcern>
                </Col>)}
              </Row>
            </Card>
        );
    }
}