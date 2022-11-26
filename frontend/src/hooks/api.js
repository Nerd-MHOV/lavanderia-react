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

    collaborator: async () => {
        const response = await api.get('/collaborator');
        return response.data;
    },
    collaboratorPk: async (id) => {
        const response = await api.get('/collaborator/'+id)
        return response.data
    },
    department: async () => {
        const response = await api.get('/department');
        return response.data;
    },
    types: async () => {
        const response = await api.get('/producttype')
        return response.data;
    },
    services: async () => {
        const response = await api.get('/productservice')
        return response.data;
    },
    product: async () => {
        const response = await api.get('/product');
        return response.data;
    },
    createProduct: async (department, type, service, product, size, unitary_value) => {
        const response = await api.post('/product/create', {
            department, type, service, product, size, unitary_value
        })
        return response.data
    },
    debitCollaborator: async () => {
        const response = await api.get('/collaborator/debit');
        return response.data;
    },
    retreatCollaborator: async (id) => {
        const response = await api.get(`/collaborator/retreat/${id}`)
        return response.data;
    },
    collaboratorUpdate: async (id, department_id, collaborator, cpf, mensalista, active, fingerprint) => {
        const response = await api.post('/collaborator/update', {
            id, department_id, collaborator, cpf, mensalista, active, fingerprint
        })
        return response.data
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
    },


    fingerPosition: async () => {
        const response = await api.get('/config/fingercreate');
        return response.data;
    },  
    fingerRemoveNum: async (num) => {
        const response = await api.post('/config/fingerremovenum', {
            num
        });
        return response.data;
    },
    fingerDeleteCollaborator: async (param) => {
        const response = await api.post('/config/fingerrecovery', {param});
        console.log('DESTROy')
        return response.data;
    },

    returnFinger: async (output_id, responsible_out_id, user_id, amount_return, amount_bad, obs_out) => {
        const response = await api.post('/return/fingerprint', {output_id, responsible_out_id, user_id, amount_return, amount_bad, obs_out})
        return response.data;
    },

    createType: async (type) => {
        const response = await api.post('/producttype/create', {type})
        return response.data;
    },
    createService: async (service) => {
        const response = await api.post('/productservice/create', {service} )
        return response.data;
    }


});