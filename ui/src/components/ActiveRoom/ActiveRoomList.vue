<template>
    <div class="row row-cols-1 border rounded bg-white rounded-0">
        <active-room-item v-for="item in list" :key="item.roomId" :item="item"></active-room-item>
    </div>
</template>

<script>
import ActiveRoomItem from './ActiveRoomItem.vue'
export default {
    components: {
        ActiveRoomItem
    },
    props: {
        list: Array
    }
}
</script>