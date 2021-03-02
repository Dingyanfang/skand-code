import React, { useEffect, useState } from "react";
import { useParams, useHistory } from 'react-router-dom'
import { connect } from 'react-redux';
/** @jsx jsx */
import { jsx } from '@emotion/react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import * as actionType from '../../store/actions';

const UserView = (props) => {
    const currentUserId = useParams().id;
    const [userData, setUserDate] = useState({}); 
    const history = useHistory();

    useEffect(() => {
        async function getSingleUser(){
            try {
                await fetch(`/api/v2/users/${currentUserId}`, {
                    headers: {
                        method:'GET',
                        authorization: props.token
                    }
                })
                .then(
                    (res) => {
                        setUserDate(JSON.parse(res._bodyInit).users);
                        //console.log(JSON.parse(res._bodyInit).users)
                    }
                )
            }
            catch (ex) {
                console.log(ex);
            }
        }
        getSingleUser();
    }, []);


    return (
        <div
            css={{
                backgroundColor:'#fcf8e8',
                height: "100vh",
                width: '100vw',
                padding: '50px'
            }}
        >
            {props.token === '' ?
                (
                    <div>
                    <p>Please login first.</p>
                    <Button color="secondary" onClick={()=> history.push(`/login`)}>Login</Button>
                </div>
                ) :
                (
                    <div>
                        <div css={{paddingBottom:'20px'}}>
                            <h3 css={{color: '#df7861', display: 'inline'}}>Single User details</h3>
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

                        <ListGroup>
                            <ListGroupItem>id: {userData.id}</ListGroupItem>
                            <ListGroupItem>Email: {userData.email}</ListGroupItem>
                            <ListGroupItem>Job count: {userData.jobs_count}</ListGroupItem>
                            <ListGroupItem>Active: {userData.active ? 'True' : 'False'}</ListGroupItem>
                        </ListGroup>
                    </div>
                )
            }
            
        </div>
    )
}


const mapStateToProps = state => {
    return {
      token: state.authReducer.token
    }
  }



export default connect(mapStateToProps)(UserView);
