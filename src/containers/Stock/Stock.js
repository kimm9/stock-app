import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios'
import Dashboard from '../../components/Dashboard/Dashboard';
import Home from '../../components/Home/Home';
import Search from '../../components/Search/Search';
import Result from '../../components/Result/Result';
import classes from './Stock.css'

class Stock extends Component {
	render() {
		return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" id="logo" href="/">Stock Finder</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">HOME <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item active">
                                <a className="nav-link" href="/search">SEARCH<span className="sr-only">(current)</span></a>
                            </li>
                                    <li className="nav-item active">
                                <a className="nav-link" href="/dashboard">DASHBOARD<span className="sr-only">(current)</span></a>
                            </li>
                        </ul>
                    </div>
                </nav>
				


                <Route path="/" exact component={Home} />
                <Route path="/search" exact component={Search} />
                <Route path="/dashboard" exact component={Dashboard} />


                <footer className="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">
                    <div class="row">
                        <div class="col-12" id="fLogo">
                            Stock Finder
                        </div>
                        <div class="col-12">
                            <h5 class="card-title title">Drop me a feedback at </h5>
                            <h6 class="card-subtitle mb-2 text-muted">
                            <a href="mailto:matt.kim712@gmail.com">matt.kim712@gmail.com</a> or call me at <a href="tel:01234567890"></a>(201)-655-2735
                            </h6>
                            <a href="https://www.linkedin.com/in/mattkim712/" className="btn"><i class="fa fa-linkedin" aria-hidden="true"></i>Linkedin</a>
                            <a href="https://github.com/kimm9" className="btn"><i class="fa fa-github-alt" aria-hidden="true"></i>Github</a>
                        </div>
                        </div>
                    </div>
                </footer>
            </div>
		)
	}
}

export default Stock;