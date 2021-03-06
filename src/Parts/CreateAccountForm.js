import React, { Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/CreateAccountForm.css';
import {Form, Button} from "react-bootstrap";
import axios from 'axios';
// import { faObjectGroup } from '@fortawesome/free-solid-svg-icons';
// import CustomerDetails from '../DB_data/CustomerDetails';

import { Route, Redirect } from "react-router-dom";


export default class CreateAccountForm extends Component {

    constructor(props){
        super(props);

        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeContactNumber = this.onChangeContactNumber.bind(this);
        this.onChangeBranchName = this.onChangeBranchName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.checkNewUser = this.checkNewUser.bind(this);

        this.state = {
            firstName: '',
            lastName: '',
            gender: '',
            contactNumber: '',
            branchName: '',
            password: '',
            isNewNumber: true
        }
    }

    onChangeFirstName(e){
        this.setState({
            firstName: e.target.value
        })
    }

    onChangeLastName(e){
        this.setState({
            lastName: e.target.value
        })
    }

    onChangeGender(e){
        this.setState({
            gender: e.target.value
        })
    }

    onChangeContactNumber(e){
        this.setState({
            contactNumber: e.target.value
        })
    }

    onChangeBranchName(e){
        this.setState({
            branchName: e.target.value
        })
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        })
    }

    checkNewUser(){
        axios.get('http://localhost/database_project/get_Customer_Details.php')
        .then(res => res.data)
        .then((res) => {

            console.log(this.state.contactNumber)

            res.forEach(phone => {

                if(this.state.contactNumber === phone.Contact_Number){
                    this.setState({
                        isNewNumber: false
                    })
                    console.log("old user");
                }

            })


            const obj = {
                firstName : this.state.firstName,
                lastName : this.state.lastName,
                gender : this.state.gender,
                contactNumber: this.state.contactNumber,
                branchName : this.state.branchName,
                password : this.state.password,
                isRegistered : false
            }
            const obj_json = JSON.stringify(obj);

            if((this.state.isNewNumber===true) && obj.firstName.length!==0 && obj.lastName.length!==0 && obj.gender.length!==0 && obj.contactNumber.length!==0 && obj.branchName.length!==0 && obj.password.length!==0){
                // pass new account details to db
                axios.post('http://localhost/database_project/create_New_Customer.php', obj_json)
                .then(res => {
                    console.log("New Account created");
                    this.setState({
                        firstName: '',
                        lastName: '',
                        gender: '',
                        contactNumber: '',
                        branchName: '',
                        password: '',
                        isRegistered: true,
                    })
                });  
            }
            this.setState({
                isNewNumber: true
            })

        });
    }


    onSubmit(e){
        e.preventDefault();

        this.checkNewUser();
   
    }

        

    render() {
        return (
            <>
            <Form className="login-form" onSubmit={this.onSubmit} method="post">

                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Control className="login-input" type="text" placeholder="First name" name="firstName" value={this.state.firstName} onChange={this.onChangeFirstName}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLastName">
                    <Form.Control className="login-input" type="text" placeholder="Last name" name="lastName" value={this.state.lastName} onChange={this.onChangeLastName}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicGender">
                    <Form.Control className="login-input" type="text" placeholder="Gender" name="gender"  value={this.state.gender} onChange={this.onChangeGender}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                    <Form.Control className="login-input" type="text" placeholder="Phone Number" name="contactNumber"  value={this.state.contactNumber} onChange={this.onChangeContactNumber}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicBranchName">
                    <Form.Control className="login-input" type="text" placeholder="Branch Name" name="branchName"  value={this.state.branchName} onChange={this.onChangeBranchName}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control className="login-input" type="password" placeholder="Password" name="password"  value={this.state.password} onChange={this.onChangePassword}/>
                </Form.Group>

                <Button href="" className="login-submit-btn login-input" type="submit" name="createNewAccount">CREATE ACCOUNT</Button>

                <Route>
                    {this.state.isRegistered? <Redirect to="/login" /> : null} 
                </Route>

            </Form>
            </>
        )
        
    }
    
}



