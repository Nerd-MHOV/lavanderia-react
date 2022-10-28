import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.10.85',
})

export const useFingerPrint = () => ({
    find: async (token) => {
        const response = await api.get('/find');
        return response.data;
    },
    find2: async (user, passwd) => {
        const response = await api.get('/find2')
        return response.data;
    },

});