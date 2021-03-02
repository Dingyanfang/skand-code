import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { connect } from 'react-redux';
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import * as actionType from '../../store/actions'


const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(4, 'Password is too Short!')
    .max(30, 'Password is too Long!')
    .required('Required'),
});

const Login = (props) => {

  const [displayError, setDisplayError] = useState('none');

  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: (values, {resetForm}) => {
      //alert(JSON.stringify(values, null, 2));
      fetch('/api/v2/users/tokens', {
        method: 'POST',
        body: JSON.stringify(values)
      })
      .then(
        (res) => { 
          if (res.status === 200){
            setDisplayError('none');
            props.onLogin(res.headers.map.authorization);
            history.push('/users')
          } else {
            setDisplayError('block');
            resetForm();
          }
        }
      );
    }
  });

  
  return (
    <div 
      css={{
        backgroundColor:'#bbdfc8',
        height: "100vh",
        width: '100vw',
        textAlign: 'center',
        display:'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
      <Form
        onSubmit={formik.handleSubmit}
        css={{
          border:'solid 2px gray',
          borderRadius: '8px',
          width: '400px',
          padding: '20px 40px',
          display: 'flex',
          flexDirection: 'column',
          margin: 'auto',
          backgroundColor: '#f0e5d8',
          boxShadow: '0 10px 50px #555',
          '@media(max-width: 600px)': {
            width: '100%',
            height:'100%',
            padding: '20px 40px',
            boxShadow: '0 0 0 #fff',
            borderRadius: '0px',
            border:'0px',
          }
        }}
      >
        <h2
          css={{paddingBottom: '20px'}}
        >Welcome</h2>
        <FormGroup row>
          <Label sm={3} for="email">Email</Label>
          <Col sm={9}>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Please enter your email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </Col>
          {formik.touched.email && formik.errors.email ? (
         <div css={{color: 'red'}}>{formik.errors.email}</div>
       ) : null}
        </FormGroup>
        <FormGroup row>
          <Label sm={3} for="password">Password</Label> 
          <Col sm={9}>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Please enter your password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </Col>
          {formik.touched.password && formik.errors.password ? (
         <div css={{color: 'red'}}>{formik.errors.password}</div>
       ) : null}
        </FormGroup>
        <p css={{display: displayError, color: 'red'}}>Invalid email or password</p>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  )


}

const mapStateToProps = state => {
  return {
    token: state.authReducer.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (i) => dispatch({type: actionType.LOGIN, token:i})
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
