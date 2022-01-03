import { useCallback, useState } from 'react'
import axios from '../axios'

export default () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')

    const putData = useCallback(async (data, path) => {
        setLoading(true)
        setError(false)

        try {
            if(!path) throw Error('path not found')
            await axios.put(path, data)
            setLoading(false)
            return Promise.resolve()
        } catch (er) {
            setError(true)    
            setLoading(false)
            setMessage(er?.message ?? '')
            console.log(`error post at ${er.message}`)
            return Promise.reject()
        }


    }, [setLoading, setMessage, setError])

    const putDataEvent = useCallback((data) => (e) => {
        e?.preventDefault()
        putData(data)
    }, [putData])

    return { loading, error, message, putData, putDataEvent }
}