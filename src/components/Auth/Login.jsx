import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom'
import './Login.css'
import axios from 'axios'

class Login extends Component {
    state = {
        formValue: { username: '', password: '' },
        formErrorMessage: { username: '', password: '' },
        formOptionValid: { username: false, password: false },
        formValid: false,
        userExists: null
    }

    handleSubmit = (e) => {
        console.log(this.props.history)
        e.preventDefault()
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        console.log(this.state.formValue)
        axios.post('http://localhost:4000/auth', this.state.formValue, config)
            .then(res => {
                console.log(res)
                // console.log(res.data.data.length)
                if (res.data.data.length > 0) {
                    sessionStorage.setItem('user', res.data.data[0].username)
                    sessionStorage.setItem('role', res.data.data[0].role)
                    this.props.history.push('/home');
                }
                else {
                    this.setState({ userExists: false })
                }
            })
            .catch(err => {
                console.log(err)
            })
        // if (this.state.formValue.username === 'Admin' && this.state.formValue.password === '12345') {
        //     this.props.history.push('/home');
        // }
        // else {
        //     this.props.history.push('/');
        // }
    }

    handleChange = (e) => {
        let formValueObj = this.state.formValue
        let formOptionValidObj = this.state.formOptionValid
        switch (e.target.id) {
            case 'username':
                formValueObj.username = e.target.value
                formOptionValidObj.username = true
                this.setState({ formValue: formValueObj })
                this.setState({ formOptionValid: formOptionValidObj })
                break;
            case 'password':
                formValueObj.password = e.target.value
                formOptionValidObj.password = true
                this.setState({ formValue: formValueObj })
                this.setState({ formOptionValid: formOptionValidObj })
                break;
        }
        if (this.state.formOptionValid.username === true && this.state.formOptionValid.password === true) {
            this.setState({ formValid: true })
        }
        else {
            this.setState({ formValid: false })
        }
    }
    render() {
        return (
            <React.Fragment>
                <div className="row login-card">
                    <div className="col-md-4"></div>
                    <div className="col col-md-4">
                        <div className="card card-full">
                            <div className="card-body">
                                <h4 className="card-tile text-center">Scavengers....<br /> Are you ready to <br />Hunt!!!!</h4>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group text-left row">
                                        <label htmlFor="username" className="font-weight-bold font-color" style={{ textAlign: 'left' }}>Username
                                            <input type="text" name="username" id="username" className="form-control col-12 opaque" placeholder="e.g., susmita" aria-describedby="usernameHelp" onChange={this.handleChange} />
                                        </label>
                                        {/* <small id="usernameHelp" className="text-muted">Username : Admin</small> */}
                                    </div>
                                    <div className="form-group text-left row mt-3">
                                        <label htmlFor="password" className="font-weight-bold font-color left " style={{ textAlign: 'left' }}>Password
                                            <input type="password" className="form-control col-12 opaque" name="password" id="password" placeholder="e.g., password" aria-describedby="passwordHelp" onChange={this.handleChange} />
                                        </label>
                                        {/* <small id="passwordHelp" className="text-muted">Password : 12345</small> */}
                                    </div>
                                    <div className="form-group center row m-4">
                                        <div className="col-md-4" > </div>
                                        <button type="submit" className="btn btn-block btn-primary col-md-4" disabled={!this.state.formValid}>Login </button>
                                        <div className="col-md-4"> </div>
                                    </div>
                                </form>
                                {this.state.userExists === false && <div className="col-12 text-danger">User Not Found. Try to login with different credentials.</div>}
                            </div>

                            

                        </div>
                    </div>
                </div>
                <div className="col-md-4"></div>

            </React.Fragment>
            //   <div> textInComponent </div>
        );
    }
}

export default withRouter(Login)