import React, {useContext, useState} from 'react'
import classes from './PostForm.module.css'
import DefaultInput from '../Input/DefaultInput';
import DefaultButton from '../Button/DefaultButton';
import {AuthContext} from "../../../Context";

const PostForm = ({Create}) => {
    const {userId} = useContext(AuthContext)
    const [post,setPost] = useState({id: Date.now(),title: '', text: '', userId: userId})
    const Update = (e) => {
        e.preventDefault()
        Create(post)
        setPost({title: '', text: '', userId: userId})
    }
    return(
        <form className={classes.postForm}>
                <DefaultInput placeholder='Title' value={post.title} 
                    onChange={e=>setPost({...post, title:e.target.value})}  
                    style={{ display: 'block' }}/>
                <DefaultInput placeholder='Text' value={post.text} 
                    onChange={e=>setPost({...post, text:e.target.value})}     
                    style={{ display: 'block' }}/>
                <DefaultButton onClick={Update}>Create</DefaultButton>
        </form>
    )
}

export default PostForm;