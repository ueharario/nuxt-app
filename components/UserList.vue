<template>
  <div>
    <h2>User Management System</h2>
    <button @click="create">Create</button>
    <UserForm v-if="isShow" @send="createUser" @close="closeUserForm" :user="user" />
    <table>
      <tbody>
        <tr>
          <td>
            {{ userData.name }}
          </td>
          <td>
            {{ getGenderLabel(userData.gender) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import UserForm from '@/components/UserForm.vue'
import { GENDER_ARRAY, DEFAULT_USER } from '@/constants/USER.js'
import userData from '@/static/data/user.json'

export default {
  data() {
    return {
      user: DEFAULT_USER,
      isShow: false,
      userData
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