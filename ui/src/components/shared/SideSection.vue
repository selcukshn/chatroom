<template>
    <div class="list-group">
        <router-link :to="{ name: 'ChatRooms' }" class="list-group-item">Chat Rooms</router-link>
        <router-link :to="{ name: 'ActiveRooms' }" class="list-group-item">Active Rooms</router-link>
    </div>
</template>