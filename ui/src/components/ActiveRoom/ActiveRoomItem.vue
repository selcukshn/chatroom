<template>
    <div @click="selectRoom" class="col border-bottom py-2 room-list-item">
        <div class="row g-0 mb-1">
            <div class="col-10">
                <h6 class="m-0">{{ item.room.name }}</h6>
            </div>
            <div class="col-2 d-flex justify-content-end align-items-start">
                <div class="d-flex align-items-end text-muted" style="font-size: 0.8rem;">
                    <i class="bi bi-people-fill" style="margin-right: 2px;"></i>
                    <span class="fw-bold">{{ item.room.joinedUser }}</span>
                </div>
            </div>
        </div>

        <div class="row g-0">
            <div class="col-10">
                <p class="last-message">{{ item.room.description }}</p>
            </div>
            <div class="col-2 d-flex justify-content-end align-items-start">
                <span class="last-message-time">02:58</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        selectRoom() {
            this.$store.commit('setSelectedRoom', this.item.roomId)
        }
    },
    props: {
        item: Object
    }
}
</script>

<style>
.room-list-item {
    cursor: pointer;
}

.room-list-item:hover {
    background-color: var(--bs-light);
}

.room-list-item .last-message,
.room-list-item .last-message-time {
    margin: 0;
    font-size: 0.8rem;
    color: var(--bs-secondary);
}
</style>