import React from "react";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import NavStock from "../stock/NavStock";
import {Link } from "react-router-dom";
import NavAdmin from "../admin/NavAdmin";
import NavPharmacist from "../pharmacist/NavPharmacist";
// import { Button } from 'react-native';
// import { Form, TextValidator } from 'react-native-validator-form';
class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_data: [],
            user_count: 0, 
            user_index:0,
            isLoaded: false,
            message:"",
            error: null    
      }
      this.handleSubmit=this.handleSubmit.bind(this);
    }

    
//--------------------------------------update User-------------------------------------------------------------------------------
//--------------------------------------update User-------------------------------------------------------------------------------
handleSubmit = (event) => {
    event.preventDefault();
    var data = new FormData(event.target);
    
    const formData={ 
        userId:parseInt(data.get('userId')),
        userName:data.get('userName'),
        email:data.get('email'),
        contactNo:data.get('contactNo'),
        address:data.get('address'),
        password:data.get('password'),
        roleId:parseInt(data.get('roleId'))
    }
    console.log(formData);
    if(data.get('password')===data.get('confirmPassword')){
  fetch('http://localhost:8762/user-managment-service/users/add_user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        .then(res => {if(res.status===200||res.ok)
            {
            this.setState({message:"Password Changed Successfully..."});
          }
          else{
            this.setState({message:"Error while running server..."});
          }              
            })
              .catch(error => {this.setState({message:error.message})});
        }
        else{
            this.setState({message:"Password doesn't match..."});
        }
    };
//------------------------------------------ user function----------------------------------------------------------
showNav=(rid)=>{
    if(rid===1)
    {return <NavAdmin/>}
    else if(rid===2)
    {return <NavStock/>}
    else {return <NavPharmacist/>}
    }
render() {
    const loginData = JSON.parse(localStorage.getItem('loginData'));
    return (

        <div class="Parent_error_class">
        <Header/>
        {this.showNav(loginData.role.roleId)}
    <div className="application">
                <link rel="stylesheet" type="text/css" href="vendor/bootstrap/css/bootstrap.min.css" />
                <link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css" />
                <link rel="stylesheet" type="text/css" href="vendor/animate/animate.css" />
                <link rel="stylesheet" type="text/css" href="vendor/select2/select2.min.css" />
                <link rel="stylesheet" type="text/css" href="vendor/perfect-scrollbar/perfect-scrollbar.css" />
                <link rel="stylesheet" type="text/css" href="css/util.css" />
                <link rel="stylesheet" type="text/css" href="css/main.css" />
    </div>
    <div class="limiter">
        <br></br><br></br><br></br><br></br>
    <div class="container-table100">
                <div class="wrap-table100">
            <div class="table100 ver2 m-b-110">                
    <form className="form-group" onSubmit={this.handleSubmit} style={{ margin: "auto", maxWidth: "500px" }}>
        <br></br><br></br>
        <h2>Change Password</h2>
          <br></br>
          <h2>{this.state.message}</h2><br></br>
          <input type="hidden" id="userId" name="userId" value={loginData.userId} required></input>
          <input type="hidden" id="roleId" name="roleId" value={loginData.role.roleId} required  />
          <input type="hidden" id="userName" name="userName" value={loginData.userName} required  />
          <input type="hidden" id="email" name="email" value={loginData.email} required />
          <textarea hidden id="address" name="address" required defaultValue={loginData.address}></textarea>
          <input type="hidden" id="contactNo" name="contactNo"  defaultValue={loginData.contactNo} required/>
           <label><b>Password: </b></label>
            <input type="password" placeholder="Password" id="password" name="password" required/>
           <br/><br/>
           <label><b>
           Confirm Password: </b></label>
            <input type="password" placeholder="Confirm Password" id="confirmPassword" name="confirmPassword" required/>
           <br/><br/>
            <button type="submit">
                Change Password</button>
                <Link to="/profile"><button type="cancel">Cancel</button></Link>
            </form>
            <br></br><br></br><br></br><br></br>
            </div>
            </div>
            </div>
            </div>
            <script src="vendor/jquery/jquery-3.2.1.min.js"></script>
                <script src="vendor/bootstrap/js/popper.js"></script>
                <script src="vendor/bootstrap/js/bootstrap.min.js"></script>
                <script src="vendor/select2/select2.min.js"></script>
                <script src="vendor/perfect-scrollbar/perfect-scrollbar.min.js"></script>
                <script src="js/main.js"></script>
                <Footer/>
            </div>
    );
}
}

export default ChangePassword;












