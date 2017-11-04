import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { INDEX_SENTENCE_FETCH, INDEX_SENTENCE_HEART_FETCH } from '../../constants';

class Sentence extends Component {
    constructor(props, context) {
        super(props, context);
        [

            'fetch_sentence_random',
            'fetch_post_sentence_heart',

            'event_btn_click_heart'

        ].forEach(func => {
            this[func] = this[func].bind(this);
        });
    }

    componentDidMount() {
        this.fetch_sentence_random();
    }

    fetch_sentence_random() {
        const { dispatch } = this.props;
        dispatch({ type: INDEX_SENTENCE_FETCH });
    }
    fetch_post_sentence_heart() {
        const { dispatch, sentence, sentence_heart_icon } = this.props;
        dispatch({
            type: INDEX_SENTENCE_HEART_FETCH, payload: {
                sentence: sentence,
                sentence_heart_icon: sentence_heart_icon
            }
        });
    }

    event_btn_click_heart() {
        this.fetch_post_sentence_heart();
    }
    render() {
        const { sentence, sentence_heart_icon } = this.props;
        const event_btn_click_heart = this.event_btn_click_heart;

        if (!sentence) return null;

        return (
            <div className="quote">
                <p className="quote-body">
                    <span className="quote-text">“{sentence.famous_saying}”</span>
                    <span className="quote-source">
                        <span className="quote-source-text">{sentence.famous_name}</span>
                    </span>
                    <img src={sentence_heart_icon} className="icon icon-heart quote-heart" onClick={event_btn_click_heart} />
                </p>
            </div>
        )
    }
}

export default connect((store) => {
    return {
        user: store["oidc"].user,

        sentence: store["sentence"].sentence,
        sentence_heart_icon: store["sentence"].sentence_heart_icon,
    }
})(Sentence);