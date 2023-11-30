export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'ziatker.kz',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            {
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: ''
            },
            {
                name: 'format-detection',
                content: 'telephone=no'
            }
    ],
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico'
            },
    ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '@/assets/fonts/Raleway/raleway.css',
        '@/assets/css/responsive/main.scss',
        '@/assets/main.scss',
        '@/assets/css/responsive/responsive-mobile.css',
  ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        {
            src: '@/plugins/v-mask.js',
            mode: 'client',
        },
        {
            src: '@/plugins/route.js',
            mode: 'client',
        },
        {
            src: '@/plugins/loginApp.js',
            mode: 'client',
        },
        {
            src: '@/plugins/customAxios.js',
            mode: 'client',
        },
  ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
  ],

    axios: {
        baseURL: 'http://127.0.0.1:8000/api',
        //        baseURL: 'http://ust-backend/api',
        retry: true,
    },

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
        '@nuxtjs/auth-next',
    '@nuxtjs/axios',
  ],

    auth: {
        strategies: {
            'laravelJWT': {
                provider: 'laravel/jwt',
                url: '/',
                endpoints: {
                    login: {
                        url: '/auth/login',
                        method: 'post',
                        propertyName: false
                    },
                    logout: {
                        url: '/auth/logout',
                        method: 'post',
                        propertyName: false
                    },
                    refresh: {
                        url: '/auth/refresh',
                        method: 'post',
                        propertyName: false
                    },
                    user: {
                        url: '/auth/user',
                        method: 'get',
                        propertyName: false
                    }
                },
                token: {
                    property: 'access_token',
                    maxAge: 60 * 60
                },
                refreshToken: {
                    maxAge: 20160 * 60
                },
            },
        },
        redirect: {
            login: '/',
        },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        transpile: [
    'defu'
  ],
        babel: {
            compact: true,
        },
    }
}
