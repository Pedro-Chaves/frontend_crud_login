<template>
    <div class="edit-container">
        <h2 class="title">Edição de Usuário</h2>
        <hr>

        <div class="columns is-centered">
            <div class="column is-half">
                <transition name="fade">
                    <div v-if="error" class="notification is-danger">
                        {{ error }}
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

                <hr>

                <button class="button is-success is-fullwidth" @click="update">
                    {{ loading ? 'Atualizando...' : 'Editar' }}
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
            id: '',
            error: null,
            loading: false
        };
    },
    mounted() {
        this.fetchUserData();
    },
    methods: {
        async fetchUserData() {
            this.error = null;
            try {
                const response = await axios.get(`${process.env.VUE_APP_API_URL}/user/${this.$route.params.id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                const { name, email, id } = response.data.data;
                this.name = name;
                this.email = email;
                this.id = id;
            } catch (err) {
                console.error('Erro ao carregar os dados do usuário:', err);
                this.error = 'Não foi possível carregar os dados do usuário.';
            }
        },
        async update() {
            this.error = null;
            this.loading = true;

            try {
                await axios.put(
                    `${process.env.VUE_APP_API_URL}/user`,
                    { name: this.name, email: this.email, id: this.id },
                    { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
                );
                this.$router.push({ name: 'users' });
            } catch (err) {
                console.error('Erro ao atualizar o usuário:', err);
                this.error = err.response?.data?.message || 'Ocorreu um erro desconhecido.';
            } finally {
                this.loading = false;
            }
        }
    }
};
</script>

<style scoped>
.edit-container {
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
