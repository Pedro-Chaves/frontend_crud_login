<template>
    <div class="login-container">
        <h2 class="title">Login</h2>
        <hr>

        <div class="columns is-centered">
            <div class="column is-half">
                <transition name="fade">
                    <div v-if="error" class="notification is-danger">
                        {{ error }}
                    </div>
                </transition>

                <div class="field">
                    <label class="label">Email</label>
                    <div class="control">
                        <input type="email" class="input" v-model="email" placeholder="emailqualquer@email.com">
                    </div>
                </div>

                <div class="field">
                    <label class="label">Senha</label>
                    <div class="control">
                        <input type="password" class="input" v-model="password" placeholder="********">
                    </div>
                </div>

                <hr>

                <button 
                    class="button is-success is-fullwidth" 
                    @click="login" 
                    :disabled="loading"
                >
                    {{ loading ? 'Entrando...' : 'Entrar' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            email: '',
            password: '',
            error: null,
            loading: false
        };
    },
    methods: {
        async login() {
            this.loading = true;
            this.error = null;

            try {
                const res = await axios.post(`${process.env.VUE_APP_API_URL}/user/login`, {
                    email: this.email,
                    password: this.password
                });

                localStorage.setItem('token', res.data.data.token);
                this.$router.push({ name: 'home' });

            } catch (err) {
                this.error = err.response?.data?.message || 'Erro ao fazer login';
                
                setTimeout(() => {
                    this.error = null;
                }, 3000);
            } finally {
                this.loading = false;
            }
        }
    }
};
</script>

<style scoped>
.login-container {
    text-align: center;
    padding: 40px;
}

.title {
    color: #2c3e50;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>
