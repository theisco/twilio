import React from 'react';
import MessageHeader from './messageHeader';
import './style.scss';
import {Sentiment, Route, Entities, Concepts} from './messageInfo';
import Check from 'img/check.svg';
import CheckDone from 'img/check-done.svg';


export default ({text, phoneNumber, city, state, day, time, keywords, concepts, entities, sentiment}) => (
    <div className='message'>
        <div className = 'message-left'>
            <MessageHeader
                phoneNumber={phoneNumber}
                city={city}
                state={state}
                day={day}
                time={time}
            />
            <MessageBody text={text} keywords={keywords}/>
        </div>
        <div className = 'message-right'>
            <Sentiment sentiment={sentiment}/>
            <Route keywords={keywords}/>
            <Entities entities={entities}/>
            <Concepts concepts={concepts}/>
        </div>
        <img src={Check} className='check'></img>
    </div>
)


class MessageBody extends React.Component {

    render(){
        let text = this.props.text;


        if (this.props.keywords != {}){
            let topRel = 0;
            let topKeyword = '';
            for (let k in this.props.keywords){

                if (this.props.keywords[k].relevance > topRel){
                    topRel = this.props.keywords[k].relevance
                    topKeyword = k
                }
            }
            for (let k in this.props.keywords){
                if (k == topKeyword){
                    text = text.replace(k, "<span class='keyword bold'>" + k + "</span>")
                } else {
                    text = text.replace(k, "<span class='keyword'>" + k + "</span>")
                }
            }

        }

        return (
            <h3 className='message-body' dangerouslySetInnerHTML={{__html:text}} />
        )

    }

}