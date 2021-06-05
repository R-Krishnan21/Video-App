import React, {useState} from 'react';
import Navbar from './Navbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import AuthHandler from './Auth';
import { Redirect } from 'react-router';

const Private = [
    { value: 'Private', label:'Private'},
    { value: 'Public', label:'Public'}
]

const Catogory = [
    { value: "Film & Animation", label: "Film & Animation" },
    { value: "Autos & Vehicles", label: "Autos & Vehicles" },
    { value: "Music", label: "Music" },
    { value: "Gaming", label: "Gaming" },
    { value: "Sports", label: "Sports" }
]


export default function Upload(props) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [privacy, setPrivacy] = useState("Private");
    const [categories, setCategories] = useState("");
    const [FilePath, setFilePath] = useState("")
    const [Duration, setDuration] = useState("")
    const [Thumbnail, setThumbnail] = useState("")
    const port = AuthHandler.port()


    const handleChangeTitle = ( event ) => {
        setTitle(event.target.value)
    }

    const handleChangeDecsription = (event) => {
        setDescription(event.target.value)
    }

    const handleChangeOne = (event) => {
        setPrivacy(event.target.value)
    }

    const handleChangeTwo = (event) => {
        setCategories(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const variables = {
            writer: AuthHandler.getUserID(),
            title: title,
            description: description,
            privacy: privacy,
            filePath: FilePath,
            category: categories,
            duration: Duration,
            thumbnail: Thumbnail
        }
        axios({
            method:'post',
            url:`http://127.0.0.1:${port}/video/uploadVideo`, 
            data: variables,
            headers: {
              Authorization: `Bearer ${AuthHandler.getLoginToken()}`
            }
        })
            .then(response => {
                alert('video Uploaded Successfully')
                props.history.push('/')
            }).catch( err => {
                console.log(err)
            })
        
    }
    const onDrop = (files) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])

        axios.post(`http://127.0.0.1:${port}/video/uploadfiles`, formData, config)
            .then(response => {
                if (response.data.success) {

                    let variable = {
                        filePath: response.data.filePath,
                        fileName: response.data.fileName
                    }
                    setFilePath(response.data.filePath)

                    //gerenate thumbnail with this filepath ! 

                    axios.post(`http://127.0.0.1:${port}/video/thumbnail`, variable)
                        .then(response => {
                            if (response.data.success) {
                                setDuration(response.data.fileDuration)
                                setThumbnail(response.data.thumbsFilePath)
                            } else {
                                alert('Failed to make the thumbnails');
                            }
                        })


                } else {
                    alert('failed to save the video in server')
                }
            })

    }
    return (
        <div>
            <Navbar/>
            <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <Typography variant="h2"> Upload Video</Typography>
                </div>

                <form onSubmit={onSubmit}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Dropzone
                            required
                            onDrop={onDrop}
                            multiple={false}
                            maxSize={800000000}>
                            {({ getRootProps, getInputProps }) => (
                                <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    {...getRootProps()}
                                >
                                    <input {...getInputProps()} />
                                    <AddIcon style={{ fontSize: '3rem' }} />

                                </div>
                            )}
                        </Dropzone>

                        {Thumbnail !== "" &&
                            <div>
                                <img src={`http://localhost:${port}/${Thumbnail}`} alt="haha" />
                            </div>
                        }
                    </div>

                    <br /><br />
                    <label>Title</label>
                    <TextField
                        onChange={handleChangeTitle}
                        value={title}
                        variant="outlined" 
                        fullWidth
                        required
                        size="small"
                    />
                    <br /><br />
                    <label style={{textAlign: "left"}}>Description</label>
                    <TextField
                        onChange={handleChangeDecsription}
                        value={description}
                        variant="outlined" 
                        fullWidth
                        required
                        size="small"
                    />
                    <br /><br />
                    <Select
                        fullWidth
                        value={privacy}
                        onChange={handleChangeOne}
                        >
                        {Private.map((item, index) => (
                            <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                        ))}
                    </Select>
                    <br /><br />
                    <Select
                        required
                        fullWidth
                        value={categories}
                        onChange={handleChangeTwo}
                        >
                        {Catogory.map((item, index) => (
                            <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                        ))}
                    </Select>
                    <br /><br />

                    <Button type="submit" variant="contained" size="large" color="secondary">
                        Submit
                    </Button>

                </form>
            </div>
        </div>
    )
}
