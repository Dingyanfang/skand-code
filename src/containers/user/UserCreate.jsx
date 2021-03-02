import React, { useState, useEffect } from "react";
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux';
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Button, Form, FormGroup, Label, Input, Col } from 'reactstrap';

const UserCreate = (props) => {
    const [displayError, setDisplayError] = useState('none');
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            email: "",
            first_name: "",
            last_name: "",
            jobs_count: 0,
            active: true,
            slack_username: ""
        },
        onSubmit: async (values, {resetForm}) => {
          //alert(JSON.stringify(values, null, 2));
          await fetch('/api/v2/users', {
            method: 'POST',
            authorization: props.token,
            body: JSON.stringify(values)
          })
          .then(
            (res) => { 
              if (res.status === 200){
                setDisplayError('none');
                console.log(res);
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
          alignItems: 'center',
          padding:'50px'
        }}>
            <div css={{paddingBottom:'20px'}}>
                <h3 css={{color: '#df7861', display: 'inline'}}>Create a new user</h3>
                <Button 
                    onClick={()=> history.push(`/users`)}
                    outline
                    css={{
                        display: 'inline',
                        float: 'right',
                        color: '#df7861'
                    }}
                >Go Back</Button>
            </div>
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
            </FormGroup>
            <FormGroup row>
                <Label sm={3} for="first_name">First name</Label> 
                <Col sm={9}>
                <Input
                    id="first_name"
                    name="first_name"
                    type="first_name"
                    placeholder="Please enter your first_name"
                    onChange={formik.handleChange}
                    value={formik.values.first_name}
                />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label sm={3} for="last_name">Last name</Label> 
                <Col sm={9}>
                <Input
                    id="last_name"
                    name="last_name"
                    type="last_name"
                    placeholder="Please enter your last_name"
                    onChange={formik.handleChange}
                    value={formik.values.last_name}
                />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label sm={3} for="jobs_count">Job count</Label> 
                <Col sm={9}>
                <Input
                    id="jobs_count"
                    name="jobs_count"
                    type="jobs_count"
                    placeholder="Please enter your jobs_count"
                    onChange={formik.handleChange}
                    value={formik.values.jobs_count}
                />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label sm={3} for="active">active</Label> 
                <Col sm={9}>
                <Input
                    id="active"
                    name="active"
                    type="active"
                    placeholder="Please enter your active"
                    onChange={formik.handleChange}
                    value={formik.values.active}
                />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label sm={3} for="slack_username">Slack username</Label> 
                <Col sm={9}>
                <Input
                    id="slack_username"
                    name="slack_username"
                    type="slack_username"
                    placeholder="Please enter your slack_username"
                    onChange={formik.handleChange}
                    value={formik.values.slack_username}
                />
                </Col>
            </FormGroup>
            <p css={{display: displayError, color: 'red'}}>Please try again</p>
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



export default connect(mapStateToProps)(UserCreate);
