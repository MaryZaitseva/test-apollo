import { Formik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { compose, withState, withHandlers } from 'recompose';

const enhance = compose(
    withState('values', 'setValues', { name: '', password: '', email: '', passwordConfirm: ''}),
    withHandlers({
        handleChange: props => event => {
            props.setValues({ ...props.values, [event.target.name]: event.target.value})
        }
    })
)

const AuthForm = enhance(props => ( 
    <Form onSubmit={ e => props.handleSubmit(e, props.values) } style={{ width: '30%', margin: '3rem auto'}}>
        { props.type === 'signup' && 
            <Form.Field>    
                <label htmlFor="name">
                    First Name
                </label>    
                <Input
                    name="name"
                    placeholder="Enter your name"
                    type="text"
                    value={ props.name }
                    onBlur={ props.type === 'signup' ? props.validateName : null }
                    onChange={ props.handleChange }/>
            </Form.Field>
        }
            <Form.Field>  
                <label htmlFor="email">
                    Email
                </label>      
                <Input
                    name="email"
                    placeholder="Enter your email"
                    type="text"
                    value={ props.email }
                    onBlur={ props.validateEmail }
                    onChange={ props.handleChange }/>
            </Form.Field>

            <Form.Field>   
                <label htmlFor="password">
                    Password
                </label>     
                <Input
                    name="password"
                    placeholder="Enter your password"
                    type="password"
                    value={ props.password }
                    onBlur={ props.validatePassword }
                    onChange={ props.handleChange }/>
            </Form.Field>
        { props.type === 'signup' && 
            <Form.Field>   
                <label htmlFor="passwordConfirm">
                    Confirm Password
                </label>     
                <Input
                    name="passwordConfirm"
                    placeholder="Confirm your password"
                    type="password"
                    value={ props.passwordConfirm }
                    onBlur={ e => { if(props.type === 'signup') {props.validatePasswordConfirm(e, props.values.password)}} }
                    onChange={ props.handleChange }/>
            </Form.Field>
        }

        <Button type='submit' color='yellow' style={{ margin: '20px auto'}}>Sign Up</Button>
    </Form>
  )
)

export default AuthForm;