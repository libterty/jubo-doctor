import http from '../common/http';

const OrderService = {
    getAll: (patientId, filters) => {
        const { page, limit, sort } = filters;
        console.log('patientId: ', patientId)
        return http
            .get(`/orders?patientId=${patientId}&page=${page}&limit=${limit}&sort=${sort}`)
            .then((res) => {
                console.log('d: ', res.data)
                return res.data;
            })
            .catch((e) => {
                return e.response.data;
            });
    },
    create: (patientId, data) => {
        data['patientId'] = patientId
        return http
            .post(`/orders`, data)
            .then((res) => {
                return res.data;
            })
            .catch((e) => {
                return e.response.data;
            });
    },
    update: (id, data) => {
        return http
            .put(`/orders/${id}`, data)
            .then((res) => {
                return res.data;
            })
            .catch((e) => {
                return e.response.data;
            });
    },
};
export default OrderService;
