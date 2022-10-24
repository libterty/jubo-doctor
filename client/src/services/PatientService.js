import http from '../common/http';
const PatientService = {
    getAll: async () => {
        return await http
            .get('/patients')
            .then((res) => {
                return res.data;
            })
            .catch((e) => {
                console.trace('e', e)
                return e.response.data;
            });
    },
};
export default PatientService;
