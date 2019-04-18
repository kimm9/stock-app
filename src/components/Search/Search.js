import React, { Component } from 'react';
import axios from 'axios'
import PropTypes from 'prop-types';
import classes from './Search.css';
import Plot from 'react-plotly.js';
import Result from '../Result/Result'
import Autosuggest from 'react-autosuggest';




class Search extends Component {

    state = {
    value: '',
    suggestions: [],
		isData: false,
    date:'',
		allstockdata: '',
		search: '',
		stockData: {
			name: '',
			ticker: '',
			price: '',
			high: '',
			low: '',
			primaryExchange: '',
			sector: ''
		},
		chartData: {
			date: '',
			close: '',
			high: '',
			low: '',
			open: ''
		},
		data: '',
		layout: '',
		articles: '',
        symName: []
    } //end of state

    componentDidMount() {
		const today = new Date();
		const dd = String(today.getDate()).padStart(2, '0');
		const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		const yyyy = today.getFullYear()
		const fulldate = yyyy + '-' + mm + '-' + dd;
		const stockNameArr=[];
		

		axios.all([
			axios.get('https://api.iextrading.com/1.0/ref-data/symbols')
		]).then(axios.spread((symbols) => {
			symbols.data.map( (sym, index) => {
				stockNameArr.push({
						key: index,
						stockName: sym.name,
						stockSymbol: sym.symbol,
						nameSymbol: sym.name + " (" + sym.symbol + ")"
				})
			})//end of data map
				this.setState({
					symName: stockNameArr
				})
		}))
		this.setState({
			date: fulldate
		})
		}





    handleInputChange = (event) => {
		
		this.state.symName.map(sym => {
			if(sym.nameSymbol.toUpperCase().includes(event.target.value.toUpperCase()) || sym.stockName.toUpperCase().includes(event.target.value.toUpperCase()) || sym.stockSymbol.toUpperCase().includes(event.target.value.toUpperCase()) ) {
				this.setState({
					search: sym
				})
			}
		})

		};
		
		



    handleStockSubmit = event => {
			event.preventDefault();
		axios.all([
			axios.get('https://newsapi.org/v2/everything?q=' + this.state.search.stockName + '&from=' + this.state.date + '&sortBy=popularity&apiKey=f028c8dd8e3047f6922cb14e33f32efa'),
		axios.get('https://api.iextrading.com/1.0/stock/' + this.state.search.stockSymbol + '/batch?types=quote,news,chart,company&range=1m&last=1')
		]).then(axios.spread( (articles, stockdata) => {
			console.log(articles, stockdata)
				//for plotly
				const addfive = (x1) => {
				return x1 + 5
				}
				const subfive = (x1) => {
					return x1 - 5
				}
				// for plotly
				const trace1 = {
					type: "scatter",
			  		mode: "lines",
			  		name: 'Stock High',
			  		x: stockdata.data.chart.map(value => {
							return value.date
						}),
			  		y: stockdata.data.chart.map(value => {
							return value.high
						}),
			  		line: {color: 'green'}
				}
				const trace2 = {
					  type: "scatter",
					  mode: "lines",
					  name: 'Stock Low',
					  x: stockdata.data.chart.map(value => {
							return value.date
						}),
					  y: stockdata.data.chart.map(value => {
							return value.low
						}),
					  line: {color: 'red'}
				}
				//console.log(stockdata.data, articles.data)

				const doesShow = this.state.isData;
				// move all the 
				this.setState({
					isData: !doesShow,

					articles: articles.data.articles,
					stockData: {
					name: stockdata.data.quote.companyName,
					ticker: stockdata.data.quote.symbol,
					price: stockdata.data.quote.latestPrice,
					high: stockdata.data.quote.high,
					low: stockdata.data.quote.low,
					primaryExchange: stockdata.data.quote.primaryExchange,
					sector: stockdata.data.quote.sector
					},
					allstockdata: stockdata.data,
					chartData: {
						date: stockdata.data.chart.map(value => {
							return value.date
						}),
						close: stockdata.data.chart.map(value => {
							return value.close
						}),
						high: stockdata.data.chart.map(value => {
							return value.high
						}),
						low: stockdata.data.chart.map(value => {
							return value.low
						}),
						open: stockdata.data.chart.map(value => {
							return value.open
						})
				},
				data: [trace1, trace2],
				layout:  {
					title: 'Stock Time Series Chart',
					xaxis: {
								autorange: true,
								width: 800,
								height: 800,
						    range: [trace1.x[0], trace1.x[trace1.x.length - 1]],
						    rangeselector: {buttons: [
						        {
						          count: 7,
						          label: '7D',
						          step: 'day',
						          stepmode: 'backward'
						        },
						        {
						          count: 14,
						          label: '14D',
						          step: 'day',
						          stepmode: 'backward'
						        },
						        {step: 'all'}
						      ]},
						    rangeslider: {range: [trace1.x[0], trace1.x[trace1.x.length-1]]},
						    type: 'date'
						  },
						  yaxis: {
						    autorange: true,
						    range: [subfive(trace2.y[0]), addfive(trace1.x[trace1.x.length-1])],
						    type: 'linear'
						  }
					},
				
				},
				)
		})) // end of axios all
	}

    render() {
        return (
            <div>
							<div className="jumbotron" id="searchJ">
								<h1 className="display-4">Find your stock here!</h1>
								<p className="lead">Enter company's name or a symbol to find it's real time data!</p>
								<p>Search result includes Company Profile, Market Data, Price Chart, Top News</p>
								<hr className="my-4"/>
                <form onSubmit={this.handleStockSubmit}>
                <div className="input-group input-group-md col-6">
										<datalist className="datalist" id="stocks">
                        {this.state.symName.map(symbol=> <option value={symbol.nameSymbol} key={symbol.key} />)}
                    </datalist>
										<input 
                        type="text" 
                        className="form-control" 
                        aria-label="Sizing example input" 
                        aria-describedby="inputGroup-sizing-lg" 
                        onChange={this.handleInputChange}
                        list="stocks"
                        id="stock" />

                    <button
                        type="submit"
                        className="btn btn-success"
                        >
                        Search
                    </button>
                </div>
                </form>
								</div>
                <Result  
								stockData={this.state.stockData}
								allstockdata={this.state.allstockdata} 
                data={this.state.data} 
                layout={this.state.layout} 
                articles={this.state.articles}
                symbols={this.state.symName}
								isData={this.state.isData}/> 
            </div>
        )
    }

}

export default Search;