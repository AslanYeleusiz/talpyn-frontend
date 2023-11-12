export default ({
    $axios,
    store,
    app
}, inject) => {

    const api = $axios.create();
    var token = localStorage.getItem('access_token');

    //strat request
    api.interceptors.request.use(config => {
        if (token) config.headers.authorization = `Bearer ${token}`
        return config

    }, error => {

    });

    //end request
    api.interceptors.response.use(config => {
        if (token) config.headers.authorization = `Bearer ${token}`
        return config

    }, error => {
        //        console.log(error);
        if (error.response.data.message === 'Token has expired') {
            app.$auth.refreshTokens().then(res => {
                localStorage.setItem('access_token', res.data.access_token)
                token = res.data.access_token
                error.config.headers.authorization = `Bearer ${res.data.access_token}`
            }).catch(error => {
                console.log(error)
            });
            return api.request(error.config)
        }

        return Promise.reject(error);
    });
    inject('api', api)
}
