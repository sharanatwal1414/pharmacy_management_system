import React from "react";
import {Link } from "react-router-dom";
import Footer from "../common/Footer"; //refer to Footer.js
import Header from "../common/Header";
import NavAdmin from "./NavAdmin";

class PharmacistProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          user_data: [],
          user_count: 0, 
          user_index:0,
          role_data: [],
          role_count: 0, 
          role_index:0,
          isLoaded: false,
          message:"",
          error: null,
          selectedValue:0   
    }
    this.handlePhone=this.handlePhone.bind(this);
    this.updateUser=this.updateUser.bind(this);
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
  

//--------------------------------------------Show role------------------------------------------------------------------------
showRoles=()=>{
  fetch('http://localhost:8762/user-managment-service/roles/get_roles')
  .then(
      (response)=> {
          if (response.ok)
          {
              response.json().then(json_response => {
                  console.log(json_response)
                  if(json_response.length===0){
                  this.setState({
                    role_data:json_response,
                    role_count:json_response.length,
                    role_index:0,
                    message:"No Data",
                       isLoaded : true,
                       error : null
                   })
                }
                else{
                    this.setState({
                        role_data:json_response,
                        role_count:json_response.length,
                        role_index:0,
                        message:"",
                           isLoaded : true,
                           error : null
                       })
                }
               })
          }
          else
          {
              response.json().then(json_response => {
                   this.setState({
                       isLoaded: false,
                       error:json_response,
                       message:"Loading...",
                       role_data: {},
                       role_count:0,
                       role_index:0,
                   });
               })
           }
       },
       (error) => {
           this.setState({
               isLoaded: false,
               error: {message:"AJAX error, URL wrong or unreachable, see console"}, // save the AJAX error in state for display below
               message:error.message,
               role_data: {},
               role_count:0,
               role_index:0,
           });
       })
}


          //--------------------------------------search user----------------------------------------------------------------------------
searchUser= (id) => {
  fetch('http://localhost:8762/user-managment-service/users/search_userid?userId='+parseInt(id),{
      method: "GET"
  })
  .then(
      response => {
          if (response.ok) {     
              response.json().then(json_response => {
                  console.log(json_response);
                  this.setState({
                      user_data: json_response,
                      user_count: json_response.length,
                      message:"", 
                      updatemessage:"",
                      selectedValue:json_response.role.roleId,
                      user_index: 0, 
                      isLoaded: true, 
                      error: null 
                  });
              });
          } 
          else {
              response.json().then(json_response => {
                  this.setState({
                      isLoaded: false,
                      error: json_response,
                      message:"An Error Occured", 
                      user_data: {}, 
                      user_count: 0,
                      user_index: 0
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
              user_data: {}, 
              user_count: 0,
              user_index: 0
          });
      }
  );
}
//------------------------------------------To serach user function----------------------------------------------------------
componentDidMount() {
  this.showRoles();
  this.searchUser(this.props.match.params.uid);
  console.log(this.props.match.params.uid);
}

//--------------------------------------update User-------------------------------------------------------------------------------
updateUser = (event) => {
    event.preventDefault();
    var data = new FormData(event.target);
    if(data.get('userName')===null)
    {
    data.set('userName',this.state.user_data.userName);
    }
    if(data.get('email')===null)
    {
    data.set('email',this.state.user_data.email);
    }
    if(data.get('contactNo')===null)
    {
    data.set('contactNo',this.state.user_data.contactNo);
    }
    if(data.get('address')===null)
    {
    data.set('address',this.state.user_data.address);
    }
    if(data.get('password')===null)
    {
    data.set('password',this.state.user_data.password);
    }
    if(isNaN(data.get('roleId')))
    {
    data.set('roleId',this.state.selectedValue);
    }
    const formData={
    userId:parseInt(data.get('userId'),10),
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
            this.setState({updatemessage:"User updated Successfully..."});
          }
          else{
            this.setState({updatemessage:"Check User Input..."});
          }              
            })
              .catch(error => {this.setState({updatemessage:error.message})});
    };

    render() {
        console.log(this.state.selectedValue);
      const options=[];
      const h2=[];
      if(this.state.error){
        h2.push(<h2>{this.state.message}</h2>);
    }
    else if(this.state.roles_count===0)
    {
        h2.push(<h2>{this.state.message}</h2>);
    
    }
    else if(this.state.roles_count!==0)
    {    
            for(let i=0;i<this.state.role_count;i++)
      {
          options.push(
          <option value={this.state.role_data[i].roleId} key={i}>{this.state.role_data[i].roleName}</option>
          )
      }
      h2.push(<h2>{this.state.updatemessage}</h2>);
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
                                 <form className="form-group" onSubmit={this.updateUser} style={{ margin: "auto", maxWidth: "500px" }}>
                <br></br><br></br>
                <h2>UPDATE USER</h2>
              <br></br>
              {h2}
              <br></br>
              <label><b>Role: </b></label>
                <select id="roleId" name="roleId" value={this.state.selectedValue}>
                {options}
                </select>
                <br></br><br></br>
                <input type="hidden" id="userId" name="userId" value={this.state.user_data.userId}/>
                <label htmlFor="userName"><b> Name: </b> </label>
             <input type="text" id="userName" name="userName" disabled value={this.state.user_data.userName}/>
             <br></br><br></br>
             <label htmlFor="email"><b> Email: </b> </label>
             <input type="text" id="email" name="email" disabled value={this.state.user_data.email}/>
             <br></br><br></br>
               <label htmlFor="address"><b> Address: </b> </label>
             <textarea id="address" required value={this.state.user_data.address}></textarea>
              <br/><br/><br></br>
              <label htmlFor="password"><b> Password: </b> </label>
             <input type="text" id="password" required value={this.state.user_data.password}/>
              <br/><br/>
               <label htmlFor="phoneNumber"><b>Phone Number: </b> </label>
             <input type="phoneNumber" id="contactNo" name="contactNo" required  defaultValue={this.state.user_data.contactNo} onChange={this.handlePhone} />
               <br/><br/>
               <button type="submit">Update</button>
                <Link to={{pathname:`/Showstaff`}}><button type="cancel" >Cancel</button></Link>
            </form>
            <br></br><br></br><br></br><br></br>
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
            </div>
            </div>
        );
    }
}
export default PharmacistProfile;












