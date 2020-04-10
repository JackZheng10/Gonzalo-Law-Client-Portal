import React from "react";

export default class Search extends React.Component {
  state = { searchTerm: "" };

  render() {
    return (
      <div className="ui fluid action input">
        <input
          value={this.state.searchTerm}
          onChange={event => {
            this.props.handleSearch(event.target.value);
            this.setState({ searchTerm: event.target.value });
          }}
          type="text"
          placeholder="Type to search for a specific client by name"
        />
        <button className="ui icon button">
          <i className="search icon"></i>
        </button>
      </div>
    );
  }
}
