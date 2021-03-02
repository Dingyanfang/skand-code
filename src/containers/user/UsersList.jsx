import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Button } from 'reactstrap';
/** @jsx jsx */
import { jsx } from '@emotion/react';
import * as actionType from '../../store/actions';

const UsersList = (props) => {
    const [users, setUsers] = useState([]);
    const history = useHistory();
    //console.log(props.token);
    useEffect(() => {
        async function getUsers(){
            //console.log(props.token);
            try {
                fetch('/api/v2/users', {
                    method: 'GET',
                    headers: {
                        authorization: props.token,
                    }
                })
                .then(
                    (res) => {
                        props.setUserList(JSON.parse(res._bodyText).users);
                        setUsers(JSON.parse(res._bodyText).users.map(
                            item => {
                                item.key = item.id;
                                return item
                            }
                        ));
                    }
                )
            }
            catch (ex) {
                console.log(ex);
            }
        }
        getUsers();
    }, []);

    const handleNewUser = () => {
        history.push("/users/create");
    }

    const handleView = (user) => {
        const userId = user.id;
        history.push(`/users/${userId}/view`);
    }

    const handleEdit = (user) => {
        const userId = user.id;
        history.push(`/users/${userId}/edit`);
    }



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
                
                (<div>
                    <p>Please login first.</p>
                    <Button color="secondary" onClick={()=> history.push(`/login`)}>Login</Button>
                </div>
                ):
                (<div>
                    <div css={{paddingBottom:'20px'}}>
                        <h3 css={{color: '#df7861', display: 'inline'}}>User Table</h3>
                        <Button 
                            onClick={handleNewUser}
                            outline
                            css={{
                                display: 'inline',
                                float: 'right',
                                color: '#df7861'
                            }}
                        >Create a new user</Button>
                    </div>
                    <Table bordered hover>
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Jobs Count</th>
                            <th>Active</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {users.map((item) => {
                            return (
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.jobs_count}</td>
                                    <td>{item.active.toString()}</td>
                                    <td><Button color='link' onClick={() => handleView(item)}>View</Button></td>
                                    <td><Button color='link' onClick={() => handleEdit(item)}>Edit</Button></td>
                                    
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                </div>)
            }
            
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
        setUserList: (data) => dispatch({type: actionType.USERLIST, users:data})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);

