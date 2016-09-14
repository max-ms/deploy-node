import React from 'react'
import ReactDOM from 'react-dom'
import TweetsApp from './components/TweetsApp'

const initialState = JSON.parse(document.getElementById('initial-state').innerHTML);

ReactDOM.render(
    <TweetsApp state={initialState}/>,
    document.getElementById('app')
)