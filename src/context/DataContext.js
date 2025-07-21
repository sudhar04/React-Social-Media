import { createContext, useState, useEffect } from 'react';
//import Post from "../Post";
//import PostLayout from "../PostLayout";
import {format} from "date-fns";
//import api from "../api/posts"
//import EditPost from "../EditPost";
import useWindowSize from "../hooks/useWindowSize";
//import useAxiosFetch from "../hooks/useAxiosFetch";
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
  //const {data , fetchError, isLoading } = useAxiosFetch('http://localhost:3000/posts');

  useEffect(() => {
    const stored = localStorage.getItem("posts");
    setPosts(stored ? JSON.parse(stored) : []);
  },[]);

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
      //const response = await api.post('/posts', newPost);
      const allPosts = [...posts, newPost];
      setPosts(allPosts);
      localStorage.setItem("posts",JSON.stringify(allPosts));
      setPostTitle('');
      setPostBody('');
      navigate('/')
      };
        

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
       /*  const response = await api.put(`/posts/${id}`, updatedPost);
        setPosts(posts.map(post => post.id === id ? { ...response.data } : post)); */
        const updatedPosts = posts.map(post => post.id === id ? updatedPost : post);
        setPosts(updatedPosts);
        localStorage.setItem("posts",JSON.stringify(updatedPosts));
        setEditTitle('');
        setEditBody('');
        navigate('/');
  };  

  const handleDelete = async (id) => {
        //await api.delete(`/posts/${id}`);
        const updatedPosts = posts.filter(post => post.id !== id);
        setPosts(updatedPosts);
        localStorage.setItem("posts",JSON.stringify(updatedPosts));
        navigate('/');
};
  
    return (
        <DataContext.Provider value={{
            search, setSearch,
            searchResults,
            posts, setPosts, width, handleSubmit,postTitle, setPostTitle, postBody,setPostBody,handleEdit,editBody, setEditBody,handleDelete,
            editTitle, setEditTitle
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;