import React, { Component } from 'react';

import '../css/recipe.css'

export default class Recipe extends Component {
    render() {
        const { title, href, ingredients, thumbnail } = this.props.recipe;
        return (
            <div className="recipe-item">
                <div className="recipe-header">
                    <p className="recipe-title">{title}</p>
                    <a target="_blank" href={href}>
                        <img className="recipe-img" src={thumbnail || "src/assets/notfound.png"} alt={title} style={{ width: '150px' }} />
                    </a>
                </div>
                <ul className="recipe-ingredients">
                    {ingredients.split(',').slice(0, 3).map((item, i) => <li key={i}>{item}</li>)}
                </ul>
            </div>
        )
    }
}