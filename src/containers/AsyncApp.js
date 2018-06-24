import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
    selectSearch,
    fetchRecipesIfNeeded,
    invalidateSubreddit
} from "../actions";

import Recipes from "../components/Recipes";
import InputSearch from '../components/InputSearch';

import logo from '../restaurant.svg';
import "../css/App.css";

class AsyncApp extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleRefreshClick = this.handleRefreshClick.bind(this);
    }

    componentDidMount() {
        const { dispatch, selectedSearch } = this.props;
        dispatch(fetchRecipesIfNeeded(selectedSearch));
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedSearch !== prevProps.selectedSearch) {
            const { dispatch, selectedSearch } = this.props;
            dispatch(fetchRecipesIfNeeded(selectedSearch));
        }
    }

    handleChange(nextTerm) {
        this.props.dispatch(selectSearch(nextTerm));
        this.props.dispatch(fetchRecipesIfNeeded(nextTerm));
    }

    handleRefreshClick(e) {
        e.preventDefault();

        const { dispatch, selectedSearch } = this.props;
        dispatch(invalidateSubreddit(selectedSearch));
        dispatch(fetchRecipesIfNeeded(selectedSearch));
    }

    render() {
        const { selectedSearch, recipes, isFetching } = this.props;
        return (
            <div>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Simple Recipe Search</h1>
                </header>
                <main>
                    <InputSearch value={selectedSearch} onChange={this.handleChange} />

                    {isFetching && recipes.length === 0 && <h2>Loading...</h2>}
                    {!isFetching && recipes.length === 0 && <h2>Empty.</h2>}
                    {recipes.length > 0 && (
                        <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                            <Recipes recipes={recipes} />
                        </div>
                    )}
                </main>
            </div>
        );
    }
}

AsyncApp.propTypes = {
    selectedSearch: PropTypes.string.isRequired,
    recipes: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { selectedSearch, recipesByTerm } = state;
    const { isFetching, lastUpdated, items: recipes } = recipesByTerm[
        selectedSearch
    ] || {
            isFetching: true,
            items: []
        };

    return {
        selectedSearch,
        recipes,
        isFetching,
        lastUpdated
    };
}

export default connect(mapStateToProps)(AsyncApp);
