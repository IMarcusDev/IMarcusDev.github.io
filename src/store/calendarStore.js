import { defineStore } from 'pinia';

export const useCalendarStore = defineStore('calendar', {
    state: () => ({
        selectedDate: null,
        selectedTimeSlot: null,
        selectedTime: null
    }),
    actions: {
        setSelectedDate(date) {
            this.selectedDate = date;
        },
        setSelectedTimeSlot(timeSlot) {
            this.selectedTimeSlot = timeSlot;
        },
        setSelectedTime(time) {
            this.selectedTime = time;
        }
    }
});
