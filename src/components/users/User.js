import React, { Fragment, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Spinner } from '../layout/Spinner';
import { Link } from 'react-router-dom';
import Repos from '../repos/Repos';

const User = ({ user, loading, getUser, getUserRepos, repos }) => {
    const { login } = useParams();

    useEffect(() => {
        getUser(login);
        getUserRepos(login);
        // eslint-disable-next-line
    }, []);

    const {
        avatar_url,
        html_url,
        name,
        company,
        blog,
        location,
        hireable,
        bio,
        public_repos,
        public_gists,
        followers,
        following
    } = user;

    if (loading) {
        return (<Spinner />);
    } else {
        return (
            <Fragment>
                <div className='container'>
                    <div style={{ padding: '2rem 2rem', display: 'grid', gridTemplateColumns: '15rem auto' }}>
                        <div style={{ width: '13rem' }}>
                            <img src={avatar_url} className='round-img' alt='' ></img>
                        </div>
                        <div>
                            <h1>{name} {hireable ? (<i className='fas fa-check text-success'></i>) : (<i className='fas fa-times-circle text-danger'></i>)}</h1>
                            <h2>{location}</h2>
                            {bio && <p>{bio}</p>}
                            {company && <><strong>Company: </strong>{company}</>}
                            {blog && <><strong style={{ display: 'block' }}>Blog: <a href={blog}>{blog}</a></strong></>}
                            {html_url && <><strong style={{ display: 'block' }}><a href={html_url}>Visit GitHub</a></strong></>}
                            <div>
                                <div className='badge badge-success'>Folowers: {followers}</div>
                                <div className='badge badge'>Following: {following}</div>
                                <div className='badge badge-danger'>Repos: {public_repos}</div>
                                <div className='badge badge-dark'>Gists: {public_gists}</div>
                            </div>
                        </div>
                        <div>

                        </div>
                    </div>
                    <Repos repos={repos} />
                    <Link to='/' className='btn btn-light ' style={{ float: 'right' }}>Back</Link>
                </div>
            </Fragment>
        );
    }

}


export default User





