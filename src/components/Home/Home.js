import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Home.css';
import Plot from 'react-plotly.js';


const Home = (props) => {
    
    return (
        <div>
            {/* jumbotron */}
            <div className="jumbotron jumbotron-fluid contentJ0">
                <div className="container">
                <h1 className="display-4">Stock App</h1>
                <p className="lead">This is an app that provides real time stock data</p>
                <hr className="my-4" />
                <p>It uses IEX trading API and News API</p>
                </div>
            </div>
            {/* Bunch of cards */}
            <div className="container">
                <div className="row">
                    <div className="col-sm">
                        <div class="jumbotron contentJ2">
                            <h5 class="display-4">Real Time Market News</h5>
                            <h2 class="display-4">Market Dasboard</h2>
                            <hr class="my-4"/>
                            <a class="btn btn-primary btn-lg" href="/dashboard" role="button">Dashboard</a>
                        </div>
                    </div>
                    <div className="col-sm">
                    <div class="jumbotron contentJ2">
                            <h5 class="display-4">Find Real Time Stock Data</h5>
                            <h1 class="display-4">Search Here</h1>
                            <hr class="my-4"/>
                            <a class="btn btn-primary btn-lg" href="/search" role="button">Dashboard</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;