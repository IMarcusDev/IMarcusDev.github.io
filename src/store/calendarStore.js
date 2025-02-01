import { defineStore } from 'pinia';

export const useCalendarStore = defineStore('calendar', {
    state: () => ({
        selectedDate: null,
        selectedTimeSlot: null
    }),
    actions: {
        setSelectedDate(date) {
            this.selectedDate = date;
        },
        setSelectedTimeSlot(timeSlot) {
            this.selectedTimeSlot = timeSlot;
        }
    }
});
