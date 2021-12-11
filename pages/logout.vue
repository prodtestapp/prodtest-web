<template>
  <div></div>
</template>

<script>
export default {
  name: 'Logout',
  middleware: 'auth',
  mounted() {
    this.$auth.logout().then(() => {
      this.$router.push('/login');
    })
  }
}
</script>
