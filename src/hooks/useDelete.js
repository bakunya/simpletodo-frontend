import { useCallback, useEffect, useState } from 'react'
import axios from '../axios'

export default () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')

    const deleteData = useCallback(async (path) => {
        setLoading(true)
        setError(false)

        try {
            if(!path) throw Error('path not found')
            await axios.delete(path)
            setLoading(false)
            return Promise.resolve()
        } catch (er) {
            setError(true)    
            setMessage(er?.message ?? '')
            setLoading(false)
            console.log(`error delete at ${er.message}`)
            return Promise.reject()
        }

    }, [setLoading, setMessage, setError])

    const deleteDataEvent = useCallback((path) => (e) => {
        e?.preventDefault()
        deleteData(path)
    }, [deleteData])

    return { loading, error, message, deleteData, deleteDataEvent }
}