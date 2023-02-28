import { createStore } from 'vuex'
import auth from './modules/auth.js'
import message from './modules/message.js'

const store = createStore({
    state: {
        user: null,
        userJoinedRooms: [],
        selectedRoomId: null
    },
    getters: {
        getUser: state => state.user,
        getUserId: state => state.user ? state.user.id : null,
        userIsAuth: state => state.user !== null,
        getUserJoinedRooms: state => state.userJoinedRooms,
        getUserSelectedRoomId: state => state.selectedRoomId
    },
    mutations: {
        setUser: (state, data) => {
            state.user = { ...data }
        },
        logout: (state) => {
            state.user = null
        },
        setUserJoinedRooms(state, data) {
            state.userJoinedRooms = [...data]
        },
        setSelectedRoom(state, roomId) {
            state.selectedRoomId = roomId
        }
    },
    modules: {
        auth,
        message
    }
})

export default store;