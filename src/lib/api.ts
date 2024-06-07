import axios, { AxiosError } from 'axios'

interface AxiosErrorResponse {
    code?: string
}

export function setupApiClient() {
    const api = axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/`,
        withCredentials: true,
    })

    api.interceptors.response.use(
        (response) => {
            return response
        },
        (error: AxiosError<AxiosErrorResponse>) => {
            // console.log(error);

            if (error.response?.status === 401) {
                if (error.response?.data?.code === 'cookie-not-found') {
                    window.location.replace('/login')
                    //  router.push('/login')
                }
                // destroyCookie(ctx, 'userId')
            }

            return Promise.reject(error)
        },
    )

    return api
}
