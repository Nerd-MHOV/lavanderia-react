import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.10.85',
})

export const useFingerPrint = () => ({
    find: async () => {
        const response = await api.get('/find');
        return response.data;
    },
    find2: async () => {
        const response = await api.get('/find2')
        return response.data;
    },
    

    register: async () => {
        const response = await api.get('/register')
        return response.data
    },
    register2: async () => {
        const response = await api.get('/register2')
        return response.data
    },
    register3: async () => {
        const response = await api.get('/register3')
        return response.data
    },
    register4: async (id) => {
        const response = await api.get('/register4?param='+id)
        return response.data
    },




});