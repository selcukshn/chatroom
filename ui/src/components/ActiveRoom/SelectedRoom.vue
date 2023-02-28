<template>
    <div class="row border selected-room-info bg-white p-2 rounded-0">
        <div class="col-12 d-flex justify-content-between align-items-center">
            <h5 class="m-0">{{ selectedRoom.info.name }}</h5>
            <button class="btn"><i class="bi bi-gear-fill"></i></button>
        </div>
        <div class="col-12 d-flex align-items-center">
            <h6 class="m-0">
                <span class="text-muted">Creator</span>
                <span class="ms-1" style="font-size: 0.9rem;">@{{ selectedRoom.info.user.name }}</span>
            </h6>
            <span class="mx-1">|</span>
            <p class="m-0" style="font-size: 0.9rem;">Ahmet,mehmet,ali,ayşe,fatma,hayriye and 30 more joiner</p>
        </div>
    </div>
    <div class="row flex-column align-items-end chat-screen bg-light">
        <div class="col-12 flex-grow-1">
            <div class="row">
                <selected-room-message v-for="message in selectedRoom.messages" :key="message.id"
                    :message="message"></selected-room-message>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12 p-0">
            <div class="input-group">
                <input v-model="messageText" type="text" class="form-control rounded-0" placeholder="Write message">
                <button @click="sendMessage" class="btn btn-primary rounded-0">Send</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SelectedRoomMessage from './SelectedRoomMessage.vue'
export default {
    data() {
        return {
            messageText: null,
        }
    },
    methods: {
        sendMessage() {
            if (this.messageText)
                this.$appAxios.post(`/messages`, {
                    roomId: this.selectedRoom.info.id,
                    userId: this.getUserId,
                    message: this.messageText,
                    time: new Date().getTime()
                }).then(response => {
                    if (response.status === 201) {
                        this.$socket.emit('MESSAGE_SENDED', {
                            ...response.data,
                            user: this.getUser
                        })
                        this.$store.commit('addMessage', response.data)
                    }
                })
        }
    },
    computed: {
        ...mapGetters(['getUserId', 'getUser'])
    },
    components: {
        SelectedRoomMessage
    },
    props: {
        selectedRoom: Object
    }
}
</script>

<style>
#app {
    height: 100vh;
}

.layout,
.active-rooms,
.selected-room {
    height: 100%;
}

.container {
    height: calc(100% - 56px);
}

.chat-screen {
    height: calc(100% - (64px + 38px));
    overflow-y: scroll;
}

.in-message {
    background-color: #F5F5F5;
    border: 1px solid #E0E0E0;
}

.out-message {
    background-color: #E3F2FD;
    border: 1px solid #BBDEFB;
}

.out-message,
.in-message {
    padding: 0.6rem;
    border-radius: 6px;
    margin: 0.5rem;
}

.sender {
    margin: 0;
    font-size: 0.8rem;
    color: #212121;
    font-weight: 600;
}

.message {
    margin: 0 0 0.2rem;
    font-size: 0.9rem;
    color: #464646;
}

.message-time {
    margin: 0;
    font-size: 0.75rem;
    color: #616161;
}

.out-message .message-time {
    text-align: start;
}

.in-message .message-time {
    text-align: end;
}
</style>