<template>
  <div>
    <user-list />
  </div>
</template>

<script>
import UserList from '~/components/UserList';

export default {
  name: 'Users',
  components: { UserList },
  layout: 'Dashboard',
  middleware: 'auth',
}
</script>

<style scoped>

</style>
