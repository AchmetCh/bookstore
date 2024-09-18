import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import {AiOutlineEdit} from 'react-icons/ai'
import {BsInfoCircle} from 'react-icons/bs'
import {MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md'

const Home = () => {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios.get('http://localhost:5555/books')
        .then(res => {
            setBooks(res.data.data)
            setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }, [])

  return (
    <div className='p-4'>
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Books</h1>
            <Link to="/books/create">
            <MdOutlineAddBox className="bg-yellow-500 hover:bg-blue-700 "/>
            </Link>
        </div>
        {loading ? (
            <Spinner />
        ): (
            <table className='w-full border-seperate border-spacing-2'>
                <thead> 
                    <tr>
                        <th className='border border-gray-300'>No</th>
                        <th className='border border-gray-300'>Title</th>
                        <th className='border border-gray-300'>Author</th>
                        <th className='border border-gray-300'>Publish Year</th>
                        <th className='border border-gray-300'>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => (
                        <tr key={book._id}>
                            <td className='border border-gray-300'>{index + 1}</td>
                            <td className='border border-gray-300'>{book.title}</td>
                            <td className='border border-gray-300'>{book.author}</td>
                            <td className='border border-gray-300'>{book.publishYear}</td>
                            <td className='flex justify-evenly border border-gray-300'>
                                <Link to={`/books/details/${book._id}`}>
                                <BsInfoCircle className='text-2x1 text-green-800' />
                                </Link>
                                <Link to={`/books/edit/${book._id}`}>
                                <AiOutlineEdit className='text-2xl text-blue-800'/>
                                </Link>
                                <Link to={`/books/delete/${book._id}`}>
                                <MdOutlineDelete className='text-2xl text-red-800'/>
                                </Link>
                            </td>
                            </tr>
                            ))}
                </tbody>
            </table>
        )}
    </div>
  )
}

export default Home