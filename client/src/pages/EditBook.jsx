import React, {useState, useEffect} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const EditBook = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [publishYear, setPublishYear] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()
    useEffect(() => {
        setLoading(true)
        axios.get(`http://localhost:5555/books/${id}`)
        .then(response => {
            setTitle(response.data.data.title)
            setAuthor(response.data.data.author)
            setPublishYear(response.data.data.publishYear)
            setLoading(false)
            })
            .catch(error => {
                console.error(error)
                })
    }, [])
    const handleEditBook = () => {
        const data = {
            title,
            author,
            publishYear
        }
        setLoading(true)
        axios.put(`http://localhost:5555/books/${id}`, data)
        .then(res => {
            setLoading(false)
            navigate('/')
            })
            .catch(err => {
                setLoading(false)
                console.log(err)
                })
    }
  return (
    <div className='p-4'>
        <BackButton />
        <h1 className='text-3xl font-bold mb-4'>Edit Book</h1>
        {loading ? <Spinner/> : ''}
        <form className='flex flex-col'>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value
            )} placeholder="Title" className='p-2 mb-4 border border-gray-400 rounded'/>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target
            .value)} placeholder="Author" className='p-2 mb-4 border border-gray-
            400 rounded'/>
            <input type="text" value={publishYear} onChange={(e) => setPublishYear
            (e.target.value)} placeholder="Publish Year" className='p-2 mb-4 border
            border-gray-400 rounded'/>
            <button type="button" onClick={handleEditBook} className='bg-blue-500 hover
            :bg-blue-700 text-white font-bold py-2 px-4 rounded'>Update Book
            </button>
        </form>
    </div>
  )
}

export default EditBook