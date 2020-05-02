import React, { Component} from 'react';

export default class ImageIconButton extends Component{

    constructor(){
        super();

        this.state = {
            url: "",
            dimensions: []
        };
    }

    render(){
        const style = {width: this.props.dimensions[0], height: this.props.dimensions[1]};
        return (<a href={this.props.link}><img className="social-media-png" style={style}  src={this.props.url} /></a>);   
    }

}