import React from "react";
import styles from "./StockList.css";
import Footer from "../common/Footer"; //refer to Footer.js
import Header from "../common/Header";
import NavStock from "./NavStock";
import NavAdmin from "../admin/NavAdmin";
import NavPharmacist from "../pharmacist/NavPharmacist";
import {Link } from "react-router-dom";

class Addsupplier extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          supplier_data: [], 
          supplier_index: 0, 
          supplier_count: 0,
          message:"", 
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
  showNav=(rid)=>{
    if(rid===1)
    {return <NavAdmin/>}
    else if(rid===2)
    {return <NavStock/>}
    else {return <NavPharmacist/>}
    }
//--------------------------------------Add Supplier-------------------------------------------------------------------------------
handleSubmit = (event) => {
    event.preventDefault();
    var data = new FormData(event.target);
        const formData={
            supplierName:data.get('supplierName'),
            contactNo:data.get('contactNo'),
            address:data.get('address'),
            email:data.get('email'),
            license:data.get('license')
          };
    console.log(data.get('supplierName'));
    fetch('http://localhost:8762/supplier-managment-service/supplier/addSupplier', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          })
        .then(res => {
            if(res.status===200||res.ok)
            {
            this.setState({message:"Supplier added Successfully..."});
            }
            else{
                    this.setState({message:"Error while running Server..."});
            } 
            this.setState({isLoaded:true});             
            })
            .catch(error => {this.setState({message:error.message})});
 };
        
      
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
                            <form className="form-group" onSubmit={this.handleSubmit} style={{ margin: "auto", maxWidth: "450px" }}>
                                <h1>Add Supplier</h1>
                                <br></br><br></br>
                                <h2>{this.state.message}</h2>
                                <br></br>
                                <div>
                                    <label htmlFor="name"><b>Name: </b></label>
                                    <input type="text"  id="supplierName" name="supplierName" required/><br/><br/>
                                </div>
                                <div>
                                    <label htmlFor="PhoneNumber"><b>Phone Number: </b> </label>
                                    <input type="text" id="contactNo" name="contactNo" onChange={this.handlePhone} required/><br></br><br></br>
                                </div>
                                <div>
                                    <label htmlFor="Address"><b>Address: </b> </label>
                                    <textarea id="address" name="address" required></textarea>
                                    <br></br><br></br><br></br>
                                </div>
                                <div>
                                    <label htmlFor="Email"><b> Email: </b> </label>
                                    <input type="email" id="email" name="email" required/>
                                    <br></br><br></br>
                                </div>
                                <div>
                                    <label htmlFor="License"><b> License: </b> </label>
                                    <input type="text" id="license" name="license" required/>
                                    <br></br><br></br>
                                </div>
                                <div>
                                    <button type="submit">Add</button>
                                     <button type="reset">Reset</button>
                                </div>
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
        )
    }
}


export default Addsupplier;












