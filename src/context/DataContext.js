import { createContext, useState, useEffect } from 'react';
import Post from "../Post";
import PostLayout from "../PostLayout";
import {format} from "date-fns";
import api from "../api/posts"
import EditPost from "../EditPost";
import useWindowSize from "../hooks/useWindowSize";
import useAxiosFetch from "../hooks/useAxiosFetch";
import { useNavigate } from 'react-router-dom';
/* import useAxiosFetch from '../hooks/useAxiosFetch';
 */
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    /* const [posts, setPosts] = useState([])
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

    useEffect(() => {
        setPosts(data);
    }, [data])

    useEffect(() => {
        const filteredResults = posts.filter((post) =>
            ((post.body).toLowerCase()).includes(search.toLowerCase())
            || ((post.title).toLowerCase()).includes(search.toLowerCase()));

        setSearchResults(filteredResults.reverse());
    }, [posts, search])
 */
    const [posts,setPosts] = useState([])
  const [search,setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [postTitle,setPostTitle] = useState('')
  const [postBody,setPostBody] = useState('')
  const [editTitle,setEditTitle] = useState('')
  const [editBody,setEditBody] = useState('')
  const navigate = useNavigate()
  const {width} = useWindowSize()
  const {data , fetchError, isLoading } = useAxiosFetch('http://localhost:3000/posts');

  useEffect(() => {
    setPosts(data);
  },[data])

  useEffect(() =>{
    const filteredResults = posts.filter((post) => ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()));
    setSearchResults(filteredResults.reverse());
  }, [posts, search])
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try{
      const response = await api.post('/posts', newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigate('/')
    } catch(err){
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else{
        console.log(`Error: ${err.message}`);
      }
    }       
  }

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
        const response = await api.put(`/posts/${id}`, updatedPost);
        setPosts(posts.map(post => post.id === id ? { ...response.data } : post));
        setEditTitle('');
        setEditBody('');
        navigate('/');
    } catch (err) {
        console.log(`Error: ${err.message}`);
    }
  }  

  const handleDelete = async (id) => {
    try {
        await api.delete(`/posts/${id}`);
        const postsList = posts.filter(post => post.id !== id);
        setPosts(postsList);
        navigate('/');
    } catch (err) {
        console.log(`Error: ${err.message}`);
    }
}
  
    return (
        <DataContext.Provider value={{
            search, setSearch,
            searchResults, fetchError, isLoading,
            posts, setPosts, width, handleSubmit,postTitle, setPostTitle, postBody,setPostBody,handleEdit,editBody, setEditBody,handleDelete,
            editTitle, setEditTitle
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;