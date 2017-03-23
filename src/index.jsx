import React from 'react';

export default class Index extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
	    return (
	    	<div className="layout" style={{width:'100%'}}>
				<h1>You should not see this.</h1>
				{this.props.children}
			</div>
	  	);
    }
}