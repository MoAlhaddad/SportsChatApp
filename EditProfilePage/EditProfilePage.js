import React, { Component } from 'react';
import Form from '../generalSubComponents/Form/Form';
import SocialMediaForm from '../userSubComponents/SocialMediaForm/SocialMediaForm';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './EditProfilePage.css';

class EditProfilePage extends Component {
    constructor() {
        super();
        this.state = {
            socialMediaClicked: false,
        }
    }
    redirect = (path) => {
        this.props.history.push(path);
    }
    render() {
        const { socialMediaClicked } = this.state;
        return (
            <div className='edit-profile-container' >
                <h1>Edit Profile</h1>
                <div className='edit-profile-wrapper'>
                    <Form forEdit={true} redirect={this.redirect}/>
                </div>
                <button onClick={() => this.setState({socialMediaClicked: !this.state.socialMediaClicked})}>Social Media</button>
                <div className='edit-profile-social-media-wrapper' style={{display: socialMediaClicked ? 'inline-block' : 'none'}}>
                    <div>
                    <h1>Edit Social Media</h1>
                    <SocialMediaForm />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser
    }
}

export default withRouter(connect(mapStateToProps)(EditProfilePage));