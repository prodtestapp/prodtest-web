<template>
  <div class='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2'>
    <update-account class='mb-5' />
    <change-password />
  </div>
</template>

<script>
import UpdateAccount from '~/components/UpdateAccount'
import ChangePassword from '~/components/ChangePassword'

export default {
  name: 'Account',
  components: { UpdateAccount, ChangePassword },
  layout: 'Dashboard',
  middleware: 'auth'
}
</script>
