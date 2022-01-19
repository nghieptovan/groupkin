import React, { Component } from "react";
import PropTypes from "prop-types";
import AsyncCreatableSelect from "react-select/async-creatable";

class RoyaltiesSelect extends Component {
  render() {
    return (
      <div className="royalties-select-component">
        <AsyncCreatableSelect
          isLoading={isLoading}
          value={selectedValue}
          isClearable={isClearable}
          closeMenuOnSelect={!isMulti}
          isMulti={isMulti}
          onChange={this.handleOnChange}
          loadOptions={this.promiseOptions}
          defaultOptions={options}
          onCreateOption={this.handleCreate}
        />
      </div>
    );
  }
}

RoyaltiesSelect.propTypes = {};

export default RoyaltiesSelect;
