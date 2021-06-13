import React, { Component } from 'react';
import  { Redirect, withRouter  } from 'react-router-dom'
// import './Login.css'
import axios from 'axios'

class User extends Component {
    constructor(props){
        super(props)
        this.state = {
            formValue : {username : '', password : ''},
            formErrorMessage : {username : '', password : ''},
            formOptionValid : {username : false, password : false},
            formValid : false,
            username : sessionStorage.getItem('user'),
            role : sessionStorage.getItem('role')
        }
    }
    

    componentDidMount(){
        console.log(this.state.role)
    }

    handleSubmit = (e) =>{
        console.log(this.props.history)
        e.preventDefault()
        if(this.state.formValue.username === 'Admin' && this.state.formValue.password === '12345'){
            this.props.history.push('/home');
        }
        else{
            this.props.history.push('/');
        }
    }

    handleChange = (e)=>{
        let formValueObj = this.state.formValue
        let formOptionValidObj = this.state.formOptionValid
        switch(e.target.id){
            case 'username':
                formValueObj.username = e.target.value
                formOptionValidObj.username = true
                this.setState({formValue : formValueObj})
                this.setState({formOptionValid : formOptionValidObj})
                break;
            case 'password':
                formValueObj.password = e.target.value
                formOptionValidObj.password = true
                this.setState({formValue : formValueObj})
                this.setState({formOptionValid : formOptionValidObj})
                break;
        }
        if(this.state.formOptionValid.username === true && this.state.formOptionValid.password === true){
            this.setState({formValid : !this.state.formValid})
        }
    }
  render() {
    return (
        <React.Fragment>
            hi User
        </React.Fragment>
    //   <div> textInComponent </div>
    );
  }
}

export default User