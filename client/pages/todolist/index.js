import React from 'react'
import { showTodo } from '../function/apicall'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

const index = () => {

    const getData = async () => {
        const response = await showTodo()
        console.log("Show response...", response);
        return response?.todos
    }

    const { isLoading, isError, data: tododata } = useQuery({
        queryKey: ["tododata"],
        queryFn: getData
    })

    if (isLoading) {
        return <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>Loading...</h1>
    }

    return (
        <>
            <div style={{ marginTop: '100px' }}>
                <Link href='/addtodo'><button>Addtodo</button></Link>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tododata?.map((value, index) => {
                            return (
                                <>
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{value?.title}</td>
                                        <td>{value?.description}</td>
                                        <td><button>Edit</button></td>
                                        <td><button>Delete</button></td>
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default index
