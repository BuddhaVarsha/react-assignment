import { useEffect, useState } from "react";
import {DataGrid} from '@mui/x-data-grid';
// import {Posts} from './Posts';

const PostsTable = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        //fetching ddata from the API and convert it to an array of posts objects
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((data) => {
            const convertedPosts = data.map((post: { id: any; title: any; body: any; }) => ({

                id : post.id,
                title : post.title,
                body : post.body,
            }));
            setPosts(convertedPosts);
        })
        .catch((error) => console.error('Error occurred while fetching data : ', error));
    }, []);

    const columns = [
        {field : 'id', headerName : 'ID', width : 100},
        {field : 'title', headerName : 'Title', width : 250},
        {field : 'body', headerName : 'Body', flex : 1},
    ];

    return(
        <div style={{height: 400, width: '100%'}}>
            <DataGrid rows={posts} columns={columns} />
        </div>
    );
};

export default PostsTable;