import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';

class App extends Component {
    state = {
        persons: [ //this is an array we are declaring inside state.
            {id: '1', name: 'Cole', pet: 'Pug'},
            {id: '2', name: 'Summer', pet: 'Holly'},
            {id: '3', name: 'Reidy', pet: 'italian woG'}
        ]
    }

    mainButtonHander = (newName) => {
        //alert("Thank you for clicking me sir.");
        this.setState( {
            persons: [
                {name: 'Cole', pet: 'Goldfish'},
                {name: 'Summer', pet: 'Big Momma'},
                {name: newName, pet: 'miloaf'}
            ],
            secondState: 'This is a second state (I have no idea why this is defined!)',
            showPersons: false 
        } )
    }

    nameChangeHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(p => {
            return p.id === id;
        });

        const person = {
            ...this.state.persons[personIndex]
        };
        
        person.name = event.target.value;
        
        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState({persons: persons})

        //old way of doing it before dynamic updating in the render():

        // this.setState({
        //     persons: [
        //         {name: 'Cole', pet: 'Pug'},
        //         {name: event.target.value, pet: 'Holly'},
        //         {name: 'Reidy', pet: 'italian woG'}
        //     ]
        // })
    }

    togglePersonsVisibleHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({showPersons: !doesShow}); //just toggling true/false on showPersons boolean in state.
    }

    deletePersonHandler = (index) => {
        //const persons = this.state.persons.slice();
        const persons = [...this.state.persons]; //this works exact same as above line but is the most modern ES6 way of doing things.
        persons.splice(index, 1) //just removes the single array element at index value passed in
        this.setState({persons: persons})
    }

    render() {
        const style = {
            backgroundColor: 'grey',
            color: 'white',
            font: 'inherit',
            width: '200px',
            cursor: 'pointer', 
            border: '1px solid black',
            padding: '8px'
        };

        let persons = null;
        
        if (this.state.showPersons) {
            persons = (
                <div>
                    {this.state.persons.map((person, index) => {
                        return <Person 
                            name={person.name}
                            pet={person.pet}
                            click={() => this.deletePersonHandler(index)}
                            key={person.id}
                            changed={(event) => this.nameChangeHandler(event, person.id)}/>
                    })}

                    {/* This is the old way of listing each individual Person component, and then the contents of persons array above gets rendered to each one. Now, instead
                    we are just mapping each value in the array of our personal data for each Person above using .map() to each <Person> component as you see in the line above. */}
                    {/* <Person 
                        name={this.state.persons[0].name} 
                        pet={this.state.persons[0].pet} />
                    <Person
                        name={this.state.persons[1].name} 
                        pet={this.state.persons[1].pet}
                        click={this.mainButtonHander.bind(this, "yeeeet")}
                        changed={this.nameChangeHandler}>Holly is a BIG girl</Person> {/*see how we pass this plain text in to person and how we use it within the person component }
                    <Person 
                        name={this.state.persons[2].name} 
                        pet={this.state.persons[2].pet} 
                        click={this.mainButtonHander.bind(this, 'Uncle Pete')}>pleasa some fooda</Person>

                    {/*
                    This is the layout we used before using state:
                    <Person name="Cole" pet="Pug" />
                    <Person name="Summer" pet="Holly">Holly is a BIG girl</Person> {see how we pass this plain text in to person and how we use it within the person component }
                    <Person name="Reidy" pet="italian dog" /> 
                    */}
                </div>
            );
            
            style.backgroundColor = 'black';
        }

        const assignedClasses = [];
        if (this.state.persons.length < 3) {
            assignedClasses.push(classes.red)
        }
        if (this.state.persons.length < 2) {
            assignedClasses.push(classes.bold) //so basically we are legit just adding values to this class which are going to be id's of CSS effects we want to add onto the button.
        }

        return (
            <div className={classes.App}>
                <h1>Sup lads</h1>
                <p className={assignedClasses.join(' ')}> {/*this is just converting the array of [red, bold] to a single string "red bold" */}
                    its ya boy cole here
                </p>
                <button
                    className={style}
                    onClick={this.togglePersonsVisibleHandler}
                    style={style}>Click me!
                </button>
                {persons}
            </div>
        );
    }
}

export default App;