<template>
    <outgoing-message v-if="message.userId == getUserId" :message="message"></outgoing-message>
    <incoming-message v-else :message="message"></incoming-message>
</template>
<script>
import { mapGetters } from 'vuex';
import IncomingMessage from './message/IncomingMessage.vue'
import OutgoingMessage from './message/OutgoingMessage.vue'

export default {
    computed: {
        ...mapGetters(['getUserId'])
    },
    components: {
        IncomingMessage,
        OutgoingMessage
    },
    props: {
        message: Object
    }
}
</script>