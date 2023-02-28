<template>
    <div class="register-container">
        <div class="card">
            <div class="card-header text-center">
                <h4>Create account</h4>
            </div>
            <div class="card-body">
                <form>
                    <div class="form-floating mb-3">
                        <input v-model="userData.name" type="text" class="form-control" id="nameInput" placeholder="name">
                        <label for="nameInput">Enter name</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input v-model="userData.email" type="email" class="form-control" id="emailInput"
                            placeholder="name@example.com">
                        <label for="emailInput">Enter email address</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input v-model="userData.password" type="password" class="form-control" id="passwordInput"
                            placeholder="******">
                        <label for="passwordInput">Enter password</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input v-model="userData.repassword" type="password" class="form-control" id="repasswordInput"
                            placeholder="******">
                        <label for="repasswordInput">Enter password again</label>
                    </div>
                    <button @click="register" class="btn btn-primary w-100 mb-1" type="button">Register</button>
                    <router-link :to="{ name: 'LoginPage' }">Login</router-link>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userData: {
                name: null,
                email: null,
                password: null,
                repassword: null
            }
        }
    },
    methods: {
        register() {
            if (this.userData.password === this.userData.repassword)
                this.$appAxios.post('/users', this.userData)
                    .then(response => {
                        if (response.status === 201)
                            this.$router.push({ name: 'LoginPage' })
                    })
        }
    }
}
</script>

<style>
.register-container {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.register-container .card {
    width: 25%;
}
</style>