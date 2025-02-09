import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        currentUser: null,
        islogged: null
    }),
    actions: {
        login(user) {
            this.currentUser = user;
        },
        logout() {
            this.currentUser = null;
            this.isLogged = null;
        },
        stateLogged(state){
            this.islogged = state;
        }
    },
    getters: {
        isLoggedIn: state => !!state.currentUser,
        loggedInUser: state => state.currentUser
    }
});
