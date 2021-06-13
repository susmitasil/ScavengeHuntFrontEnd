import React, { Component } from 'react';
import  { Redirect, withRouter  } from 'react-router-dom'
import './User.css'
import axios from 'axios'

class User extends Component {
    constructor(props){
        super(props)
        this.state = {
            username : sessionStorage.getItem('user'),
            role : sessionStorage.getItem('role'),
            details : []

        }
    }
    

    componentDidMount(){
        this.getDetails()
        console.log(this.state.role)
    }

    getDetails = () =>{
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        console.log(this.state)
        axios.post('http://localhost:4000/getDetailsUser', this.state, config)
        .then(res => {
            console.log(res.data.data)
            this.setState({details: res.data.data})
        })
        .catch(err => {
            console.log(err)
        })
    }
  render() {
    return (
        <React.Fragment>
            {/* hi Admin */}

            {/* {JSON.stringify(this.state.details)} */}
            <div className="row user-card ">
                    <div className="col-md-1"></div>
                    <div className="col-10">
                        <div className="card card-full">
                            <div className="card-body col-12">
                                <h5 className="card-title text-center p-4 m-3 branch text-capitalize">Welcome {this.state.username}!</h5>
                                {this.state.details.length>0 && 
                                <div className="row mx-5">
                                    {/* hi */}
                                    <div className="col-6 font-color">
                                        <div className="col-12"> Institute : {this.state.details[0].institute}</div>
                                        <div className="col-12"> Branch Incharge : {this.state.details[0].branch_incharge}</div>
                                        <div className="col-12"> City : {this.state.details[0].city}</div>
                                        
                                    </div>
                                    <div className="col-6 font-color">
                                        <div className="col-12"> Branch Name : {this.state.details[0].branch_name}</div>
                                        <div className="col-12"> Contact : {this.state.details[0].contact.join(", ")  }</div>
                                        <div className="col-12"> Address : {this.state.details[0].address}</div>
                                        
                                    </div>
                                    <div className="col-12 font-color"> Pin : {this.state.details[0].pin_covered.join(", ")}</div>
                                </div>
                                }
                                
                                {/* {this.state.userExists === false && <div className="col-12 text-danger">User Not Found. Try to login with different credentials.</div>} */}
                            </div>

                        </div>
                    </div>
                    <div className="col-md-1"></div>
                </div>


        </React.Fragment>
    //   <div> textInComponent </div>
    );
  }
}

export default User