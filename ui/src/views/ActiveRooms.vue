<template>
    <div class="row active-rooms">
        <div class="col-3">
            <active-room-list :list="list"></active-room-list>
        </div>
        <div class="col-9 selected-room">
            <selected-room v-if="renderMessages" :selectedRoom="getSelectedRoom"></selected-room>
            <div v-else class="alert alert-info">
                Sohbete başlamak için oda seçiniz
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ActiveRoomList from '../components/ActiveRoom/ActiveRoomList.vue'
import SelectedRoom from '../components/ActiveRoom/SelectedRoom.vue'
export default {
    data() {
        return {
            list: [],
            renderMessages: false,
        }
    },
    created() {
        this.$appAxios.get(`/usersrooms?_expand=room&_expand=user&userId=${this.getUserId}`)
            .then(response => {
                this.list = [...response.data]
            });
    },
    mounted() {
        this.$socket.on('MESSAGE_RECEIVE', data => {
            this.getSelectedRoom.messages.push(data)
        })
    },
    methods: {
        joinRoom(roomId) {
            this.$socket.emit('ROOM_JOINED', roomId)
            this.getSelectedRoomInfo(roomId)
            this.getMessages(roomId)
        },
        getSelectedRoomInfo(roomId) {
            this.$appAxios.get(`/rooms?id=${roomId}&_expand=user`)
                .then(response => {
                    this.getSelectedRoom.info = { ...response.data[0] }
                })
        },
        getMessages(roomId) {
            this.$appAxios.get(`/messages?roomId=${roomId}&_expand=user`)
                .then(response => {
                    this.getSelectedRoom.messages = [...response.data]
                    this.renderMessages = true
                })
        },
    },
    watch: {
        getUserSelectedRoomId: {
            deep: true,
            handler(roomId) {
                if (roomId)
                    this.joinRoom(roomId)
            }
        }
    },
    computed: {
        ...mapGetters(['getUserId', 'getUserSelectedRoomId', 'getSelectedRoom'])
    },
    components: {
        ActiveRoomList,
        SelectedRoom
    },
    unmounted() {
        this.$store.commit('setSelectedRoom', null)
        this.$socket.emit('ROOM_LEAVED', this.getSelectedRoom.info.id)
        this.getSelectedRoom.info = {};
        this.getSelectedRoom.messages = [];
    }
}
</script>