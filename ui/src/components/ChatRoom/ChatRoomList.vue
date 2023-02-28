<template>
    <div class="row mb-3">
        <div class="col-12">
            <button class="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#createRoomModal">
                Create room
            </button>
        </div>
        <create-room></create-room>
    </div>
    <hr>
    <div class="row row-cols-4 g-2">
        <chat-room-item v-for="item in list" :key="item.id" :item="item"></chat-room-item>
    </div>
</template>

<script>
import ChatRoomItem from './ChatRoomItem.vue';
import CreateRoom from './CreateRoom.vue';
export default {
    props: {
        list: Array
    },
    components: {
        ChatRoomItem,
        CreateRoom
    }
}
</script>