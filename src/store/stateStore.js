import { defineStore } from "pinia";

export const useStateStore = defineStore('estado', {
    state: () => ({
        currentUserType: null,
    }),
    actions: {
        login(estado) {
            this.currentUserType = estado;
        },
        logout() {
            this.currentUserType = null;
        }
    }
});