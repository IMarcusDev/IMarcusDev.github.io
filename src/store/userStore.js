import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        currentUser: sessionStorage.getItem('currentUser') || null,
        isLogged: JSON.parse(sessionStorage.getItem('isLogged')) || false
    }),
    actions: {
        login(username) {
            this.currentUser = username;
            this.isLogged = true;
            sessionStorage.setItem('currentUser', username);
            sessionStorage.setItem('isLogged', true);
        },
        logout() {
            this.currentUser = null;
            this.isLogged = false;
            sessionStorage.clear();
        }
    },
    getters: {
        isLoggedIn: state => !!state.currentUser,
        loggedInUser: state => state.currentUser
    }
});
