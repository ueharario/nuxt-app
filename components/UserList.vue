<template>
  <div>
    <h2>User Management System</h2>
    <button @click="create">Create</button>
    <UserForm v-if="isShow" @send="createUser" @close="closeUserForm" :user="user" />
    <table>
      <tbody>
        <tr>
          <td>
            {{ user.name }}
          </td>
          <td>
            {{ getGenderLabel(user.gender) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import UserForm from '@/components/UserForm.vue'
import { GENDER_ARRAY, DEFAULT_USER } from '@/constants/USER.js'

export default {
  data() {
    return {
      user: DEFAULT_USER,
      isShow: false,
    }
  },
  components: {
    UserForm
  },
  methods: {
    getGenderLabel(gender) {
      const targetGender = GENDER_ARRAY.find((v) => v.id === gender)
      return targetGender.label
    },
    createUser(user) {
      this.user = user
    },
    create() {
      this.open()
    },
    open() {
      this.isShow = true
    },
    closeUserForm(isShow) {
      this.isShow = isShow
    }
  }
}
</script>

<style>

</style>