import React from "react";
import "./StockList.css";
import { Helmet } from "react-helmet";
import 'font-awesome/css/font-awesome.min.css';
import Updateproduct from './UpdateProduct';
import {Link } from "react-router-dom";
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

class Addnewproduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product_data: [], 
            product_index: 0, 
            product_count: 0, 
            message:"",
            isLoaded: false,
            open:false,
            product:0, 
            error: null 
        };
    }
    setOpen=(bool)=>{
        this.setState({open:bool});
    }
    handleClickOpen = (id) => {
        this.setState({product:id});
        this.setOpen(true);
      };
    
    handleYesClose = () => {
        this.delete(this.state.product);
        this.setOpen(false);
        this.setState({product:0});
        window.location.reload();
      };
      handleNoClose = () => {
        this.setOpen(false);
        this.setState({product:0});
      };
//----------------------------------------------Show all products------------------------------------------------------------------- 
    allProduct = () => {
        fetch('http://localhost:8762/product-managment-service/product/allproducts').then(
            response => {
                if (response.ok) {     
                    response.json().then(json_response => {
                        console.log(json_response);
                        if(json_response.length===0)
                        {
                        this.setState({
                            product_data: json_response,
                            product_count: json_response.length, 
                            product_index: 0, 
                            message:"No Data Found",
                            isLoaded: true, 
                            error: null 
                        });
                    }
                    else{
                        this.setState({
                            product_data: json_response,
                            product_count: json_response.length, 
                            product_index: 0,
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
                            product_data: {}, 
                            message:"Loading...",
                            product_count: 0,
                            product_index: 0
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
                    product_data: {}, 
                    product_count: 0,
                    product_index: 0
                });
            }
        );
    }
    
//--------------------------------------search product----------------------------------------------------------------------------
searchProduct = (product_name) => {
    fetch('http://localhost:8762/product-managment-service/product/search/'+product_name,{
        method: "GET"
    }).then(
        response => {
            if (response.ok) {     
                response.json().then(json_response => {
                    console.log(json_response);
                    if(json_response.length===0)
                    {
                    this.setState({
                        product_data: json_response,
                        product_count: json_response.length, 
                        product_index: 0,
                        message:"No Data Found!!!", 
                        isLoaded: true, 
                        error: null 
                    });
                }
                else{
                    this.setState({
                        product_data: json_response,
                        product_count: json_response.length, 
                        product_index: 0,
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
                        product_data: {}, 
                        message:"Loading...", 
                        product_count: 0,
                        product_index: 0
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
                product_data: {}, 
                product_count: 0,
                product_index: 0
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
    fetch("http://localhost:8762/product-managment-service/product/deleteproduct/" + id, {
        method: "DELETE"
    }).then(res=>{
        if(res.status===200)
        {
            this.setState({message:"Product Deleted"})
        }
        else{
            this.setState({message:"Product Not Deleted"})
        }
    })
        .catch(error => {this.setState({updatemessage:error.message})});
}
//---------------------------------------------------------------------------------------------------------------------------------
    componentDidMount(){
        this.allProduct();
    }
//--------------------------------------------------------------------------------------------------------------------------------
    render() {
        const loginData = JSON.parse(localStorage.getItem('loginData'));
        const rows=[];
        const h2=[];
        if(this.state.error){
            h2.push(<h2>{this.state.message}</h2>);
        }
        else if(this.state.product_count===0)
        {
            h2.push(<h2>{this.state.message}</h2>);
        
        }
        else if(this.state.product_count!==0)
        {    
            for(let i=0;i<this.state.product_count;i++)
                {
                    rows.push(
                        <tr key={this.state.product_data[i].pId} align="start">
                        <td className="cell100 column1" >{this.state.product_data[i].pId}</td>
                        <td className="cell100 column2" id="pName" >{this.state.product_data[i].pName}</td>
                        <td className="cell100 column3" ><i className="fa fa-trash" aria-hidden="true" onClick={()=>this.handleClickOpen(this.state.product_data[i].pId)}  style={{padding:"10px"}}></i>
                         <Link to={{pathname:`/UpdateProduct/${this.state.product_data[i].pId}`}}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></Link></td>
                    </tr>
                    )
                }
        }
      
        else{
            h2.push(<h2>{this.state.message}</h2>);
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

                <br></br><br></br><br></br>
                <h2>PRODUCT LIST</h2>
                <br></br><br></br>
                <form className="example" action="/action_page.php" style={{ margin: "auto", maxWidth: "500px" }} >
                    <input type="text" id="productname" placeholder="Search product" name="search" />
                    <button type="button" onClick={() => this.searchProduct(document.getElementById("productname").value)}>
                        <i className="fa fa-search" ></i>
                    </button>
                    {h2}
                </form>
                <div className="limiter">
                    <div className="container-table100">
                        <div className="wrap-table100">

                            <div className="table100 ver2 m-b-110">
                                <div className="table100-head">
                                    <table>
                                        <thead>
                                            <tr className="row100 head" >
                                                <th className="cell100 column1">Product ID</th>
                                                <th className="cell100 column2">Product Name</th>
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
                                    <Dialog open={this.state.open} onClose={this.handleNoClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Delete Product</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Do you want to delete this Product?
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
                            </div>
                            <Link to="/addproduct"><button class="btn2 placeorder" >Add Product</button></Link>
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
            // if (this.state.error) {
            //     return (
            //         <div>
            //             <b>{this.state.error.message}</b>
            //         </div>
            //     );
            // } else if (this.state.isLoaded) {
            //     if (this.state.product_count !== 0) {
            //         // dress table not empty
            //         return (
            //             <div>
            //                 <b>
            //                     List of dresses from server localhost:3001/dresses
            //                 </b>
            //                 <table>
            //                     <tbody>
            //                         <tr>
            //                             <th>id</th>
            //                             <td>
            //                                 {
            //                                     this.state.product_data[
            //                                         this.state.product_index
            //                                     ].pId
            //                                 }
            //                             </td>
            //                         </tr>
            //                         <tr>
            //                             <th>Name</th>
            //                             <td>
            //                                 {
            //                                     this.state.product_data[
            //                                         this.state.product_index
            //                                     ].pName
            //                                 }
            //                             </td>
            //                         </tr>
            //                         <tr>
            //                             <th>Color</th>
            //                             <td>
            //                                 {
            //                                     this.state.product_data[
            //                                         this.state.product_index
            //                                     ].pQuantity
            //                                 }
            //                             </td>
            //                         </tr>
            //                         <tr>
            //                             <th>Description</th>
            //                             <td>
            //                                 {
            //                                     this.state.product_data[
            //                                         this.state.product_index
            //                                     ].pDescription
            //                                 }
            //                             </td>
            //                         </tr>
            //                         <tr>
            //                             <th>Style</th>
            //                             <td>
            //                                 {
            //                                     this.state.product_data[
            //                                         this.state.product_index
            //                                     ].pSellingPrice
            //                                 }
            //                             </td>
            //                         </tr>
            //                     </tbody>
            //                 </table>
            //             </div>
            //         );
            //     } else {
            //         return (
            //             <div>
            //                 <b>Dress table is empty</b>
            //             </div>
            //         );
            //     }
            // } else {
            //     return (
            //         <div>
            //             <b>Waiting for server ...</b>
            //         </div>
            //     );
            // }
            
        
    }
}

    
export default Addnewproduct;












