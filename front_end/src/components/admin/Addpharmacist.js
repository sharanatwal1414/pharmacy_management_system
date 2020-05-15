import React from "react";
import Footer from "../common/Footer"; //refer to Footer.js
import Header from "../common/Header";
import NavAdmin from "./NavAdmin";
import { isValidPhoneNumber } from 'react-phone-number-input';
import {Link } from "react-router-dom";

class Addpharmacist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          roles_data: [], 
          FormData:[],
          message:"",
          roles_index: 0, 
          roles_count: 0, 
          isLoaded: false,
          error: null    
    }
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleReset=this.handleReset.bind(this);
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
handleReset=(event)=>{
  this.setState({ 
    message:"",
    })
}
//--------------------------------------------Show role------------------------------------------------------------------------
showRoles=()=>{
  fetch('http://localhost:8762/user-managment-service/roles/get_roles')
  .then(
      (response)=> {
          if (response.ok)
          {
              response.json().then(json_response => {
                  console.log(json_response)
                  this.setState({
                    roles_data:json_response,
                    roles_count:json_response.length,
                    roles_index:0,
                       isLoaded : true,
                       message:"",
                       error : null
                   })
               })
          }
          else
          {
              response.json().then(json_response => {
                   this.setState({
                       isLoaded: false,
                       error:json_response,
                       roles_data: {},
                       message:"Loading....",
                       roles_count:0,
                       roles_index:0,
                   });
               })
           }
       },
       (error) => {
           this.setState({
               isLoaded: false,
               error: {message:"AJAX error, URL wrong or unreachable, see console"}, // save the AJAX error in state for display below
               roles_data: {},
               message:error.message,
               roles_count:0,
               roles_index:0,
           });
       })
}
//------------------------------------------To call showsrole function----------------------------------------------------------
componentDidMount() {
  this.showRoles();
}

//--------------------------------------Add user-------------------------------------------------------------------------------
handleSubmit = (event) => {
  event.preventDefault();
  var data = new FormData(event.target);
  const formData={
    userName:data.get('userName'),
    email:data.get('email'),
    address:data.get('address'),
    password:data.get('password'),
    contactNo:data.get('contactNo'),
    roleId:parseInt(data.get('roleId'),10)
  };
  console.log(formData);
  fetch('http://localhost:8762/user-managment-service/users/add_user', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          })
          .then(res => {if(res.status===200)
          {
          this.setState({message:"User added Successfully..."});
        }
        else{
          this.setState({message:"Error while running server..."});
        }              
          })
            .catch(error => {this.setState({message:error.message})});
        };
        
    render() {
      const options=[];
      const h2=[];
      const select=[];
      if(this.state.error){
        h2.push(<h2>{this.state.message}</h2>);
    }
    else if(this.state.roles_count===0)
    {
        h2.push(<h2>{this.state.message}</h2>);
    
    }
    else if(this.state.roles_count!==0)
    {    
      for(let i=0;i<this.state.roles_count;i++)
      {
          options.push(
          <option value={this.state.roles_data[i].roleId} key={i}>{this.state.roles_data[i].roleName}</option>
          )
      }
      select.push(<select className="input" id="roleId" name="roleId">{options}</select>);
    }
 
    else{
        h2.push(<h2>{this.state.message}</h2>);
    }
      
        return (

<div class="Parent_error_class">
                <Header/>
                <NavAdmin/>
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
                <h2>ADD USER</h2>
                <br></br>
                <br></br>
                <h2>{this.state.message}</h2>
              <br></br>
              <label htmlFor="roles"><b>Roles : </b></label>
                {select}
                {h2}
                <br/><br/>
           <label htmlFor="username"><b> UserName: </b></label>
             <input type="text" id="userName" name="userName" placeholder="Username" required  />
               <br/><br/>
               <label htmlFor="email"><b> Email: </b></label>
             <input type="email" id="email" name="email" placeholder="Email" required />
               <br/><br/>
               <label htmlFor="password"><b> Password: </b></label>
             <input type="password" id="password" name="password" placeholder="Password" required />
               <br/><br/>
               <label htmlFor="address"><b> Address: </b></label>
             <textarea id="address" name="address" required placeholder="Address"></textarea>
               <br/><br/><br></br>
               <label htmlFor="phoneNumber"><b> Phone Number: </b> </label>
             <input type="phonenumber" id="contactNo" name="contactNo"  placeholder="Phone Number" onChange={this.handlePhone} required/>
              <br/><br/>
                <button type="submit">Add</button>
                <button type="reset" onClick={this.handleReset} >Reset</button>
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
export default Addpharmacist;












