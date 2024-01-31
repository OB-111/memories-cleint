import React,{useState,useRef} from 'react';
import {Typography,TextField,Button} from '@material-ui/core'
import {useDispatch} from'react-redux';
import  useStyles from './styles'
import { commentPost } from '../../actions/posts';
const CommentsSection = ({post}) => {
    const user = JSON.parse(localStorage.getItem("profile"));
    const classes = useStyles();
    const dispatch = useDispatch();
    const [comments,setComments] = useState(post?.comments);
    const [comment,setComment] = useState('');
    const commentsRef = useRef();

    const handelClick = async() => {
        const finalComment = `${user?.result?.name}: ${comment}`;
        const newComments = await dispatch(commentPost(finalComment,post._id));
        setComment('');
        setComments(newComments);
        commentsRef.current.scrollIntoView({behavior:'smooth'});
    }
  return (
    <div>
        <div classes = {classes.commentsOuterContainer}>
            <div classes = {classes.commentsInnerContainer}>
                <Typography gutterBottom varirant = "h6">Comments</Typography>
                {comments.map((comment,index) => (<Typography key={index} gutterBottom variant="subtitle1"><strong>{comment?.split(': ')[0]}</strong>{comment?.split(':')[1]}</Typography>))}  
                <div ref = {commentsRef}/>
                </div>  
                {user?.result?.name &&(
                <div style={{width:'70%'}}>
                <Typography gutterBottom varirant = "h6">Write a comment.</Typography>
                <TextField fullWidth rows={4} variant='outlined' label='Comment' value={comment} onChange={(e) => setComment(e.target.value)}/>
                <Button style={{marginTop:'10px'}} fullWidth disabled = {!comment} variant='contained' onClick = {handelClick} color ="primary">Commment</Button>
                </div>
                )}
            </div>

        </div>

  )
}

export default CommentsSection