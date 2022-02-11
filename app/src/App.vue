<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <div class="container-fluid">
        <div v-if="currentUser" class="navbar-nav ml-auto">
          <a href="/" class="navbar-brand">iAnt</a>
          <div class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link to="/home" class="nav-link">
                <font-awesome-icon icon="home" /> Home
              </router-link>
            </li>
            <li class="nav-item">
              <router-link v-if="currentUser" to="/tutorials" class="nav-link"
                >Tutorials</router-link
              >
            </li>
          </div>
        </div>

        <div v-if="!currentUser" class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link to="/register" class="nav-link">
              <font-awesome-icon icon="user-plus" /> Sign Up
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link">
              <font-awesome-icon icon="sign-in-alt" /> Login
            </router-link>
          </li>
        </div>

        <div v-if="currentUser" class="navbar-nav ml-auto">
          <div class="dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDarkDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <font-awesome-icon icon="user" />
              {{ currentUser.username }}
            </a>
            <ul
              class="dropdown-menu dropdown-menu-dark dropdown-menu-end"
              aria-labelledby="dropdownMenuButton1"
            >
              <li>
                <router-link v-if="currentUser" to="/user" class="dropdown-item"
                  >My Board</router-link
                >
              </li>
              <li v-if="showModeratorBoard">
                <router-link to="/mod" class="dropdown-item"
                  >Moderator Board</router-link
                >
              </li>
              <li v-if="showAdminBoard">
                <router-link to="/admin" class="dropdown-item"
                  >Admin Board</router-link
                >
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <router-link to="/profile" class="dropdown-item">
                  <font-awesome-icon icon="user" />
                  {{ currentUser.username }}
                </router-link>
              </li>
              <li>
                <a class="dropdown-item" @click.prevent="logOut">
                  <font-awesome-icon icon="sign-out-alt" /> LogOut
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <div class="container mx-auto mt-3 border p-3">
      <router-view />
    </div>
  </div>
  <transition name="custom-classes-transition">
    <modal v-if="showModal" @close="closeModal()"></modal>
  </transition>
  <alert-message v-if="showAlert" />
</template>

<script>
import Modal from "./components/widgets/Modal.vue";
import AlertMessage from "./components/widgets/AlertMessage.vue";

export default {
  components: {
    Modal,
    AlertMessage,
  },
  computed: {
    showModal() {
      return this.$store.state.app.status.showModal;
    },
    showAlert() {
      console.log(this.$store.state.app.alert);
      return this.$store.state.app.alert;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser["roles"]) {
        return this.currentUser["roles"].includes("ROLE_ADMIN");
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser["roles"]) {
        return this.currentUser["roles"].includes("ROLE_MODERATOR");
      }

      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
    closeModal() {
      this.$store.commit("app/hideModal");
      console.log(this.$store.state.app.status.showModal);
    },
  },
};
</script>
