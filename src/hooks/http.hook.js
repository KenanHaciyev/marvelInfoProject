import {useCallback, useState} from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method="GET", body=null, headers={"Content-type":"application/json"}) => {
        setLoading(true)
        try{
            const response = await fetch(url,{method, body, headers})
            if (!response.ok) {
                throw new Error(`Could not fetch url ${url}, error is: ${response.status}`)
            }
            const result = await response.json()
            setLoading(false)
            return result
        } catch(e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return {loading, error, request, clearError}
}
