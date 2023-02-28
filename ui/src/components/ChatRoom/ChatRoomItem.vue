<template>
    <div class="col">
        <div class="room bg-white" :class="{ 'room-joined': alreadyJoined }">
            <div class="room-header">
                <div class="d-flex flex-column gap-1">
                    <div class="d-flex align-items-center">
                        <span class="badge bg-warning text-dark me-1"><i class="bi bi-fire"></i></span>
                        <h5>{{ item.name }} </h5>
                    </div>
                    <div class="d-flex align-items-center text-muted">
                        <i class="bi bi-people-fill" style="margin-right: 2px;"></i>
                        <h6>6</h6>
                    </div>
                </div>
            </div>
            <div class="room-body">
                <p class="mb-2">{{ item.description }}</p>
                <button v-if="!alreadyJoined" @click="joinRoom" class="btn btn-outline-success btn-sm">Join
                    <i class="bi bi-caret-right"></i>
                </button>
                <span v-else class="badge bg-danger">Already joined</span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    methods: {
        joinRoom() {
            if (confirm("Bu odaya katılmak istediğinizden emin misiniz?")) {
                this.$appAxios.post('/usersrooms', {
                    userId: this.getUserId,
                    roomId: this.item.id
                }).then(response => {
                    if (response.status === 201)
                        this.$router.push({ name: 'ActiveRooms' })
                })
            }
        }
    },
    computed: {
        alreadyJoined() {
            return this.getUserJoinedRooms.find(x => x.roomId == this.item.id)
        },
        ...mapGetters(['getUserId', 'getUserJoinedRooms'])
    },
    props: {
        item: Object
    }
}
</script>

<style>
.room h1,
.room h2,
.room h3,
.room h4,
.room h5,
.room h6,
.room p {
    margin: 0;
    padding: 0;
}

.room {
    display: flex;
    flex-direction: column;
    border: 1px solid #BDBDBD;
    border-radius: 5px;
}

.room-joined,
.room-joined .room-header {
    border-color: #EF9A9A;
}

.room-header {
    border-bottom: 1px solid #BDBDBD;
}

.room-body,
.room-header {
    padding: 0.6rem 0.8rem;
}
</style>