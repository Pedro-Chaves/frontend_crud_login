<template>
    <nav class="navbar">
        <router-link to="/">Home</router-link>
        <router-link to="/admin/users">Usuários</router-link>
        <router-link to="/register">Registrar</router-link>
        <router-link to="/login">Entrar</router-link>
    </nav>
</template>

<style scoped>
.navbar {
    background: #1e1e1e;
    padding: 20px;
    display: flex;
    justify-content: center;
    gap: 15px;
    border-bottom: 2px solid #42b983;
}

.navbar a {
    font-weight: bold;
    color: #ffffff;
    text-decoration: none;
    transition: color 0.3s;
}

.navbar a:hover {
    color: #42b983;
}

.navbar a.router-link-exact-active {
    color: #42b983;
}
</style>
