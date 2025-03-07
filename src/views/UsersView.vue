<template>
    <div class="admin-container">
        <h2 class="title">Painel Admin</h2>
        <hr>

        <div class="columns is-centered">
            <div class="column is-three-quarters">
                <table class="table is-fullwidth is-striped is-hoverable">
                    <thead>
                        <tr>
                            <th class="has-text-centered">Nome</th>
                            <th class="has-text-centered">Email</th>
                            <th class="has-text-centered">Cargo</th>
                            <th class="has-text-centered">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id">
                            <td>{{ user.name }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ processRole(user.role) }}</td>
                            <td>
                                <router-link :to="{ name: 'edit', params: { id: user.id } }">
                                    <button class="button is-info">Editar</button>
                                </router-link>
                                <button class="button is-danger ml-2" @click="checkModal(user.id)" :disabled="loading">
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Modal de confirmação -->
        <transition name="fade">
            <div v-if="showModal" class="modal is-active">
                <div class="modal-background" @click="checkModal"></div>
                <div class="modal-content">
                    <div class="box">
                        <h2 class="subtitle has-text-weight-semibold has-text-dark">
                            Você deseja excluir este usuário?
                        </h2>
                        <p class="has-text-grey">Essa ação não pode ser desfeita.</p>
                        <div class="buttons is-right">
                            <button class="button is-danger" @click="deleteUser" :disabled="loading">
                                {{ loading ? 'Excluindo...' : 'Confirmar' }}
                            </button>
                            <button class="button" @click="checkModal">Cancelar</button>
                        </div>
                    </div>
                </div>
                <button class="modal-close is-large" aria-label="close" @click="checkModal"></button>
            </div>
        </transition>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            users: [],
            showModal: false,
            deleteUserId: null,
            loading: false,
        };
    },
    created() {
        this.fetchUsers();
    },
    methods: {
        async fetchUsers() {
            try {
                const req = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                };

                const res = await axios.get(`${process.env.VUE_APP_API_URL}/user`, req);
                this.users = res.data.data;
            } catch (err) {
                console.error("Erro ao buscar usuários:", err);
            }
        },
        processRole(role) {
            return role === 0 ? 'Usuário' : 'Admin';
        },
        checkModal(id = null) {
            this.showModal = !this.showModal;
            this.deleteUserId = id;
        },
        async deleteUser() {
            if (!this.deleteUserId) return;

            this.loading = true;

            try {
                const req = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                };

                await axios.delete(`${process.env.VUE_APP_API_URL}/user/${this.deleteUserId}`, req);

                this.users = this.users.filter(user => user.id !== this.deleteUserId);

                this.showModal = false;
            } catch (err) {
                console.error("Erro ao excluir usuário:", err);
            } finally {
                this.loading = false;
            }
        }
    }
};
</script>

<style scoped>
.admin-container {
    text-align: center;
    padding: 40px;
}

.title {
    color: #2c3e50;
}

.table th {
    text-align: center;
    font-weight: 600;
    color: #363636;
}

.modal-content {
    max-width: 400px;
    background: white;
    border-radius: 8px;
    padding: 20px;
}

.subtitle {
    font-size: 18px;
    font-weight: bold;
}

.ml-2 {
    margin-left: 8px;
}

/* Animação de fade como no login */
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>
