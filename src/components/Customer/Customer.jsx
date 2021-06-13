import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom'
import './Customer.css'
import axios from 'axios'

class Customer extends Component {
    state = {
        formValue: { phone: '', pin: '' },
        formErrorMessage: { phone: '', pin: '' },
        formOptionValid: { phone: false, pin: false },
        formValid: false,
        detailExists: null,
        detailMessage: '',
        details: []
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
        axios.post('http://localhost:4000/getDetailsCust', this.state.formValue, config)
            .then(res => {
                console.log(res)
                // console.log(res.data.data.length)
                if (res.data.data.length > 0) {
                    this.setState({ detailExists: true })
                    this.setState({ detailMessage: res.data.message })
                    this.setState({ details: res.data.data })
                }
                else {
                    this.setState({ detailExists: false })
                    this.setState({ detailMessage: res.data.message })
                }
            })
            .catch(err => {
                console.log(err)
            })
        // if (this.state.formValue.phone === 'Admin' && this.state.formValue.pin === '12345') {
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
            case 'phone':
                formValueObj.phone = e.target.value
                formOptionValidObj.phone = true
                this.setState({ formValue: formValueObj })
                this.setState({ formOptionValid: formOptionValidObj })
                break;
            case 'pin':
                formValueObj.pin = e.target.value
                formOptionValidObj.pin = true
                this.setState({ formValue: formValueObj })
                this.setState({ formOptionValid: formOptionValidObj })
                break;
        }
        if (this.state.formOptionValid.phone === true && this.state.formOptionValid.pin === true) {
            this.setState({ formValid: true })
        }
        else {
            this.setState({ formValid: false })
        }
    }
    render() {
        return (
            <React.Fragment>
                <div className="row customer-card mt-4">
                    <div className="col-md-1"></div>
                    <div className="col col-md-10">
                        <div className="card card-full">
                            <div className="card-body">
                                <h5 className="card-tile text-center search mb-3">Enter Details to Search</h5>
                                <form onSubmit={this.handleSubmit} className="row">
                                    <div className="form-group text-left col-4">
                                        <label htmlFor="phone" className="font-weight-bold font-color" style={{ textAlign: 'left' }}>Phone
                                            <input type="text" name="phone" id="phone" className="form-control col-12 opaque mt-1" placeholder="e.g., 981234XXXX" aria-describedby="phoneHelp" onChange={this.handleChange} />
                                        </label>
                                        {/* <small id="phoneHelp" className="text-muted">phone : Admin</small> */}
                                    </div>
                                    <div className="form-group text-left col-4">
                                        <label htmlFor="pin" className="font-weight-bold font-color left " style={{ textAlign: 'left' }}>Pin
                                            <input type="pin" className="form-control col-12 opaque mt-1" name="pin" id="pin" placeholder="e.g., 7001XX" aria-describedby="pinHelp" onChange={this.handleChange} />
                                        </label>
                                        {/* <small id="pinHelp" className="text-muted">pin : 12345</small> */}
                                    </div>
                                    <div className="form-group center col-4">
                                        {/* <div className="row-4" > </div> */}
                                        <button type="submit" className="btn btn-block btn-primary mt-4" disabled={!this.state.formValid}>Search </button>
                                        {/* <div className="row-2"> </div> */}
                                    </div>
                                </form>
                                {this.state.detailExists === false && 
                                <div className="col-12 font-color mt-4">{this.state.detailMessage}</div>}
                                {/* {this.state.detailExists === true && 
                                <div className="col-12 text-danger">User Not Found. Try to login with different credentials.</div>} */}
                                {this.state.detailExists === true && 
                                <div className="table-responsive mt-2">
                                    <table className="table table-dark table-striped text-left">
                                        <thead className="thead-dark">
                                            <tr className="">
                                                <th>Sl No.</th>
                                                <th>Institute</th>
                                                <th>Branch Name</th>
                                                <th>Branch Incharge</th>
                                                <th>City</th>
                                                <th>Address</th>
                                                <th>Contact</th>
                                                <th>Pin Covered</th>
                                                {/* <th>UserName</th> */}
                                            </tr>
                                        </thead>
                                        <tbody >
                                            {this.state.details.map((item, indx) => {
                                                return (

                                                    <tr key={indx} className="left-align" >
                                                        <td>{indx + 1}</td>
                                                        <td>{item.institute}</td>
                                                        <td>{item.branch_name}</td>
                                                        <td>{item.branch_incharge}</td>
                                                        <td>{item.city}</td>
                                                        <td>{item.address}</td>
                                                        <td>{item.contact.join(", ")}</td>
                                                        <td >{item.pin_covered.join(", ")}</td>
                                                    </tr>

                                                )
                                            })}
                                        </tbody>

                                    </table>
                                </div>}
                            </div>



                        </div>
                    </div>
                </div>
                <div className="col-md-1"></div>

            </React.Fragment>
            //   <div> textInComponent </div>
        );
    }
}

export default Customer