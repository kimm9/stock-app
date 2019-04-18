import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Dashboard.css';
import axios from 'axios'
import Plot from 'react-plotly.js';
import DashboardResult from '../DashboardResult/DashboardResult'

class Dashboard extends Component {

    state = {
        brief: '',
        briefCards: '',
        sectorPerformance: '',
        ipo: '',
        gainers: '',
        losers: '',
        news: '',
        images: ''
    }

    componentDidMount() {
        const allSector=[];
        const allUpIpos=[];
        const allNews=[]
        const allImages=[]
        const allSectName = []
        const today = new Date();
		const dd = String(today.getDate()).padStart(2, '0');
		const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		const yyyy = today.getFullYear()
        const fulldate = yyyy + '-' + mm + '-' + dd;
        
		axios.all([
            axios.get('https://api.iextrading.com/1.0/stock/market/batch?symbols=aapl,fb,wmt,bac,baba,f,googl,vz&types=quote,news,chart&range=1m&last=5'),
            axios.get('https://api.iextrading.com/1.0/stock/market/sector-performance'),
            axios.get('https://api.iextrading.com/1.0/stock/market/upcoming-ipos'),
            axios.get('https://api.iextrading.com/1.0/stock/market/today-ipos'),
            axios.get('https://api.iextrading.com/1.0/stock/market/list/gainers'),
            axios.get('https://api.iextrading.com/1.0/stock/market/list/losers'),
            axios.get( 'https://newsapi.org/v2/everything?' +
            'q=Finance&' +
            'from=' + fulldate +
            'sortBy=popularity&' +
            'apiKey=f028c8dd8e3047f6922cb14e33f32efa'),
            axios.get('https://api.iextrading.com/1.0/stock/market/list/infocus'), 
            axios.get('https://pixabay.com/api/?key=12225281-93a8c259748377df2e3b70317&q=finance+energy&image_type=photo&pretty=true')
                                
		]).then(axios.spread((comps, sector, upIpo, todayIpo, gainer, loser, news, focus, image) => {
 
            sector.data.map((sect, index) => {
                allSectName.push(sect.name)
                allSector.push({
                    key: index,
                    sectName: sect.name,
                    sectPerformance: sect.performance,
                    sectDate: sect.lastUpdated,
                    src: require('../../assets/images/' + index.toString() + '.jpg')
                })

            })//end of data map

            upIpo.data["viewData"].map((ipo, index) => {
                allUpIpos.push({
                    key: index,
                    company: ipo.Company,
                    market: ipo.Market,
                    symbol: ipo.Symbol,
                    price: ipo.Price,
                    shares: ipo.Shares,
                    amount: ipo.Amount,
                    floatPercent: ipo.Percent,
                    expected: ipo.Expected,
                    float: ipo.Float,
                })
            })
            
				this.setState({
                    brief: comps.data,
                    sectorPerformance: allSector,
                    ipo: allUpIpos,
                    today: todayIpo.data,
                    gainers: gainer.data,
                    losers: loser.data,
                    news: news.data.articles,
                    images: image.data.hits
				})
		}))
        
    
    }

    componentDidUpdate() {

    }

    render() {
        //market briefing card
        
        return (
            <div>
                <div className="container whole">
                            <DashboardResult 
                            marketBrief={this.state.brief}
                            sector={this.state.sectorPerformance}
                            upcomingIpo={this.state.ipo}
                            gainer={this.state.gainers}
                            loser={this.state.losers}
                            news={this.state.news}
                            images={this.state.images}
                            />
                </div> 
            </div>
        )
    }
}

export default Dashboard;