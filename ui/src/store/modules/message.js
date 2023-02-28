export default {
    state: {
        selectedRoom: {
            info: {},
            messages: []
        }
    },
    getters: {
        getSelectedRoom: state => state.selectedRoom
    },
    mutations: {
        addMessage(state, message) {
            state.selectedRoom.messages.push(message)
        }
    }
}