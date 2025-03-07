<template>
  <div class="home">
    <img v-if="showLogo" alt="Vue logo" src="@/assets/images/logo.png" class="logo">
    <h1>Bem-vindo ao Sistema CRUD usando Vue</h1>
    <p>Gerencie seus usuários de forma fácil e rápida.</p>
    <router-link to="/login" class="btn">Começar</router-link>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      showLogo: true
    };
  }
}
</script>

<style scoped>
.home {
  text-align: center;
  padding: 40px;
}

.logo {
  width: 150px;
  margin-bottom: 20px;
}

h1 {
  font-size: 2rem;
  color: #42b983;
}

p {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 20px;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  background: #42b983;
  color: white;
  text-decoration: none;
  font-weight: bold;
  border-radius: 5px;
  transition: background 0.3s;
}

.btn:hover {
  background: #36976b;
}
</style>
