const login = {
    state: {
        isLogin: false // true为已经登录，false为没登录
    },
    mutations: {
        setIsLogin(state, isLogin) {
            state.isLogin = isLogin;
        },
        setToken(state, token) {
            state.token = token;
        }
    },
    actions: {

    },
}
export default login;