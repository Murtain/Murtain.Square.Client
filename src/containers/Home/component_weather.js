import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { INDEX_WEATHER_FETCH } from '../../constants';

class Weather extends Component {
    constructor(props, context) {
        super(props, context);
        [
            'fetch_weather',

        ].forEach(func => {
            this[func] = this[func].bind(this);
        });
    }

    componentDidMount() {
        this.fetch_weather();
    }

    shouldComponentUpdate(nextProps) {
        return this.props.weather != nextProps.weather;
    }
    fetch_weather() {
        const { dispatch } = this.props;
        dispatch({ type: INDEX_WEATHER_FETCH });
    }

    render() {

        const { weather } = this.props;

        if (!weather) return null;

        return (
            <div className="weather">
                <span className="weather-location">{weather.realtime.city_name}</span>
                <span className="weather-icon">{weather.realtime.weather.info}</span>
                <span className="weather-metric">{weather.realtime.weather.temperature + '°'}</span>
            </div>
        )
    }
}

export default connect((store) => {
    return {
        user: store["oidc"].user,
        weather: store["weather"].weather,
    }
})(Weather);