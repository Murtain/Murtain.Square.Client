import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { INDEX_SENTENCE_FETCH, INDEX_SENTENCE_HEART_FETCH } from '../../constants';

class ComponentFocusNow extends Component {
    constructor(props, context) {
        super(props, context);
        [

        ].forEach(func => {
            this[func] = this[func].bind(this);
        });
    }

    render() {
        const { user, focus_now } = this.props;

        if (!user || !focus_now)  return null;

        return (
            <div className="focuses">
                <ul>
                    <li className="focus">
                        <h3>TODAY TO-DO</h3>
                        <span className="focus-group">
                            <span className="focus-text">
                                {focus_now}
                            </span>
                        </span>
                    </li>
                </ul>
            </div>
        )
    }
}

export default connect((store) => {
    return {
        user: store["oidc"].user,

        focus_today: store["focus"].focus_now,
    }
})(ComponentFocusNow);