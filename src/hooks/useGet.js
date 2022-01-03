import { useCallback, useEffect, useState } from 'react'
import axios from '../axios'

export default (path) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState('')
    const [data, setData] = useState(null)

    const getData = useCallback(async (path) => {
        setLoading(true)
        setError(false)

        try {
            if(!path) throw Error('path not found')
            const res = await axios.get(path)
            setData(res?.data)
        } catch (er) {
            setError(true)    
            setMessage(er?.message ?? '')
            console.log(`error get at ${er.message}`)
        } finally {
            setLoading(false)
        }

    }, [setLoading, setMessage, setError])

    const getDataEvent = useCallback((data) => (e) => {
        e?.preventDefault()
        getData(data)
    }, [getData])

    useEffect(async () => {
        await getData(path)
    }, [path])

    return { loading, error, message, data, getData, getDataEvent }
}