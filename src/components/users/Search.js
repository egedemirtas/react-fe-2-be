import React, { useContext, useState } from 'react'
import GithubContext from '../../context/github/githubContext';

const Search = () => {
    const githubContext = useContext(GithubContext)

    // state and the function to change that state (this is for singular state usage). And then the default value for the state
    const [text, setText] = useState('');

    /*if you udont use arrow functiom, then you have to call it with: <form onSubmit={this.onSubmit.bind(this)} className="form">
    onSubmit(e){
        e.preventDefault();
        console.log(this.state)
    }
    */

    const onSubmit = (e) => {
        e.preventDefault();
        if (!text) {
            githubContext.showAlert();
        } else {
            githubContext.searchUsers(text)
            setText(e.target.value)
        }

    }

    const onChange = (e) => {
        // this is also fine but if you had text fro name, surname, emailt etc, you need to make different onChanges for each different text..
        // this.setState({ text: e.target.value })
        // this.setState({ [e.target.name]: e.target.value })
        setText(e.target.value)
    };

    return (
        <div className="bg-light container" style={{ padding: '0 1rem 1rem 1rem' }}>
            <form onSubmit={onSubmit} className="form">
                <input type="text" name="text" placeholder="Search Users..." value={text || ''} onChange={onChange} ></input>
                <input type="submit" value="Search" className="btn btn-success btn-block" style={{ margin: '0.1rem 0' }}></input>
            </form>
            <button className="btn btn-dark btn-block" onClick={githubContext.clearUsers}>Clear</button>
        </div>
    )

}

export default Search