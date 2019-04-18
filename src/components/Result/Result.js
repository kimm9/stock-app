import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Result.css';
import Plot from 'react-plotly.js';

const Result = (props) => {
    console.log(props.allstockdata)
    let preciseP= ""
    if(props.isData === true) {
        if(props.allstockdata.quote.changePercent < 0) {
            preciseP = (props.allstockdata.quote.changePercent * 100).toString().substring(0,5)
        } else {
            preciseP = (props.allstockdata.quote.changePercent * 100).toString().substring(0,4);
        }
    }
    
    // user Media object in Boot
    console.log(props.articles)
    const articleData = Object.values(props.articles).map(value => {
		return  <div>

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
            { props.isData === true ? <div className="whole container">
				<div className="row">
                    <div className="col content1">
                        <h5>{props.allstockdata.quote.companyName} ({props.allstockdata.quote.symbol})</h5>
                        <div>
                        <h2>${props.allstockdata.quote.latestPrice}</h2><p>{(props.allstockdata.quote.changePercent < 0) ? <div className="negative">{(props.allstockdata.quote.changePercent * 100).toString().substring(0,5)}%</div> : <div className="positive">{(props.allstockdata.quote.changePercent * 100).toString().substring(0,4)}%</div>}</p>
                        </div>
                    </div>
				</div>

				<div className="row content1">
					<Plot
					    data={props.data}
                        layout={props.layout}
                        />
				</div>
                <div className="row content2"><div className="col-lg"><h4>Profile
                        </h4></div>
                </div>
                <div className="row content1">

                    <div className="col-sm content2">

                            <h5>SECTOR</h5>
                            <p > {props.allstockdata.quote.sector}  </p>
                            <h5>WEBSITE</h5>
                            <p><a href={props.allstockdata.company.website} > {props.allstockdata.company.website}</a></p>
                            <h5>CEO</h5>
                            <p > {props.allstockdata.company.CEO} </p>
                            <h5>INDUSTRY</h5>
                            <p > {props.allstockdata.company.industry}  </p>


                    </div>
                    <div className="col-sm content2">
                                    <h5>VOLUME</h5>
                                    <p > {props.allstockdata.quote.latestVolume} </p>
                                    <h5>OPEN - CLOSE</h5>
                                    <p> {props.allstockdata.quote.open} - {props.allstockdata.quote.close} </p>
                                    <h5>AVERAGE TOTAL VOLUME</h5>
                                    <p > {props.allstockdata.quote.avgTotalVolume} </p>
                                    <h5>LOW - HIGH</h5>
                                    <p> {props.allstockdata.quote.low} - {props.allstockdata.quote.high}</p>
                                    <h5>52 WEEK RANGE</h5>
                                    <p > {props.allstockdata.quote.week52Low} - {props.allstockdata.quote.week52High} </p>
                                    <h5>P/E RATIO</h5>
                                    <p > {props.allstockdata.company.peRatio} </p>
                
                    </div>
				</div>

				<div className="row">
                        {articleData}
				</div>
            </div> :  <div className="fitscreen"></div> }
        </div>
    )
}

export default Result;