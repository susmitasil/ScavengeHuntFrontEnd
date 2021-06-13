import React, { Component } from 'react';
import  { Redirect, withRouter  } from 'react-router-dom'
import './Admin.css'
import axios from 'axios'

class Admin extends Component {
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
        axios.get('http://localhost:4000/getbranchDetails')
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
            <div className="row admin-card ">
                    <div className="col-md-1"></div>
                    <div className="col-10">
                        <div className="card card-full">
                            <div className="card-body col-12">
                                <h5 className="card-title text-center p-4 m-3 branch">Branch Details</h5>
                                <div className="table-responsive">
                                <table className="table table-striped table-dark text-left">
                                    <thead>
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
                                    {this.state.details.map((item,indx)=>{
                                        return(
                                        
                                            <tr key={indx} className="left-align" >
                                        <td>{indx+1}</td>
                                        <td>{item.institute}</td>
                                        <td>{item.branch_name}</td>
                                        <td>{item.branch_incharge}</td>
                                        <td>{item.city}</td>
                                        <td>{item.address}</td>
                                        <td>{item.contact.join(", ")  }</td>
                                        <td >{item.pin_covered.join(", ")}</td>
                                        </tr>
                                    
                                        )
                                    })}
                                    </tbody>
                                    
                                </table>
                                </div>
                                {this.state.userExists === false && <div className="col-12 text-danger">User Not Found. Try to login with different credentials.</div>}
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

export default Admin