import React from "react";
import styles from "./StockList.css";
import Footer from "../common/Footer"; //refer to Footer.js
import Header from "../common/Header";
import NavStock from "./NavStock";
import NavAdmin from "../admin/NavAdmin";
import NavPharmacist from "../pharmacist/NavPharmacist";
import {Link } from "react-router-dom";

class Addproduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          supplier_data: [], 
          supplier_index: 0,
          message:"", 
          supplier_count: 0, 
          isLoaded: false,
          error: null    
    }
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleReset=this.handleReset.bind(this);
  }

//--------------------------------------------Show Supplier------------------------------------------------------------------------
showSuppliers=()=>{
  fetch('http://localhost:8762/supplier-managment-service/supplier/allSupplier')
  .then(
      (response)=> {
          if (response.ok)
          {
              response.json().then(json_response => {
                  console.log(json_response)
                  if(json_response.length===0)
                  {
                    this.setState({
                        supplier_data:json_response,
                        supplier_count:json_response.length,
                        supplier_index:0,
                        message:"No Supplier Found...",
                           isLoaded : true,
                           isAdd:true,
                           error : null
                       })
                  }
                  else{
                    this.setState({
                        supplier_data:json_response,
                        supplier_count:json_response.length,
                        supplier_index:0,
                        message:"",
                           isLoaded : true,
                           isAdd:true,
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
                       supplier_data: {},
                       supplier_count:0,
                       supplier_index:0,
                   });
               })
           }
       },
       (error) => {
           this.setState({
               isLoaded: false,
               error: {message:"AJAX error, URL wrong or unreachable, see console"}, // save the AJAX error in state for display below
               supplier_data: {},
               message:error.message,
               supplier_count:0,
               supplier_index:0,
           });
       })
}
showNav=(rid)=>{
    if(rid===1)
    {return <NavAdmin/>}
    else if(rid===2)
    {return <NavStock/>}
    else {return <NavPharmacist/>}
    }
//------------------------------------------To call showsuppler function----------------------------------------------------------
componentDidMount() {
  this.showSuppliers();
}
handleReset=(event)=>{
    this.setState({ 
      message:"",
      })
    }

//--------------------------------------Add Product-------------------------------------------------------------------------------
  handleSubmit = (event) => {
    event.preventDefault();
    var data = new FormData(event.target);
    const formData={ 
      pName:data.get('pName'),
      pDescription:data.get('pDescription'),
      pManufactureDate:data.get('pManufactureDate'),
      pExpiryDate:data.get('pExpiryDate'),
      pQuantity:data.get('pQuantity'),
      pSellingPrice:data.get('pSellingPrice'),
      pCostPrice:data.get('pCostPrice'),
      sId:parseInt(data.get('sId'))
    };
    fetch('http://localhost:8762/product-managment-service/product/addproduct/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          })
          .then(res => {if(res.status===200)
            {
            this.setState({message:"Product added Successfully..."});
          }
          else{
            this.setState({message:"Error while running server..."});
          }              
            })
              .catch(error => {this.setState({message:error.message})});
    };
  
    render() {
        const loginData = JSON.parse(localStorage.getItem('loginData'));
        const options=[];
        if(this.state.isLoaded)
        {
            for(let i=0;i<this.state.supplier_count;i++)
                {
                    options.push(
                    <option value={this.state.supplier_data[i].supplierId} key={i}>{this.state.supplier_data[i].supplierName}</option>
                    )
                }
              }
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
                <h1>Add PRODUCT</h1>
                <br></br><br></br>
                <h2>{this.state.message}</h2>
                <label htmlFor="name"><b>Name: </b></label>
                <input type="text"  id="pName" name="pName" required/><br/><br/>
                <label htmlFor="pDescription"><b>Description: </b></label>
                <textarea id="pDescription" name="pDescription" required></textarea><br/><br/><br></br>
                <label htmlFor="date"><b>Manufacture Date: </b></label>
                <input type="date" className="formdate" id="pManufactureDate" name="pManufactureDate" required/>
                <br/><br/>
                <label htmlFor="exp"><b>Expiry Date: </b></label>
                <input type="date" className="formdate" id="pExpiryDate" name="pExpiryDate" required/>
                <br/><br/>
                <label htmlFor="quantity"><b>Quantity: </b></label>
                <input type="number" id="pQuantity" name="pQuantity" required/>
                <br/><br/>
                <label htmlFor="sellingprice"> <b>Selling Price: </b></label>
                <input type="text"  id="pSellingPrice" name="pSellingPrice" required/>
                <br/><br/>
                <label htmlFor="costprice"><b>Cost Price: </b></label>
                <input type="text"  id="pCostPrice" name="pCostPrice" required />
                <br/><br/>
                <label htmlFor="supplier"><b>Supplier Name: </b></label>
                <select id="sId" name="sId" required>
                {options}
                </select>
                <br></br><br></br><br></br><br></br>
                <button type="submit">Add</button>
                <Link to="/addnewproduct"><button type="cancel" >Cancel</button></Link>
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

export default Addproduct;












