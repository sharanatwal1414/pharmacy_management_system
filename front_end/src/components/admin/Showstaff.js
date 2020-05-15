import React from "react";
//import pharmacist from './public/pharmacist.jpg';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Helmet } from "react-helmet";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import 'font-awesome/css/font-awesome.min.css';
import {Link } from "react-router-dom";

class Showstaff extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            customer_data: [], 
            customer_index: 0, 
            customer_count: 0,
            message:"", 
            isLoaded: false, 
            error: null,
            open:false,
            user:0
        };
    }

    setOpen=(bool)=>{
        this.setState({open:bool});
    }
    handleClickOpen = (user_id) => {
        this.setState({user:user_id});
        this.setOpen(true);
      };
    
    handleYesClose = () => {
        this.delete(this.state.user);
        this.setOpen(false);
        this.setState({user:0});
        window.location.reload();
      };
      handleNoClose = () => {
        this.setOpen(false);
        this.setState({user:0});
      };
    
//----------------------------------------------Show all Customer------------------------------------------------------------------- 
showCustomer = () => {
        fetch('http://localhost:8762/user-managment-service/users/get_users').then(
            response => {
                if (response.ok) {     
                    response.json().then(json_response => {
                        console.log(json_response);
                        if(json_response.length===0)
                        {
                            this.setState({
                                customer_data: json_response,
                                customer_count: json_response.length, 
                                customer_index: 0, 
                                message:"No Data Found",
                                isLoaded: true, 
                                error: null 
                            });
                        }
                        else{
                            this.setState({
                                customer_data: json_response,
                                customer_count: json_response.length, 
                                customer_index: 0, 
                                message:"",
                                isLoaded: true, 
                                error: null 
                            });
                    }
                    });
                } 
                else {
                    response.json().then(json_response => {
                        this.setState({
                            isLoaded: false,
                            error: json_response, 
                            customer_data: {},
                            message:"Loading...",
                            customer_count: 0,
                            customer_index: 0
                        });
                    });
                }
            },

            error => {
              
                this.setState({
                    isLoaded: false,
                    error: {
                        message:
                            "AJAX error, URL wrong or unreachable, see console"
                    }, 
                    message:error.message,
                    customer_data: {}, 
                    customer_count: 0,
                    customer_index: 0
                });
            }
        );
    }			
//--------------------------------------search supplier----------------------------------------------------------------------------
searchUser = (name) => {
    fetch('http://localhost:8762/user-managment-service/users/search_users?userName='+name,{
        method: "GET"
    }).then(
        response => {
            if (response.ok) {     
                response.json().then(json_response => {
                    console.log(json_response);
                    if(json_response.length===0){
                    this.setState({
                        customer_data: json_response,
                        customer_count: json_response.length, 
                        customer_index: 0, 
                        message:"No Data Found",
                        isLoaded: true, 
                        error: null 
                    });
                    }
                    else{
                        this.setState({
                            customer_data: json_response,
                            customer_count: json_response.length, 
                            customer_index: 0, 
                            message:"",
                            isLoaded: true, 
                            error: null 
                        });
                    }
                   
                });
            } 
            else {
                response.json().then(json_response => {
                    this.setState({
                        isLoaded: false,
                        error: json_response,
                        message:"Loading...", 
                        customer_data: {}, 
                        customer_count: 0,
                        customer_index: 0
                    });
                });
            }
        },

        error => {
          
            this.setState({
                isLoaded: false,
                error: {
                    message:
                        "AJAX error, URL wrong or unreachable, see console"
                }, 
                customer_data: {}, 
                message:error.message,
                customer_count: 0,
                customer_index: 0
            });
        }
    );
}

//--------------TO DELETE A PRODUCT------------------------------------------
delete=(id)=>{
    fetch("http://localhost:8762/user-managment-service/users/delete_user/" + id, {
        method: "DELETE"
    }).then(res=>{
        if(res.status===200)
        {
            this.setState({message:"User Deleted"})
        }
        else{
            this.setState({message:"User Not Deleted"})
        }
    })
        .catch(error => {this.setState({updatemessage:error.message})});
}
//------------------------------------------------------------CALL SHOW Customer---------------------------------------------------------------------
    componentDidMount(){
        this.showCustomer();
    }
