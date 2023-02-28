<template>
    <div class="col-11 out-message ms-auto">
        <p class="message">{{ message.message }}</p>
        <p class="message-time">{{ message.time }}</p>
    </div>
</template>

<script>
export default {
    props: {
        message: Object
    }
}
</script>