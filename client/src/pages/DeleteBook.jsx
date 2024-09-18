import React, {useState} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const DeleteBook = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()
    const handleDeleteBook = () => {
        setLoading(true)
        axios.delete(`http://localhost:5555/books/${id}`)
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
    <div className='p4-4'>
        <BackButton />
        <h1 className='text-3xl m-4'>Delete Book</h1>
        {loading ? <Spinner/> : ''}
        <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
            <h2 className='text-2xl font-bold mb-4'>Are you sure you </h2>
            <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-
            2 px-4 rounded' onClick={handleDeleteBook}>Yew, Delete itt </button>

        </div>
    </div>
  )
}

export default DeleteBook