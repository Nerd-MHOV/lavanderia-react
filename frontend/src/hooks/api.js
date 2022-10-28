import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3333',
})

export const useApi = () => ({
    validateToken: async (token) => {
        const response = await api.post('/user/validate', { token });
        return response.data;
    },
    login: async (user, passwd) => {
        const response = await api.post('/user/login', { user, passwd }).then((response) => {

            return response.data;
        }).catch((err) => {
            return {message: {
                type: "error",
                message: "Servidor fora do ar"
            }}
        })
        return response
    },
    logout: async (token) => {
        const response = await api.post('/user/logout', {token});
        return response.data;
    },


    department: async () => {
        const response = await api.get('/department');
        return response.data;
    },
    product: async () => {
        const response = await api.get('/product');
        return response.data;
    },
    debitCollaborator: async () => {
        const response = await api.get('/collaborator/debit');
        return response.data;
    },


    retreat: async (arr) => {
        const response = await api.post('/output/retreat', {arr});
        return response.data;
    },
    retreatFinger: async (form, collaborator) => {
        const response = await api.post('/output/retreatfinger', {form, collaborator});
        return response.data;
    },
    fingerFind: async (str) => {
        const response = await api.get(`/fingerprint/${str}`);
        return response.data;
    }



});