import React, { Component } from 'react';
import { connect } from 'react-redux';
import IoSocialTwitterOutline from 'react-icons/lib/io/social-twitter-outline';
import IoSocialFacebookOutline from 'react-icons/lib/io/social-facebook-outline';
import IoSocialInstagramOutline from 'react-icons/lib/io/social-instagram-outline';
import IoSocialSnapchatOutline from 'react-icons/lib/io/social-snapchat-outline';
import IoSocialRedditOutline from 'react-icons/lib/io/social-reddit-outline';
import IoSocialTwitchOutline from 'react-icons/lib/io/social-twitch-outline';
import IoPlaystation from 'react-icons/lib/io/playstation';
import IoXbox from 'react-icons/lib/io/xbox';
import MdAdd from 'react-icons/lib/md/add';
import './SocialMediaForm.css';
import axios from 'axios';

class SocialMediaForm extends Component {
    constructor() {
        super();
        this.state = {
            twitter: '',
            facebook: '',
            instagram: '',
            snapchat: '',
            reddit: '',
            twitchtv: '',
            playstation: '',
            xbox: '',
            twitterFocused: false,
            facebookFocused: false,
            instagramFocused: false,
            redditFocused: false,
            twitchtvFocused: false,
            playstationFocused: false,
            xboxFocused: false
        }
    }
    handleCrteTwitterChange(val) {
        this.setState({twitter: val});
    }
    handleCrteFacebookChange(val) {
        this.setState({facebook: val});
    }
    handleCrteInstagramChange(val) {
        this.setState({instagram: val});
    }
    handleCrteSnapchatChange(val) {
        this.setState({snapchat: val});
    }
    handleCrteRedditChange(val) {
        this.setState({reddit: val});
    }
    handleCrteTwitchTvChange(val) {
        this.setState({twitchtv: val});
    }
    handleCrtePlaystationChange(val) {
        this.setState({playstation: val});
    }
    handleCrteXboxChange(val) {
        this.setState({xbox: val});
    }
    addTwitter(e) {
        e.preventDefault();
        console.log('add Twitter hit0-------------');
        e.preventDefault();
        const { twitter } = this.state;
        console.log('twitter hit------------------');
        if(twitter.includes('twitter')) {
            axios.post('/api/social-media/twitter', { twitter })
            .then(res => {
                this.setState({twitterFocused: false, twitter: ''});
                alert(res.data.message);
            }).catch(err => console.log('Axios Social Links Error-----------', err));
        }
    }
    addFacebook(e) {
        e.preventDefault();
        const { facebook } = this.state;
        if(facebook.includes('facebook')) {
            axios.post('/api/social-media/facebook', { facebook })
            .then(res => {
                this.setState({facebookFocused: false, facebook: ''});
                alert(res.data.message);
            }).catch(err => console.log('Axios Social Links Error-----------', err));
        }
    }
    addInstagram(e) {
        e.preventDefault(); 
        const { instagram } = this.state;
        if(instagram.includes('instagram')) {
            axios.post('/api/social-media/instagram', { instagram })
            .then(res => {
                this.setState({instagramFocused: false, instagram: ''});
                alert(res.data.message);
            }).catch(err => console.log('Axios Social Links Error-----------', err));
        }
    }
    addSnapchat(e) {
        e.preventDefault();
        const { snapchat } = this.state;
        if(snapchat.includes('snapchat')) {
            axios.post('/api/social-media/snapchat', { snapchat })
            .then(res => {
                this.setState({snapchatFocused: false, snapchat: ''});
                alert(res.data.message);
            }).catch(err => console.log('Axios Social Links Error-----------', err));
        }
    }
    addTwitchTv(e) {
        e.preventDefault();
        const { twitchtv } = this.state;
        if(twitchtv.includes('twitchtv')) {
            axios.post('/api/social-media/twitchtv', { twitchtv })
            .then(res => {
                this.setState({twitchtvFocused: false, twitchtv: ''});
                alert(res.data.message);
            }).catch(err => console.log('Axios Social Links Error-----------', err));
        }
    }
    addPlaystation(e) {
        e.preventDefault();
        const { playstation } = this.state;
        if(playstation.includes('playstation')) {
            axios.post('/api/social-media/playstation', { playstation })
            .then(res => {
                this.setState({playstationFocused: false, playstation: ''});
                alert(res.data.messasge);
            }).catch(err => console.log('Axios Social Links Error-----------', err));
        }
    }
    addReddit(e) {
        e.preventDefault();
        const { reddit } = this.state;
        if(reddit.includes('reddit')) {
            axios.post('/api/social-media/reddit', { reddit })
            .then(res => {
                this.setState({redditFocused: false, reddit: ''});
                alert(res.data.message);
            }).catch(err => console.log('Axios Social Links Error-----------', err));
        }
    }
    addXbox(e) {
        e.preventDefault();
        const { xbox } = this.state;
        if(xbox.includes('xbox')) {
            axios.post('/api/social-media/xbox', { xbox })
            .then(res => {
                this.setState({xboxFocused: false, xbox: ''});
                alert(res.data.message);
            }).catch(err => console.log('Axios Social Links Error-----------', err));
        }
    }
    render() {
        const { twitter, twitterFocused, facebook, facebookFocused, instagram, instagramFocused, snapchat, snapchatFocused, 
            reddit, redditFocused, twitchtv, twitchtvFocused, playstation, playstationFocused, xbox, xboxFocused } = this.state;
        return (
            <form className='social-media-form' >
                <div className='social-icon-div'>
                    <IoSocialTwitterOutline className='social-icon'/>
                    <input type='text' onChange={(e) => this.handleCrteTwitterChange(e.target.value)} value={twitter}
                    onFocus={() => this.setState({twitterFocused: true})} />
                    <button className='social-add-button' onClick={(e) => this.addTwitter(e)} style={{display: twitterFocused ? 'inline-block' :  'none'}}>
                        <MdAdd  className='social-add-icon'/>
                    </button>
                </div>
                <div className='social-icon-div'>
                    <IoSocialFacebookOutline className='social-icon' />
                    <input type='text' onChange={(e) => this.handleCrteFacebookChange(e.target.value)} value={facebook}
                    onFocus={() => this.setState({facebookFocused: true})} />
                    <button className='social-add-button' onClick={(e) => this.addFacebook(e)} style={{display: facebookFocused ? 'inline-block' :  'none'}}>
                        <MdAdd  className='social-add-icon'/>
                    </button>
                </div>
                <div className='social-icon-div'>
                    <IoSocialInstagramOutline className='social-icon' />
                    <input type='text' onChange={(e) => this.handleCrteInstagramChange(e.target.value)} value={instagram}
                    onFocus={() => this.setState({instagramFocused: true})}  />
                    <button className='social-add-button' onClick={(e) => this.addInstagram(e)} style={{display: instagramFocused ? 'inline-block' :  'none'}}>
                        <MdAdd  className='social-add-icon'/>
                    </button>
                </div>
                <div className='social-icon-div'>
                    <IoSocialSnapchatOutline  className='social-icon'/>
                    <input type='text' onChange={(e) => this.handleCrteSnapchatChange(e.target.value)} value={snapchat}
                    onFocus={() => this.setState({snapchatFocused: true})} />
                    <button className='social-add-button' onClick={(e) => this.addSnapchat(e)} style={{display: snapchatFocused ? 'inline-block' :  'none'}}>
                        <MdAdd  className='social-add-icon'/>
                    </button>
                </div>
                <div className='social-icon-div'>
                    <IoSocialRedditOutline  className='social-icon'/>
                    <input type='text' onChange={(e) => this.handleCrteRedditChange(e.target.value)} value={reddit}
                    onFocus={() => this.setState({redditFocused: true})} />
                    <button className='social-add-button' onClick={(e) => this.addReddit(e)} style={{display: redditFocused ? 'inline-block' :  'none'}}>
                        <MdAdd  className='social-add-icon'/>
                    </button>
                </div>
                <div className='social-icon-div'>
                    <IoSocialTwitchOutline  className='social-icon'/>
                    <input type='text' onChange={(e) => this.handleCrteTwitchTvChange(e.target.value)} value={twitchtv}
                    onFocus={() => this.setState({twitchtvFocused: true})} />
                    <button className='social-add-button' onClick={(e) => this.addTwitchTv(e)} style={{display: twitchtvFocused ? 'inline-block' :  'none'}}>
                        <MdAdd  className='social-add-icon'/>
                    </button>
                </div>
                <div className='social-icon-div'>
                    <IoPlaystation  className='social-icon'/>
                    <input type='text' onChange={(e) => this.handleCrtePlaystationChange(e.target.value)} value={playstation}
                    onFocus={() => this.setState({playstationFocused: true})} />
                    <button className='social-add-button' onClick={(e) => this.addPlaystation(e)} style={{display: playstationFocused ? 'inline-block' :  'none'}}>
                        <MdAdd  className='social-add-icon'/>
                    </button>
                </div>
                <div className='social-icon-div'>
                    <IoXbox  className='social-icon'/>
                    <input type='text' onChange={(e) => this.handleCrteXboxChange(e.target.value)} value={xbox}
                    onFocus={() => this.setState({xboxFocused: true})} />
                    <button className='social-add-button' onClick={(e) => this.addXbox(e)} style={{display: xboxFocused ? 'inline-block' :  'none'}}>
                        <MdAdd className='social-add-icon'/>
                    </button>
                </div>
            </form>  
        );
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.user.currentUser
    }
}

export default connect(mapStateToProps)(SocialMediaForm);