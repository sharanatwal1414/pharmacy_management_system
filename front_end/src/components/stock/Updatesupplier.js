import React from "react";
import styles from "./StockList.css";
import {Link } from "react-router-dom";
import Footer from "../common/Footer"; //refer to Footer.js
import Header from "../common/Header";
import NavStock from "./NavStock";

class Updatesupplier extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          supplier_data: [], 
          supplier_index: 0, 
          supplier_count: 0, 
          isLoaded: false,
          message:"", 
          error: null    
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

    
//--------------------------------------search supplier----------------------------------------------------------------------------
searchSupplier = (id) => {
    fetch('http://localhost:8762/supplier-managment-service/supplier/searchSupplier/'+id,{
        method: "GET"
    })
    .then(
        response => {
            if (response.ok) {     
                response.json().then(json_response => {
                    console.log(json_response);
                    if(json_response.length===0){
                    this.setState({
                        supplier_data: json_response,
                        supplier_count: json_response.length,
                        message:"No Data Found...." ,
                        supplier_index: 0, 
                        isLoaded: true, 
                        error: null 
                    });

                }
                else{
                    this.setState({
                        supplier_data: json_response,
                        supplier_count: json_response.length,
                        message:"" ,
                        supplier_index: 0, 
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
                        supplier_data: {},
                        message:"Loading...",
                        supplier_count: 0,
                        supplier_index: 0
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
                supplier_data: {}, 
                supplier_count: 0,
                supplier_index: 0
            });
        }
    );
}
//------------------------------------------To call showsuppler function----------------------------------------------------------
componentWillMount() {
    this.searchSupplier(this.props.match.params.sid);
  }

//--------------------------------------update Supplier-------------------------------------------------------------------------------
handleSubmit = (event) => {
    event.preventDefault();
    var data = new FormData(event.target);
        const formData={
            sId:parseInt(data.get('sId')),
            supplierName:data.get('supplierName'),
            contactNo:data.get('contactNo'),
            address:data.get('address'),
            email:data.get('email'),
            license:data.get('license')
          };
    console.log(data.get('supplierName'));

    fetch('http://localhost:8762/supplier-managment-service/supplier/updateSupplier/'+data.get('sId'), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          })
          .then(res => {
            if(res.status===200||res.ok)
            {
            this.setState({message:"Supplier Updated Successfully..."});
            }
            else{
                    this.setState({message:"Error while running Server..."});
            } 
            this.setState({isLoaded:true});             
            })
            .catch(error => {this.setState({message:error.message})});
      };
        
      
    render() {

        return (
            <div class="Parent_error_class">
            <Header/>
            <NavStock/>
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
                <h2>Update Supplier</h2>
                <br/><br/>
                <h2>{this.state.message}</h2>
                <br></br>
                <input type="hidden" id="sId" name="sId" value={this.props.match.params.sid}></input>
                <label htmlFor="name"><b>  Name: </b></label>
             <input type="text" id="supplierName" name="supplierName" required  defaultValue={this.state.supplier_data.supplierName}/>
             <br/><br/>
              <label htmlFor=" Phone Number"><b> Phone Number: </b> </label>
             <input type="text" id="contactNo" name="contactNo" required defaultValue={this.state.supplier_data.contactNo} onChange={this.handlePhone} />
               <br/><br/>
               <label htmlFor="Address"><b>  Address: </b> </label>
             <input type="text" id="address" name="address" required defaultValue={this.state.supplier_data.address}/>
              <br/><br/>
              <label htmlFor="Email"><b> Email: </b> </label>
             <input type="email" id="email" name="email" required defaultValue={this.state.supplier_data.email}/>
              <br/><br/>
            
               <label htmlFor="License"><b> License: </b> </label>
             <input type="text" id="license" name="license" required defaultValue={this.state.supplier_data.license}/>
               <br/><br/>
               <button type="submit">Update</button>
                 <Link to="/allsuppliers"><button type="cancel" >Cancel</button></Link>
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


export default Updatesupplier;












