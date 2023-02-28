<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <router-link :to="{ name: 'HomePage' }" class="navbar-brand">ChatRooms</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link :to="{ name: 'ChatRooms' }" class="nav-link" active-class="active">Chat
                            Rooms</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'ActiveRooms' }" class="nav-link" active-class="active">Active
                            Rooms</router-link>
                    </li>
                </ul>
                <span class="text-light me-3">
                    {{ getUser?.name }}
                </span>
                <button @click="logout" class="btn btn-outline-danger">Sing out</button>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    methods: {
        logout() {
            this.$store.commit('logout')
            this.$router.push({ name: 'LoginPage' })
        }
    },
    computed: {
        ...mapGetters(['getUser'])
    }
}
</script>