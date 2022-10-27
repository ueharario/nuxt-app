<template>
  <div>
    <h2>{{ TITLE.title }}</h2>
    <button @click="create">{{ TITLE.create }}</button>
    <!-- <UserForm v-if="isShow" @new="createUser" @edit="updateUser" @close="closeUserForm" :user="user" :isEdit="isEdit" /> -->
    <UserForm v-if="isShow" @send="createUser" @close="closeUserForm" :name="name" />
    <!-- <table>
      <thead>
        <tr>
          <th>{{ TITLE.name }}</th>
          <th>{{ TITLE.gender }}</th> -->
          <!-- <th></th>
          <th></th> -->
        <!-- </tr>
      </thead>
      <tbody> -->
        <!-- <tr v-for="user in _users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ getGenderLabel(user.gender) }}</td>
          <td>
            <button @click="update(user.id)">{{ TITLE.edit }}</button>
          </td>
          <td>
            <button @click="deleteUser(user.id)">{{ TITLE.delete }}</button>
          </td>
        </tr> -->
        <!-- <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.gender }}</td>
        </tr>
      </tbody>
    </table> -->
    <ul>
      <li>{{ name }}</li>
    </ul>
  </div>
</template>

<script>
import UserForm from '@/components/UserForm.vue'
// import { GENDER_ARRAY, TITLE, DEFAULT_EDIT_INDEX } from '@/constants/USER.js'
import { TITLE, USER } from '@/constants/USER.js'

export default {
  data() {
    return {
      TITLE,
//       user: {},
//       isShow: false,
//       isEdit: true
      name: 'Name',
      isShow: false
    }
  },
  components: {
    UserForm
  },
//   computed: {
//     _users() {
//       return this.$store.getters['UsersApi/_users']
//     }
//   },
//   async created() {
//     await this.$store.dispatch('UsersApi/fetchUsers')
//   },
  created() {
    this.users = USER
  },
  methods: {
    createUser(name) {
      this.name = name
    },
//     createUser(user) {
//       this.$store.dispatch('UsersApi/createUser', user)
//     },
//     updateUser(user) {
//       this.$store.dispatch('UsersApi/updateUser', user)
//     },
//     deleteUser(user) {
//       this.$store.dispatch('UsersApi/deleteUser', user)
//     },
    create() {
//       this.isEdit = false
//       this.openUserForm()
      this.open()
    },
    open() {
      this.isShow = true
    },
    closeUserForm(isShow) {
      this.isShow = isShow
    }
//     update(id) {
//       this.isEdit = true
//       this.user = this._users.find((v) => v.id === id)
//       this.openUserForm()
//     },
//     getGenderLabel(gender) {
//       const targetGender = GENDER_ARRAY.find((v) => v.id === Number(gender))
//       return targetGender.label
//     },
//     openUserForm() {
//       this.isShow = true
//     },
//     closeUserForm(isShow) {
//       this.isShow = isShow
//       this.user = {}
//       this.editIndex = DEFAULT_EDIT_INDEX
//       this.sortUser()
//     },
//     sortUser() {
//       this._users.sort((prev, nxt) => prev.id - nxt.id)
//     }
  }
}
</script>

<style>
ul {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 10px;
}
</style>