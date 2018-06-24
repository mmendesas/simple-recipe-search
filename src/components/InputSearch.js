import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class InputSearch extends Component {
    render() {
        const { value, onChange } = this.props;

        return (
            <div className="input-search">
                <p>Type here to search recipes based on ingredients:</p>
                <input type="search" onChange={e => onChange(e.target.value)} value={value} />
            </div>

        );
    }
}

InputSearch.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}