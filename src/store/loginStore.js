import { defineStore } from "pinia";

export const useLoginStore = defineStore('loginStore', {
    state: () => ({
        selectedBtn: null
    }),
    actions: {
        setSelectedBtn(option) {
            this.selectedBtn = option;
        }
    }
});