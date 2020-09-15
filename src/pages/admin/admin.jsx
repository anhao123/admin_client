import React, {Component} from "react";
import {connect} from "react-redux"
 import {Redirect} from "react-router-dom";

 class Admin extends Component{
    render() {
        return(
            <div>
                {
                  this.props.user._id? null: <Redirect to='/login' />
                }
                admin
            </div>
        )
    }
}

export default connect(
    state=>({user:state.login_user}),{

    }
)(Admin)