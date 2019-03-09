import React from 'react';

import classes from './Person.css';

const person = (props) => {
    return (
        <div className={classes.Person}>
            <p onClick={props.click}>This is a Person Component: This person is called {props.name}, and they own a {props.pet}.</p> {/* can also mess around with this: {Math.round(Math.random()*10)} is {Math.round(Math.random()*100)} years old*/}
            <p>Description of Pet: {props.children}</p>
            <input type="input" onChange={props.changed} value={props.name} />
        </div>
    )
};

export default person;