import React from "react";
//import pharmacist from './public/pharmacist.jpg';
import styles from "./StockList.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Helmet } from "react-helmet";
import 'font-awesome/css/font-awesome.min.css';
import {Link } from "react-router-dom";
import Updatesupplier from './Updatesupplier';
import Footer from "../common/Footer"; //refer to Footer.js
import Header from "../common/Header";
import NavStock from "./NavStock";
import NavAdmin from "../admin/NavAdmin";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import NavPharmacist from "../pharmacist/NavPharmacist";

class Showsupplier extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            supplier_data: [], 
            supplier_index: 0, 
            supplier_count: 0,
            message:"", 
            isLoaded: false, 
            open:false,
            supplier:0,
            error: null 
        };

    }
    setOpen=(bool)=>{
        this.setState({open:bool});
    }
    handleClickOpen = (id) => {
        this.setState({supplier:id});
        this.setOpen(true);
      };
    
    handleYesClose = () => {
        this.delete(this.state.supplier);
        this.setOpen(false);
        this.setState({supplier:0});
        window.location.reload();
      };
      handleNoClose = () => {
        this.setOpen(false);
        this.setState({supplier:0});
      };
//----------------------------------------------Show all suppliers------------------------------------------------------------------- 
showSuppliers = () => {
        fetch('http://localhost:8762/supplier-managment-service/supplier/allSupplier').then(
            response => {
                if (response.ok) {     
                    response.json().then(json_response => {
                        console.log(json_response);
                        if(json_response.length===0){
                        this.setState({
                            supplier_data: json_response,
                            supplier_count: json_response.length,
                            message:"No Data Found!!", 
                            supplier_index: 0, 
                            isLoaded: true, 
                            error: null 
                        });
                    }
                    else{
                        this.setState({
                            supplier_data: json_response,
                            supplier_count: json_response.length,
                            message:"", 
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
                            message:"Loading...",
                            supplier_data: {}, 
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
//--------------------------------------search supplier----------------------------------------------------------------------------
searchSupplier = (supplier_Name) => {
    fetch('http://localhost:8762/supplier-managment-service/supplier/searchSupplierName/'+supplier_Name,{
        method: "GET"
    }).then(
        response => {
            if (response.ok) {     
                response.json().then(json_response => {
                    console.log(json_response);
                    if(json_response.length===0)
                    {
                    this.setState({
                        supplier_data: json_response,
                        supplier_count: json_response.length, 
                        supplier_index: 0,
                        message:"No Data Found!!", 
                        isLoaded: true, 
                        error: null 
                    });
                }
                else{
                    this.setState({
                        supplier_data: json_response,
                        supplier_count: json_response.length, 
                        supplier_index: 0, 
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
                supplier_data: {},
                message:error.message, 
                supplier_count: 0,
                supplier_index: 0
            });
        }
    );
}
showNav=(rid)=>{
    if(rid===1)
    {return <NavAdmin/>}
    else if(rid===2)
    {return <NavStock/>}
    else {return <NavPharmacist/>}
    }
//--------------TO DELETE A PRODUCT------------------------------------------
delete=(id)=>{
    fetch("http://localhost:8762/supplier-managment-service/supplier/delete/" + id, {
        method: "DELETE"
    }).then(res=>{
        if(res.status===200)
        {
            this.setState({message:"Supplier Deleted"})
        }
        else{
            this.setState({message:"Supplier Not Deleted"})
        }
    })
        .catch(error => {this.setState({updatemessage:error.message})});
}
//------------------------------------------------------------CALL SHOW SUPPLIER---------------------------------------------------------------------
    componentDidMount(){
        this.showSuppliers();
    }
//----------------------------------------------------------------DELETE----------------------------------------------------------------
    render() {
        const loginData = JSON.parse(localStorage.getItem('loginData'));
        const rows=[];
        if(this.state.isLoaded)
        {
                for(let i=0;i<this.state.supplier_count;i++)
                {
                    rows.push(
                        <tr key={this.state.supplier_data[i].supplierId} align="start">
                        <td className="cell100 column1"  >{this.state.supplier_data[i].supplierId}</td>
                        <td className="cell100 column2" id="pName" >{this.state.supplier_data[i].supplierName}</td>
                        <td className="cell100 column3" ><i className="fa fa-trash" aria-hidden="true" onClick={()=>this.handleClickOpen(this.state.supplier_data[i].supplierId)}  style={{padding:"10px"}}></i>
  <Link to={{pathname:`/Updatesupplier/${this.state.supplier_data[i].supplierId}`}}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></Link></td>                        {/* document.getElementById("pName").innerHTML */}
                    </tr>
                    )
                }
            }
        return (
            <div className="Parent_error_class">
                <Header/>
                {this.showNav(loginData.role.roleId)}
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
{/*--------------------------search supplier--------------------------   */}
                <br></br><br></br><br></br>
                <h2>SUPPLIER</h2>
                <br></br><br></br><br></br>
                <form className="example" action="/action_page.php" style={{ margin: "auto", maxWidth: "500px" }} >
                <input type="text" id="searchname" placeholder="Search Supplier" name="search" />
                    <button type="button" onClick={() => this.searchSupplier(document.getElementById("searchname").value)}>
                        <i className="fa fa-search" ></i>
                    </button>
                    <br></br><br></br>
                    <h2>{this.state.message}</h2>
                </form>

                <div className="limiter">
                    <div className="container-table100">
                        <div className="wrap-table100">

                            <div className="table100 ver2 m-b-110">
                                <div className="table100-head">
                                    <table>
                                        <thead>
                                            <tr className="row100 head">
                                                <th className="cell100 column1" >Supplier ID</th>
                                                <th className="cell100 column2">Supplier Name</th>
                                                <th className="cell100 column4">Action</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>

                                <div className="table100-body js-pscroll">
                                    <table>
                                        <tbody>
                                            {rows}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <Link to="/addsupplier"><button class="btn2 placeorder" >Add Supplier</button></Link>
                        </div>
                    </div>
                </div>
                <Dialog open={this.state.open} onClose={this.handleNoClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Delete Supplier</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Do you want to delete this Supplier?
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

    
export default Showsupplier;












