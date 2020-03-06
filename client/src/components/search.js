import React from "react";

export default class Search extends React.Component {
  state = { searchTerm: "" };

  render() {
    return (
      <div class="ui fluid action input">
        <input
          value={this.state.searchTerm}
          onChange={event => {
            this.props.handleSearch(event.target.value);
            this.setState({ searchTerm: event.target.value });
          }}
          type="text"
          placeholder="Type to search for a specific client by name"
        />
        <button class="ui icon button">
          <i class="search icon"></i>
        </button>
      </div>
    );
  }
}
