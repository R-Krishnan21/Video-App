import React, {useState,useEffect} from 'react';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import AuthHandler from './Auth';

export default function Like(props) {
    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DislikeAction, setDislikeAction] = useState(null)
    const port = AuthHandler.port()

    let variable = { videoId: props.videoId, userId: AuthHandler.getUserID()}


    useEffect(() => {
        axios.post(`http://127.0.0.1:${port}/like/getLikes`, variable)
            .then(response => {
                console.log('getLikes',response.data)

                if (response.data.success) {
                    
                    setLikes(response.data.likes.length)

                    
                    response.data.likes.map(like => {
                        if (like.userId === props.userId) {
                            setLikeAction('liked')
                        }
                    })
                } else {
                    alert('Failed to get likes')
                }
            })

        axios.post(`http://127.0.0.1:${port}/dislike/getDislikes`, variable)
            .then(response => {
                console.log('getDislike',response.data)
                if (response.data.success) {
                    
                    setDislikes(response.data.dislikes.length)

                    response.data.dislikes.map(dislike => {
                        if (dislike.userId === props.userId) {
                            setDislikeAction('disliked')
                        }
                    })
                } else {
                    alert('Failed to get dislikes')
                }
            })

    }, [])

    const onLike = () => {
        if(AuthHandler.isLoggedIn()){

            if (LikeAction === null) {

                axios.post(`http://127.0.0.1:${port}/like/upLike`, variable)
                    .then(response => {
                        if (response.data.success) {

                            setLikes(Likes + 1)
                            setLikeAction('liked')

                            //If dislike button is already clicked

                            if (DislikeAction !== null) {
                                setDislikeAction(null)
                                setDislikes(Dislikes - 1)
                            }


                        } else {
                            alert('Failed to increase the like')
                        }
                    })


            } else {

                axios.post(`http://127.0.0.1:${port}/like/unLike`, variable)
                    .then(response => {
                        if (response.data.success) {

                            setLikes(Likes - 1)
                            setLikeAction(null)

                        } else {
                            alert('Failed to decrease the like')
                        }
                    })

            }
        } else {
            alert('Login to add like')
        }

    }


    const onDisLike = () => {

        if(AuthHandler.isLoggedIn()){

            if (DislikeAction !== null) {

                axios.post(`http://127.0.0.1:${port}/dislike/unDisLike`, variable)
                    .then(response => {
                        if (response.data.success) {

                            setDislikes(Dislikes - 1)
                            setDislikeAction(null)

                        } else {
                            alert('Failed to decrease dislike')
                        }
                    })

            } else {

                axios.post(`http://127.0.0.1:${port}/dislike/upDisLike`, variable)
                    .then(response => {
                        if (response.data.success) {

                            setDislikes(Dislikes + 1)
                            setDislikeAction('disliked')

                            //If dislike button is already clicked
                            if(LikeAction !== null ) {
                                setLikeAction(null)
                                setLikes(Likes - 1)
                            }

                        } else {
                            alert('Failed to increase dislike')
                        }
                    })

            }
        } else {
            alert('Login to add dislike')
        }

    }

    return (
        <div>
            <IconButton onClick={onLike}>
                {LikeAction === 'liked' ? <ThumbUpAltIcon color="secondary"/> : 
                <ThumbUpAltOutlinedIcon color="secondary"/>}
                
                <span>{Likes}</span>
            </IconButton>
            <IconButton onClick={onDisLike}>
                {DislikeAction === 'disliked' ? <ThumbDownAltIcon color="secondary"/> : 
                    <ThumbDownAltOutlinedIcon color="secondary"/>}
                <span>{Dislikes}</span>
            </IconButton>
        </div>
    )
}
