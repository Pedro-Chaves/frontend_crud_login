<template>
    <div class="register-container">
        <h2 class="title">Registro de Usuários</h2>
        <hr>

        <div class="columns is-centered">
            <div class="column is-half">
                <transition name="fade">
                    <div v-if="error" class="notification is-danger">
                        {{ error }}
                    </div>
                </transition>

                <transition name="fade">
                    <div v-if="success" class="notification is-success">
                        {{ success }}
                    </div>
                </transition>

                <div class="field">
                    <label class="label">Nome</label>
                    <div class="control">
                        <input type="text" class="input" v-model="name" placeholder="Insira seu nome">
                    </div>
                </div>

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
                    @click="register" 
                    :disabled="loading"
                >
                    {{ loading ? 'Cadastrando...' : 'Cadastrar' }}
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
            name: '',
            email: '',
            password: '',
            error: null,
            success: null,
            loading: false
        };
    },
    methods: {
        async register() {
            this.loading = true;
            this.error = null;
            this.success = null;

            try {
                await axios.post(`${process.env.VUE_APP_API_URL}/user/create`, {
                    name: this.name,
                    email: this.email,
                    password: this.password
                });

                this.success = "Usuário cadastrado com sucesso!";
                
                this.name = '';
                this.email = '';
                this.password = '';

                setTimeout(() => {
                    this.success = null;
                    this.$router.push('/login'); 
                }, 3000);

            } catch (err) {
                this.error = err.response?.data?.message || 'Erro ao cadastrar usuário';

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
.register-container {
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
