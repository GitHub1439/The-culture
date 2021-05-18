const user = {
    state: {
        user: [],
        userInformation: [],
    },
    mutations: {
        SET_USER(state, val) {
            console.log(val)
            state.user = val;
        },
        SET_USER_INFORMATION(state, val) {
            state.userInformation = val
        },
        SET_TOKEN(state, val){
            state.user.access_token = val
        }
    },
    actions: {

    },
}
export default user;