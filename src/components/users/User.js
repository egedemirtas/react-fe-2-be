import React, { Fragment, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Spinner } from '../layout/Spinner';
import { Link } from 'react-router-dom';

const User = ({ user, loading, getUser, getUserRepos, repos }) => {
    const { login } = useParams();

    useEffect(() => {
        getUser(login)
    }, []);

    const {
        id,
        avatar_url,
        html_url,
        name,
        company,
        blog,
        location,
        email,
        hireable,
        bio,
        twitter_username,
        public_repos,
        public_gists,
        followers,
        following,
        created_at,
        updated_at } = user;

    if (loading) {
        return (<Spinner />);
    } else {
        return (
            <Fragment>
                <div className='container'>
                    <div className='card'>
                        <div><img src={avatar_url} className='round-img' alt='' style={{ width: '175px', float: 'left', margin: '0rem 1rem 0rem 0rem' }}></img></div>
                        <div>
                            <h1 >{name}</h1>
                            <h2 > {location}</h2>
                            {bio && <p>{bio}</p>}
                        </div>

                        {company && <><strong>Company: </strong>{company}</>}
                        {blog && <><strong style={ {display:'block'} }>Blog: <a href={blog}>{blog}</a></strong></>}
                        <div>
                            <div className='badge badge-success'>Folowers: {followers}</div>
                            <div className='badge badge'>Following: {following}</div>
                            <div className='badge badge-danger'>Repos: {public_repos}</div>
                            <div className='badge badge-dark'>Gists: {public_gists}</div>
                        </div>

                    </div>
                    <Link to='/' className='btn btn-light ' style={ {float:'right'} }>Back</Link>
                </div>
            </Fragment>
        );
    }

}


export default User





