import React, { Component } from 'react';

const styleInline = { marginRight: 10 };

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: 'vietnam'
    };
  }

  handleChangeForm = (event) => {
    this.setState({ keyword: event.target.value });
  };

  renderButton = () => {
    if (this.state.keyword.trim().length > 0) {
      return (
        <button
          className={
            this.state.keyword.length === 1
              ? 'btn btn-primary'
              : 'btn btn-warning'
          }
        >
          Search
        </button>
      );
    }
    return <button disabled>Disable</button>;
  };

  render() {
    return (
      <div className="form d-flex">
        <input
          type="text"
          className="form-control"
          value={this.state.keyword}
          onChange={this.handleChangeForm}
          style={styleInline}
        />
        {this.renderButton()}
        {/* {this.state.keyword.length > 0 ? <button className="btn btn-primary">Search</button> : <button>Disable</button>} */}
        {/* {this.state.keyword.length > 0 && <button className="btn btn-primary">Search</button>} */}
      </div>
    );
  }
}

export default SearchForm;
