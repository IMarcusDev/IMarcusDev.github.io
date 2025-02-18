import { defineStore } from "pinia";

export const useStateStore = defineStore('estado', {
    state: () => ({
        currentUserType: sessionStorage.getItem('currentUserType') || null,
    }),
    actions: {
        login(userType) {
            this.currentUserType = userType;
            sessionStorage.setItem('currentUserType', userType);
        },
        logout() {
            this.currentUserType = null;
            sessionStorage.clear();
        }
    }
});