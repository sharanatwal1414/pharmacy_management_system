import React from "react";
import "./Pharmisict.css";
import "../stock/util.css";
import { Helmet } from "react-helmet";
import Popup from '../common/popup';
import Header from "../common/Header";
import NavPharmacist from "./NavPharmacist";
import Footer from "../common/Footer";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Form from '@material-ui/core/FormGroup';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class Pharmisict extends React.Component {
    constructor(props) {
        super(props);
        var today = new Date(),
        date = today.getFullYear() + '-' + (("0"+(today.getMonth()+1)).slice(-2) ) + '-' + (("0"+today.getDate()).slice(-2));
        this.state = {
            product_data: [], 
            product_index: 0, 
            product_count: 0, 
            showPopup: false,
            bill:false,
            supplier_data: [],
            selected_data: [],
            message:"",
            order:[],
            date:date,
            main_data: {},
            isLoaded: true,
            open:false,
            error: null,
            loginData: JSON.parse(localStorage.getItem('loginData'))
        };
    }
    
    setOpen=(bool)=>{
        this.setState({open:bool});
    }
    setBill=(bool)=>{
        this.setState({bill:bool});
    }
  handleClickOpen = () => {
    this.setOpen(true);
  };
  handlePhone=(event)=>{
    event.preventDefault();
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
  handleClose = () => {
    this.setOpen(false);
    window.location.reload();
  };
  handleBillClose = () => {
    this.setBill(false);
    window.location.reload();
  }

  placeOrder=(event)=>{
    event.preventDefault();
    var orderProducts=[];
        this.state.selected_data.map(supply => (
              orderProducts.push({"productId":supply.pId,"quantity":parseInt(supply.orderedQuantity)})  
        ));
        
    var data = new FormData(event.target);
    const formData={ 
            soDate:this.state.date,
            customerName:data.get('customerName'),
            customerAddress:data.get('customerAddress'),
            customerEmail:data.get('email'),
            customerPhone:data.get('customerPhone'),
            soStatus:"Paid",
            sellerId:parseInt(this.state.loginData.userId),
            orderProducts:orderProducts       
    };
    console.log(formData);
    fetch('http://localhost:8762/sales-managment-service/order/addorder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          })
          .then(res => {
              if(res.status===200)
            {
            res.json().then(json_response =>{
            this.setState({message:"Order Placed Successfully...",order:json_response});
            console.log(json_response);
            this.setOpen(false);
             this.setBill(true);
            }
            )
          }
          else{
            this.setState({message:"Error while running server..."});
          }              
            })
              .catch(error => {this.setState({message:error.message})});
              
                
            
        
  }

    allProduct = () => {
        fetch('http://localhost:8762/product-managment-service/product/allproductsavailableforsale').then(
            response => {
                if (response.ok) {     
                    response.json().then(json_response => {
                        console.log(json_response);
                        if(json_response.length===0)
                        {
                            this.setState({
                                product_data: json_response,
                                product_count: json_response.length,
                                message:"No Data Found...", 
                                product_index: 0, 
                                isLoaded: true, 
                                error: null 
                            });
                        }
                        else{
                            this.setState({
                                product_data: json_response,
                                product_count: json_response.length, 
                                message:"",
                                product_index: 0, 
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
                    product_data: {}, 
                    message:error.message,
                    product_count: 0,
                    product_index: 0
                });
            }
        );
    }
    //--------------------------------------search product----------------------------------------------------------------------------
searchProduct = (product_name) => {
    fetch('http://localhost:8762/product-managment-service/product/searchproductsavailableforsale?search='+product_name,{
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
                            message:"No Data Found...",
                            isLoaded: true, 
                            error: null 
                        });
                    }
                    else{
                        this.setState({
                            product_data: json_response,
                            product_count: json_response.length,
                            message:"", 
                            product_index: 0, 
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
                product_data: {},
                message:error.message, 
                product_count: 0,
                product_index: 0
            });
        }
    );
}
componentDidMount(){
    this.allProduct();
}
    // ---------------<<<<<<<<<<

    addRow = (pName, pId, pQuantity,orderedQuantity) => {
        var selected_data = this.state.selected_data;
        var result=false;
        var supplyQ=0;
        if(selected_data.length===null){
            selected_data.push({ 'pName': pName, 'pId': pId, 'pQuantity': pQuantity,'orderedQuantity':orderedQuantity })
        this.setState({ selected_data: selected_data })
        }
        else{
        selected_data.map(supply => {
            if(supply.pId===pId) {
                supplyQ+=parseInt(supply.orderedQuantity);
                 supplyQ+=parseInt(orderedQuantity);
                    selected_data.pop(supply);
                 return true;
            } 
            else 
            {
                return false;
            }
        })
        if(pQuantity<orderedQuantity)
        {
            this.setState({message:"Ordered Quantity exceeds the Available Quantity"})
        }
        else
        {
        if(result){
            selected_data.push({ 'pName': pName, 'pId': pId, 'pQuantity': pQuantity,'orderedQuantity':supplyQ })
        this.setState({ selected_data: selected_data })
        }
        else{
        selected_data.push({ 'pName': pName, 'pId': pId, 'pQuantity': pQuantity,'orderedQuantity':orderedQuantity })
        this.setState({ selected_data: selected_data })
        console.log(this.state.selected_data);
        }
    }
}
        
    }
    handleSubmit = () => alert("Submitted");

    handleStatusChange = event => {
        this.setState({ select: event.target.value })
    };

    handleReset = event => alert("Resetted");

    render() {
        return (

            <div class="Parent_error_class">
                <Header></Header>
                <NavPharmacist></NavPharmacist>
                <div className="application">
                    <head>
                        <Helmet>
                            <title>Pharmisict Page</title>
                            <meta charset="UTF-8" />
                            <meta name="viewport" content="width=device-width, initial-scale=1" />

                        </Helmet>
                    </head>
                </div>

                <br></br><br></br><br></br>
                <h2>SALES</h2>
                <br></br><br></br><br></br><br></br><br></br>
                <form class="example" action="/action_page.php" style={{ margin: "auto", maxWidth: "500px" }} >
                    <input type="text" id="productname" placeholder="Search Products" name="search" />
                    <button type="button" onClick={() => this.searchProduct(document.getElementById("productname").value)}>
                        <i className="fa fa-search"></i>
                    </button>
                    <br></br>
                    <h3>{this.state.message}</h3>
                </form>

                <br></br><br></br>
                <div class="limiter">
                    <div class="container-table100">
                        <div class="wrap-table100">

                            <div class="table100 ver2 m-b-110">
                                <div class="table100-head">
                                    <table>
                                        <thead>
                                            <tr class="row100 head">
                                                <th class="cell100 column1">Product ID</th>
                                                <th class="cell100 column2">Product Name</th>
                                                <th class="cell100 column3">Available Quantity</th>
                                                <th class="cell100 column4">Ordered Quantity</th>
                                                <th class="cell100 column5">Add Product</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>

                                <div class="table100-body js-pscroll">
                                    <table>
                                        <tbody>
                                            {
                                                this.state.product_data.map(product => (
                                                    <tr key={product.pId} align="start">
                                                        <td class="cell100 column1" >{product.pId}</td>
                                                        <td class="cell100 column2" id="pName" >{product.pName}</td>
                                                        <td class="cell100 column3" >{product.pQuantity}</td>
                                                        <td class="cell100 column4" ><input type="number" id={product.pId} name="quantity" placeholder="Enter Quantity" min="1" ></input></td>
                                                        <td class="cell100 column5" ><button class="addbtn" ref={btn => { this.btn = btn; }} onClick={() => this.addRow(product.pName, product.pId, product.pQuantity, document.getElementById(product.pId).value)}>ADD</button></td>
                                                    </tr>
                                                ))
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <br></br><br></br><br></br>
                            <h4>Selected Order Details</h4>
                            <br></br><br></br>
                            <div class="table100 ver5 m-b-110">
                                <div class="table100-head">
                                    <table>
                                        <thead>
                                            <tr class="row100 head">
                                                <th class="cell100 column1">Product Name</th>
                                                <th class="cell100 column2">Availabe Quantity</th>
                                                <th class="cell100 column3">Place Quantity</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>

                                <div class="table100-body js-pscroll">
                                    <table>
                                        <tbody>
                                            {
                                                this.state.selected_data.map(supply => (
                                                    <tr key={supply.pId} align="start" class="row100 body">
                                                        <td class="cell100 column1" >{supply.pName}</td>
                                                        <td class="cell100 column2"  >{supply.pQuantity}</td>
                                                        <td class="cell100 column3" id="quantsel"  >{supply.orderedQuantity}</td>
                                                    </tr>
                                                ))
                                            }


                                        </tbody>
                                    </table>
                                    <div>
                                        <button class="btn2 placeorder" onClick={()=>this.handleClickOpen()}>Place Order</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Dialog open={this.state.bill} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Bill</DialogTitle>
        <h3>ORDER PLACED!!</h3>
            <DialogContent>
            <lable>Name:           {this.state.order.customerName}</lable><br></br>
            <lable>Address:        {this.state.order.customerAddress}</lable><br></br>
            <lable>Phone Number:   {this.state.order.customerPhone}</lable><br></br>
            <lable>Email:          {this.state.order.customerEmail}</lable><br></br>
            <lable>SubTotal:       {this.state.order.subTotal}</lable><br></br>
            <lable>Tax:            {this.state.order.tax}</lable><br></br>
            <lable>Total Amount:   {this.state.order.total}</lable><br></br>
          <Button onClick={this.handleBillClose} color="primary">
            Cancel
      </Button>
          </DialogContent>
      </Dialog>
      <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Customer Details</DialogTitle>
        
            <form onSubmit={this.placeOrder}>
            <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            id="customerName"
            name="customerName"
            label="Customer Name"
            type="text"
            fullWidth
            required
          />
         <TextField
            autoFocus
            margin="dense"
            id="customerAddress"
            name="customerAddress"
            label="Address"
            type="text"
            rows="3"
            fullWidth
            required
          />          <TextField
            autoFocus
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="customerPhone"
            name="customerPhone"
            label="Phone Number"
            type="phonenumber"
            onChange={this.handlePhone}
            fullWidth
            required
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary">
            Place Order
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Cancel
      </Button>
          
        </DialogActions>
        </form>
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
export default Pharmisict;  