//----------------------------------------------------------------DELETE----------------------------------------------------------------
    render() {
        const rows=[];
        const h2=[];
        if(this.state.error){
            h2.push(<h2>{this.state.message}</h2>);
        }
        else if(this.state.customer_count===0)
        {
            h2.push(<h2>{this.state.message}</h2>);
        
        }
        else if(this.state.customers_count!==0)
        {    
            for(let i=0;i<this.state. customer_count;i++)
            {
                rows.push(
                    <tr key={this.state. customer_data[i].userId} align="start">
                    <td className="cell100 column1"  >{this.state. customer_data[i].userId}</td>
                    <td className="cell100 column2" id="pName" >{this.state. customer_data[i].userName}</td>
                    <td className="cell100 column3" ><i className="fa fa-trash" aria-hidden="true" onClick={()=>this.handleClickOpen(this.state. customer_data[i].userId)}  style={{padding:"10px"}}></i>
                    <Link to={{pathname:`/pharmacistprofile/${this.state.customer_data[i].userId}`}}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></Link></td>                        {/* document.getElementById("pName").innerHTML */}
                </tr>
                )
            }
        }
      
        else{
            h2.push(<h2>{this.state.message}</h2>);
        }
              
        return (
            <div className="Parent_error_class">
                <div className="application">
                    <div>
                        <Helmet>
                            <title>Product List</title>
                            <meta charset="UTF-8" />
                            <meta name="viewport" content="width=device-width, initial-scale=1" />
                            <link rel="icon" type="image/png" href='/public/images/icons/favicon.ico' />
                            <link rel="stylesheet" type="text/css" href="vendor/bootstrap/css/bootstrap.min.css" />
                            <link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css" />
                            <link rel="stylesheet" type="text/css" href="vendor/animate/animate.css" />
                            <link rel="stylesheet" type="text/css" href="vendor/select2/select2.min.css" />
                            <link rel="stylesheet" type="text/css" href="vendor/perfect-scrollbar/perfect-scrollbar.css" />
                            <link rel="stylesheet" type="text/css" href="css/util.css" />
                            <link rel="stylesheet" type="text/css" href="css/main.css" />
                        </Helmet>
                    </div>
                </div>
{/*--------------------------search User--------------------------   */}
<br></br><br></br><br></br>
                <h2>Staff Members</h2>
                <br></br><br></br>
                <form className="example" action="#" style={{ margin: "auto", maxWidth: "500px" }} >
                <input type="text" id="searchcustomer" placeholder="Search Staff" name="search" />
                    <button type="button" onClick={() => this.searchUser(document.getElementById("searchcustomer").value)}>
                        <i className="fa fa-search" ></i>
                    </button>
                </form>
                <h2>{h2}</h2>
                <br></br><br></br>
                <div className="limiter">
                    <div className="container-table100">
                        <div className="wrap-table100">

                            <div className="table100 ver2 m-b-110">
                                <div className="table100-head">
                                    <table>
                                        <thead>
                                            <tr className="row100 head">
                                                <th className="cell100 column1" >User Id</th>
                                                <th className="cell100 column2">User Name</th>
                                                <th className="cell100 column4">Action</th>
                                            </tr>
                                        </thead>
                                    </table>
                                    <Dialog open={this.state.open} onClose={this.handleNoClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Delete User</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Do you want to delete this User?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={this.handleYesClose} color="primary">
        Yes
      </Button>
      <Button onClick={this.handleNoClose} color="primary" autoFocus>
        No
      </Button>
    </DialogActions>
  </Dialog>
                                </div>

                                <div className="table100-body js-pscroll">
                                    <table>
                                        <tbody>
                                            {rows}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <Link to="/adduser"><button class="btn2 placeorder" >Add User</button></Link>
                        </div>
                    </div>
                </div>

                <script src="vendor/jquery/jquery-3.2.1.min.js"></script>
                <script src="vendor/bootstrap/js/popper.js"></script>
                <script src="vendor/bootstrap/js/bootstrap.min.js"></script>
                <script src="vendor/select2/select2.min.js"></script>
                <script src="vendor/perfect-scrollbar/perfect-scrollbar.min.js"></script>
                <script src="js/main.js"></script>

            </div>

        );
            
        
    }
}

    
export default Showstaff;












