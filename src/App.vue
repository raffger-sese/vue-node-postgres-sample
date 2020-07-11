<template>
  <div class="container">
    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
      <ul class="navbar-nav paginate">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link" @click.prevent="refreshBackendRecords"
            >Refresh Backend Record</a
          >
        </li>
      </ul>
    </nav>
    <br />
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<style>
</style>
<script>
export default {
  methods: {
    refreshBackendRecords() {
      let uri = "http://localhost:3000/records";
      this.axios.post(uri).then((response) => {
        console.log(response);
      });
    },
  },
};
</script>
