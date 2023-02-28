<template>
    <chat-room-list :list="list"></chat-room-list>
</template>

<script>
import { mapGetters } from 'vuex';
import ChatRoomList from '../components/ChatRoom/ChatRoomList.vue'
export default {
    data() {
        return {
            list: []
        }
    },
    created() {
        this.$appAxios.get('/rooms')
            .then(response => {
                if (response.data.length > 0)
                    this.list = [...response.data]
            });
        this.$appAxios.get(`/usersrooms?userId=${this.getUserId}`)
            .then(response => {
                this.$store.commit('setUserJoinedRooms', (response.data))
            })
    },
    mounted() {
        this.$socket.on('ROOM_CREATE', (data) => {
            this.list.push(data)
        })
    },
    computed: {
        ...mapGetters(['getUserId'])
    },
    components: {
        ChatRoomList
    }
}
</script>