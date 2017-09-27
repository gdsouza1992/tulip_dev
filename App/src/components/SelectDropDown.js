import React, { Component } from 'react';

class SelectDropDown extends Component {

    constructor(props){
        super(props);
        this.state = {
            selectedPage: "page_/analytics"
        }
    }

    handlePageChange = (event) => {
        const selectedPage = event.target.value;
        this.props.onPageChange(selectedPage);
        this.setState({selectedPage})
    }

    render(){
        return (
            <select value={this.state.selectedPage} onChange={this.handlePageChange}>
                <option value="page_/">"/"</option>
                <option value="page_/analytics">"/analytics"</option>
                <option value="page_/data">"/data"</option>
                <option value="page_/player">"/player"</option>
                <option value="page_/processes">"/processes"</option>
                <option value="page_/processes/editor">"/processes/editor"</option>
            </select>
        )
    }
}

export default SelectDropDown;
