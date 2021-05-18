const getters = {
    isLogin: state => state.login.isLogin, // 是否登录
    keepAlive: state => state.keepAlive.keepAlive,
    user: state => state.user.user,
    userInformation: state => state.user.userInformation,
};
export default getters