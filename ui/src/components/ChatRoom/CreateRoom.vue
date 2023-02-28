<template>
    <div ref="createRoomModal" class="modal fade" id="createRoomModal" tabindex="-1" aria-labelledby="createRoomModalLabel"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="createRoomModalLabel">Create new room</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label class="form-label">Room name</label>
                            <input v-model="roomData.name" type="text" placeholder="Enter room name" class="form-control">
                        </div>
                        <div>
                            <label class="form-label">Room description</label>
                            <input v-model="roomData.description" type="text" placeholder="Enter room description"
                                class="form-control">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button @click="createRoom" type="button" class="btn btn-primary">Create</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            roomData: {
                userId: null,
                name: null,
                description: null,
                joinedUser: 0
            }
        }
    },
    methods: {
        createRoom() {
            this.roomData.userId = this.getUserId
            this.$appAxios.post('/rooms', this.roomData)
                .then(response => {
                    if (response.status === 201) {
                        this.$socket.emit('ROOM_CREATED', response.data)
                        const modal = bootstrap.Modal.getInstance(this.$refs.createRoomModal);
                        modal.hide();
                    }
                })
        }
    },
    computed: {
        ...mapGetters(['getUserId'])
    }
}
</script>