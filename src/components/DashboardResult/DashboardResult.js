import React, { Component } from 'react';
import axios from 'axios'
import PropTypes from 'prop-types';
import classes from './DashboardResult.css';
import Plot from 'react-plotly.js';
import image1 from '../../assets/images/2.jpg'
import image from '../../assets/images/1.jpg'

const DashboardResult = (props) => {
    // console.log(props.news)
    // const image = require(props.sector.src)
    // marketBrief={this.state.brief}
    // sector={this.state.sectorPerformance}
    // ipos={this.state.ipo}
    // gainer={this.state.gainers}
    // loser={this.state.losers}
    // news={this.state.news}
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear()
    const fulldate = yyyy + '-' + mm + '-' + dd;

    const marketBrief = Object.values(props.marketBrief).map((value) => {
        console.log((value.quote.changePercent * 100).toString().substring(0,4))
        return(
            (value.quote.changePercent < 0) ?<div className="col-3">
            <div className="card cardContent">
              <div className="card-body">
                <div className="row mbh">{value.quote.companyName} - ({value.quote.symbol})</div>
                <div className="d-flex flex-row-reverse">
                <div className="float-right">
                            {/* <div className="col-sm mbp">
                                ${value.quote.latestPrice.toString().substring(0,6)}
                            </div>
                        <div className="col-sm negative mbp"> */}
                        <div class="container">
                                <div class="row">
                                    <div class="col-xs-6 mbp">
                                    ${value.quote.latestPrice.toString().substring(0,6)}
                                    </div>
                                    <div class="col-xs-6 negative mbp">
                                    ({(value.quote.changePercent * 100).toString().substring(0,4)}%)
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div> : <div className="col-3">
            <div className="card cardContent">
              <div className="card-body">
              <div className="row mbh">{value.quote.companyName} - ({value.quote.symbol})</div>
              <div className="d-flex flex-row-reverse">
              <div className="float-right">
              <div class="container">
                                <div class="row">
                                    <div class="col-xs-6 mbp">
                                    ${value.quote.latestPrice.toString().substring(0,6)}
                                    </div>
                                    <div class="col-xs-6 positive mbp">
                                    ({(value.quote.changePercent * 100).toString().substring(0,4)}%)
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        )
    })


    

    
    const sectorPerformance = Object.values
    (props.sector).map((value, index)=> {
        return(
            (value.sectPerformance < 0) ? 
            <div className="col-4">
            <div className="card bg-dark text-white cardContent2">
            <img class="card-img" width="200" height="100" src={value.src}/>
            <div class="card-img-overlay">
                <h5 className="card-title">{value.sectName}</h5>
                <div className="d-flex flex-row-reverse">
                <p className="card-text negative1"> {(value.sectPerformance * 100).toString().substring(0,4)}% </p>
                </div>
              </div>
            </div>
            </div> : <div className="col-4">
            <div className="card bg-dark text-white cardContent2">
            <img class="card-img" src={value.src} width="200" height="100" />
            <div class="card-img-overlay">
                <h5 className="card-title">{value.sectName}</h5>
                <div className="d-flex flex-row-reverse">
                <p className="card-text positive1"> {(value.sectPerformance * 100).toString().substring(0,4)}% </p>
                </div>
              </div>
            </div>
            </div>
        )
    })
    console.log(props.images)
    const upIpos = Object.values(props.upcomingIpo).map((value)=> {
        console.log(Math.floor(Number(value.shares)))
        return(
            
                <tr>
                    <td>{value.symbol} <br></br> <small>{value.company}</small></td>
                    <td>{value.expected}</td>
                    <td>{value.price}</td>
                    <td>{value.shares}</td>
                    <td>{value.amount}</td>
                    <td>{value.float}</td>
                    <td>{value.floatPercent}</td>
                    <td>{value.market}</td>
                </tr>
        )
    })
    const gainers = Object.values(props.gainer).map((value)=> {
        return(               
                <tr>
                    <td>{value.symbol} <br></br><small>{value.companyName}</small></td>
                    <td className="positive">+{value.change.toString().substring(0,4)}%</td>
                    <td>{value.latestPrice}</td>
                </tr>
            
        )
    })
    const losers = Object.values(props.loser).map((value)=> {
        return(               
                <tr>
                    <td>{value.symbol} <br></br><small>{value.companyName}</small></td>
                    <td className="negative">{value.change.toString().substring(0,5)}%</td>
                    <td>{value.latestPrice}</td>
                </tr>
            
        )
    })


    const news = Object.values(props.news).map(value => {
        return <div>
                    <div className="media content1">
                        <img src={value.urlToImage} className="d-flex align-self-center mr-3" alt="..." width="100" height="60" />
                        <div className="media-body">
                            <h5 className="mt-0"><a href={value.url}>
                            {value.title} 
                            </a></h5>
                            <small>by {value.author}</small>
                            <p>{value.description}</p> <small>Published at {value.publishedAt.substring(0,10)}</small>
                        </div>
                    </div>
				</div>
    })

    return(
        <div>
            <div className="container">
            <div className="container-fluid">
            <h6 className="dashhead3">MARKET VIEW</h6>
            <h4 className="dashhead1">Today's Market Dashboard</h4>
            <div className="row flex-row flex-nowrap content table">

                    {marketBrief}

            </div>
            </div>
            <div className="container-fluid">
                    <h4 className="dashhead2">Sector Performance</h4>
                    <div className="row flex-row flex-nowrap content table cardText">
                    {sectorPerformance}

                    </div>

            </div>
            <div className="row">
            <div className="container table">
                <div className="col-12">
                    <h4 className="dashhead2">IPO Calendar</h4>
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Company</th>
                            <th scope="col">Expected</th>
                            <th scope="col">Price</th>
                            <th scope="col">Shares</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Float</th>
                            <th scope="col">% of Float</th>
                            <th scope="col">Market</th>
                            </tr>
                        </thead>
                        <tbody>
                            {upIpos}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>

            <div className="row">
                <div className="col-6">
                    <h4 className="dashhead2">Gainers</h4>
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">Symbol</th>
                            <th scope="col">Change</th>
                            <th scope="col">Last Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gainers}
                        </tbody>
                    </table>
                </div>
                <div className="col-6">
                    <h4 className="dashhead2">Losers</h4>
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">Symbol</th>
                            <th scope="col">Change</th>
                            <th scope="col">Last Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {losers}
                        </tbody>
                    </table>
                </div>
            </div>
                    
            <div className="row">
                <h4 className="dashhead2">Top News</h4>
                {news}
            </div>
        </div>
    </div>
    )
}


export default DashboardResult