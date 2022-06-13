import axios from 'axios';

const axiosServiceCreator = {
    createService: (baseUrl, endpoint) => {
        const url = `${baseUrl}/${endpoint}`;

        function callApi({method = 'GET', paramPath = '', body}) {
            return axios({
                method,
                url: `${url}/${paramPath}`,
                data: body,
            }).catch((error) => {
                console.log(error);
            });
        }

        return {
            get: ({paramPath, body} = {}) => {
                return callApi({method: 'GET', paramPath, body});
            },
            post: ({paramPath, body}) => {
                return callApi({method: 'POST', paramPath, body});
            },
            put: ({paramPath, body}) => {
                return callApi({method: 'PUT', paramPath, body});
            },
            patch: ({paramPath, body}) => {
                return callApi({method: 'PATCH', paramPath, body});
            },
            delete: ({paramPath, body}) => {
                return callApi({method: 'DELETE', paramPath, body});
            },
        };
    },
};

export default axiosServiceCreator;
