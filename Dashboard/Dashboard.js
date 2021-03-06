import React, { Component } from 'react';
import axios from 'axios';
import Loader from '../generalSubComponents/Loader/Loader';
import Popup from '../generalSubComponents/Popup/Popup';
import PostPopup from './PostPopup/PostPopup';
import EditPostContainer from './EditPostContainer';
import PlayerCard from '../userSubComponents/PlayerCard/PlayerCard';
import TeamCard from '../userSubComponents/TeamCard/TeamCard';
import SocialMediaSection from '../userSubComponents/SocialMediaSection/SocialMediaSection';
// import { editPost, doneEditPost } from '../../redux/reducers/postReducer';
import { loginUser } from '../../redux/reducers/userReducer';
import { postFinished } from '../../redux/reducers/postReducer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import defaultPicture from '../../imgs/default-picture.jpg';
import GoGear from 'react-icons/lib/go/gear';
import './Dashboard.css';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            posts: [],
            isProfile: false,
            edit: true
        }
        // this.linkFunc = this.linkFunc.bind(this);
    }
    componentDidMount() {
        console.log('componentDidMOunt Dashbaord hit');
        const { currentUser, dispatch } = this.props;
        console.log('Current User-----------', currentUser);
        if(currentUser) {
            const axiosUserRequest = axios.get('/api/user-data');
            const axiosPostRequest = axios.get('/api/user-posts');
            // axios.get('/api/user-posts')
            // .then(res => {
            //     console.log('Axios hit-------');
            //     console.log(res.data.posts);
            // }).catch(err => console.log('Axios get user posts error---------', err));
            Promise.all([axiosUserRequest, axiosPostRequest])
            .then(res => {
                console.log('Axios hit------------');
                console.log('res[0]user-----------', res[0].data.user);
                dispatch(loginUser(res[0].data.user));
                // console.log(res[0].data.user);
                this.setState({posts: res[1].data.posts, loading: false});
            }).catch(err => console.log('Axios Dashboard All Error----------', err));
            window.location.href === `${window.location.origin}/dashboard` 
            ? this.setState({isProfile: true}) 
            : this.setState({isProfile: false});
        } else {
            this.setState({loading: false});
        }
    }
    deletePost() {
        const { title, sport, user_id, id, description, tags } = this.props; 
        if(window.confirm('You are sure you want to delete this post?')) {
            axios.delete(`/api/posts`, {
                data: {title, sport, user_id, description, id, tags }
            })
            .then(res => {
                console.log(res.data.message);
            }).catch(err => console.log('Axios Delete Error----------', err));
        } else {

        }
    }
    linkFunc = (path) => {
        this.props.history.push(path);
    }
    reRender = () => {
        this.setState({loading: true});
        axios.get('/api/user-posts')
        .then(res => {
            console.log(res);
            this.setState({posts: res.data.posts, loading: false});
        }).catch(err => console.log('Axios get user posts error---------', err));
    }

    render() {
            const { currentUser, doEditPost, createdPost } = this.props;
            // const { dispatch } = this.props;
            const { posts, loading, isProfile } = this.state;
            console.log('doEditPost------------', doEditPost);
            console.log('posts dashboard----------------', posts)
            if(!loading) {
                if(currentUser) {
                    //If a post was created display a popup before returning a dashboard.
                    if(createdPost) {
                        setTimeout(() => {
                            const { dispatch } = this.props;
                            dispatch(postFinished());
                        }, 5000);
                        return <Popup userUpdate={true}>
                                    <PostPopup {...createdPost} />
                                </Popup>
                    }
                    //
                    return (
                        <div className='dashboard-container-div'>
                            <div className='dashboard-user-div'>
                                <div className='dashboard-user-img-div'>
                                    <img className='dashboard-user-img' 
                                    src={currentUser.image || defaultPicture} alt={currentUser.username} />
                                    <p>{currentUser.username && currentUser.username}</p>
                                    <GoGear onClick={() => this.linkFunc(`/edit_profile`)} className='gear' style={{display: isProfile ? 'inline-block' : 'none'}}/>
                                </div>
                                <div className='dashboard-user-info-div'>
                                    <div className='dashboard-user-info-wrapper'>
                                        <SocialMediaSection />
                                        <p className='dashboard-user-info-text'>
                                        Email: {currentUser.email && currentUser.email}
                                        </p>
                                        <p className='dashboard-user-info-text'>
                                        Age: {currentUser.age && currentUser.age}
                                        </p>
                                        <p className='dashboard-user-info-text'>
                                        Favorite League: {currentUser.favorite_sport && currentUser.favorite_sport}
                                        </p>
                                        
                                        <p className='dashboard-user-info-text'>Favorite Players: </p>
                                        {currentUser.favorite_players && currentUser.favorite_players.map((player, i) => {
                                            return <PlayerCard key={i} {...player} />
                                        })}
                                        <p className='dashboard-user-info-text'>Favorite Teams: </p>
                                        {currentUser.favorite_teams && currentUser.favorite_teams.map((team, i) => {
                                            return <TeamCard key={i} {...team} />
                                        })}
                                    </div>
                                </div>
                            </div>
                            {posts && posts.map((post, i) => {
                                return (
                                <div className='dashboard-post-container-div' key={i}>
                                    <EditPostContainer post={post} reRender={this.reRender} linkFunc={this.linkFunc}/>
                                </div>
                                );
                                }
                            )}
                        </div>
                );
            } else {
                return <Popup />
            }
        } else {
            return <Loader />
        }
    }
}

const mapStateToProps = state => {
    return {
        createdPost: state.post.createdPost,
        currentUser: state.user.currentUser,
        doEditPost: state.post.doEditPost
    }
}
export default withRouter(connect(mapStateToProps)(Dashboard));