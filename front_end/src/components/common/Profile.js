import React from "react";
import {Link } from "react-router-dom";
import Footer from "./Footer"; //refer to Footer.js
import Header from "./Header";
import NavStock from "../stock/NavStock";
import NavAdmin from "../admin/NavAdmin";
import NavPharmacist from "../pharmacist/NavPharmacist";

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          user_data: [],
          user_count: 0, 
          user_index:0,
          role_data: [],
          role_count: 0,
          message:"", 
          role_index:0,
          isLoaded: false,
          error: null,
          loginData: JSON.parse(localStorage.getItem('loginData'))  
    }
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handlePhone=this.handlePhone.bind(this);
  }
  handlePhone=(event)=>{
    var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    if(event.target.value.match(phoneno))
          {
        event.target.setCustomValidity("");
          }
        else
          {
            event.target.setCustomValidity("Enter Valid Phone Number");
          }
  }

showNav=(rid)=>{
if(rid===1)
{return <NavAdmin/>}
else if(rid===2)
{return <NavStock/>}
else {return <NavPharmacist/>}
}

//--------------------------------------search user----------------------------------------------------------------------------
//------------------------------------------To serach user function----------------------------------------------------------
componentDidMount() {

}

//--------------------------------------update User-------------------------------------------------------------------------------
handleSubmit = (event) => {
    event.preventDefault();
    var data = new FormData(event.target);
    if(data.get('userName')===null){
        data.set('userName',this.state.loginData.userName);
    }
    if(data.get('email')===null){
        data.set('email',this.state.loginData.email);
    }
    console.log(isNaN(data.get('roleId')));
    if(!isNaN(data.get('roleId')))
    {
        console.log(isNaN(data.get('roleId')));
        data.set('roleId',parseInt(this.state.loginData.role.roleId));
    }
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
  fetch('http://localhost:8762/user-managment-service/users/add_user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        .then(res => {if(res.status===200||res.ok)
            {
            this.setState({message:"Profile updated Successfully..."});
          }
          else{
            this.setState({message:"Error while running server..."});
          }              
            })
              .catch(error => {this.setState({message:error.message})});
    };

    render() {
    console.log('horray!!', this.state.loginData);

        return (

<div class="Parent_error_class">
                <Header/>
                {this.showNav(this.state.loginData.role.roleId)}
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
                <h2>PROFILE</h2>
                <br></br><br></br>
                <h2>{this.state.message}</h2>
                <br></br>
                <Link to={{pathname:`/changepassword`}}><a href="#">Change Password</a></Link>
                <br></br><br></br>
                <input type="hidden" id="userId" name="userId" value={this.state.loginData.userId} required></input>
                <label htmlFor="username"><b> Role: </b></label>
             <input type="text" id="roleId" name="roleId" value={this.state.loginData.role.roleName} disabled required  />
               <br/><br/>
                <label htmlFor="username"><b> UserName: </b></label>
             <input type="text" id="userName" name="userName" value={this.state.loginData.userName} disabled required  />
               <br/><br/>
               <label htmlFor="email"><b> Email: </b></label>
             <input type="email" id="email" name="email" value={this.state.loginData.email} disabled required />
             <input type="hidden" id="password" name="password" value={this.state.loginData.password}  required />
               <br/><br/>
               <label htmlFor="address"><b> Address: </b></label>
             <textarea id="address" name="address" required defaultValue={this.state.loginData.address}></textarea>
               <br/><br/><br></br>
               <label htmlFor="phoneNumber"><b> Phone Number: </b> </label>
             <input type="phonenumber" id="contactNo" name="contactNo"  defaultValue={this.state.loginData.contactNo} onChange={this.handlePhone} required/>
              <br/><br/>
    <button type="submit">
                Update</button>
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
export default Profile;












