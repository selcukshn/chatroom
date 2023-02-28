<template>
    <div class="login-container">
        <div class="card">
            <div class="card-header text-center">
                <h4>Login</h4>
            </div>
            <div class="card-body">
                <form>
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
                    <button @click="login" class="btn btn-primary w-100 mb-1" type="button">Login</button>
                    <router-link :to="{ name: 'RegisterPage' }">Create account</router-link>
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
                email: "selcukshn@gmail.com",
                password: "asdasd"
            }
        }
    },
    methods: {
        login() {
            this.$appAxios.get(`/users?email=${this.userData.email}&password=${this.userData.password}`)
                .then(response => {
                    if (response.data.length > 0) {
                        this.$store.commit('setUser', response.data[0])
                        this.$router.push({ name: 'HomePage' })
                    } else
                        alert("Bu e-posta ve şifre ile eşleşen kullanıcı bulunamadı")
                })

        }
    }
}
</script>
<style>
.login-container {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-container .card {
    width: 25%;
}
</style>