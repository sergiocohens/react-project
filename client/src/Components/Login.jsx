import React from 'react';
import axios from 'axios'
// import { BrowserRouter, Link , Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

import Profile from './Profile'
// import { runInThisContext } from 'vm';


class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email: "",
            exist: false,
            id: null,
            button: null,
        }
    }



    
    handleSubmit = (event) => {
        event.preventDefault()
    }

    handleEmailInput = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleLogin = async () => {
        const { email, exist, id, button } = this.state
        console.log(email)
        let getAllUsers = "http://localhost:3001/users/"

        try {
            const response = await axios.get(getAllUsers)
            console.log(response.data.body)
            let responseData = response.data.body
            for (let i = 0; i < responseData.length; i++) {
                if (email.toUpperCase() === responseData[i].email.toUpperCase()) {
                    return this.setState({
                        exist: true,
                        id: responseData[i].id,
                        button: "login"
                    })
                } else this.setState({
                    exist: false,
                    button: "login"
                })
                //
            }
        } catch (error) {
            console.log("Error", error)
        }
    }




    handleRegister = async (event) => {
        const { email, exist, id, button } = this.state
        let getAllUsers = "http://localhost:3001/users/"
        
        try {
            const response = await axios.get(getAllUsers)
      
            let responseData = response.data.body
            for (let i = 0; i < responseData.length; i++) {
                if (email.toUpperCase() === responseData[i].email.toUpperCase()) {
                    return this.setState({
                        exist: true,
                        // id: responseData[i].id,
                        button: "register"
                    })
                } else this.setState({
                    exist: false,
                    button: "register"
                })
            }

            if(exist === false){
                let addNewUser = "http://localhost:3001/users/"
                try {
                    const postNewUser = await axios.post(addNewUser, {email: email})
                    const updatedUsers = await axios.get(getAllUsers)
                    const  updatedUsersData = updatedUsers.data.body
                    console.log(updatedUsersData)
                    for (let i = 0; i < updatedUsersData.length; i++) {
                        
                        if (email.toUpperCase() === updatedUsersData[i].email.toUpperCase()) {
                           this.setState({
                                id: updatedUsersData[i].id
                            })
                        }
                    }
                } catch (error) {
                    console.log("Error", error)
                }
            }


            
        } catch (error) {
            console.log("Error", error)
        }

    }

    render() {
        const { email, exist, id, button } = this.state
        console.log(this.state)

        if (button === null) {
            return (
                
                <div className="App">
                    <form onSubmit={this.handleSubmit}>
                        <input className= "loginInput" onChange={this.handleEmailInput} type="text" />
                        <button clasName = "loginLogin" onClick={this.handleLogin}>Login</button>
                        <button className= "loginRegister" onClick = {this.handleRegister}>Register</button>
                    </form>
                </div>
            );
        } else if (button === "login" ) {
            if(exist === true){
                return (
                    <div className="App">
                        <Redirect to= '/feed'/>
                    </div>
                );
            }else{
                return (
                    <div className="App">
                        <form onSubmit={this.handleSubmit}>
                                <input className= "loginInput" onChange={this.handleEmailInput} type="text" />
                                <button clasName = "loginLogin" onClick={this.handleLogin}>Login</button>
                                <button className= "loginRegister"  onClick = {this.handleRegister}>Register</button>
                            </form>
                        <p>Email Does Not Exist. Try again.</p>
                    </div>
                );
            }
    } else if(button === "register") {

        if(exist === true){
            return (
                <div className="App">
                    <form onSubmit={this.handleSubmit}>
                            <input className= "loginInput" onChange={this.handleEmailInput} type="text" />
                            <button clasName = "loginLogin" onClick={this.handleLogin}>Login</button>
                            <button className= "loginRegister"  onClick = {this.handleRegister}>Register</button>
                        </form>
                    <p>Email is Already Registered. </p>
                </div>
            );
        }else{
            return (
                <div className="App">
                    <Redirect to= '/profile'/>
                </div>
            );
        }
} else {
    return (
        <div>
            <p>Error</p>
        </div>
    )
}
    }
}
export default Login;


