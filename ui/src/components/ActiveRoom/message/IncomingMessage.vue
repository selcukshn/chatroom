<template>
    <div class="col-11 in-message">
        <p class="sender">@{{ message.user.name }}</p>
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