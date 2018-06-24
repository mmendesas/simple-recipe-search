import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Recipe from './Recipe';

export default class Recipes extends Component {
    render() {
        return (
            <ul className="recipes-list">
                {this.props.recipes.map((recipe, i) => <Recipe recipe={recipe} />)}
            </ul>
        )
    }
}

Recipes.propTypes = {
    recipes: PropTypes.array.isRequired
}