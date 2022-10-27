<template>
  <div>
    <h2>{{ TITLE.title }}</h2>
    <button id="create" @click="create">{{ TITLE.create }}</button>
    <UserForm v-if="isShow" @new="newUser" @edit="editUser" @close="closeUserForm" :user="user" :isEdit="isEdit" />
    <table>
      <thead>
        <tr>
          <th>{{ TITLE.name }}</th>
          <th>{{ TITLE.gender }}</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in Users.users" v-bind:key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ getGenderLabel(user.gender) }}</td>
          <td>
            <button @click="edit(user.id)">
              {{ TITLE.edit }}
            </button>
          </td>
          <td>
            <button @click="deleteItem(user.id)">
              {{ TITLE.delete }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import UserForm from '@/components/UserForm.vue'
import { TITLE, GENDER_ARRAY } from '@/constants/USER.js'
import Users from '@/static/data/user.json' // json ファイル
import IssueId from '@/utils/IssueId'

export default {
  data() {
    return {
      TITLE,
      user: {},
      Users,
      isShow: false,
      isEdit: true
    }
  },
  components: {
    UserForm
  },
  methods: {
    create() {
      this.isEdit = false
      this.openUserForm()
    },
    openUserForm() {
      this.isShow = true
    },
    getGenderLabel(gender) {
      const targetGender = GENDER_ARRAY.find((v) => v.id === Number(gender))
      return targetGender.label
    },
    newUser(user) {
      user.id = IssueId(Users.users, user)
      Users.users.push(user)
      this.sortItem()
    },
    editUser(user) {
      Users.users = Users.users.filter((v) => v.id !== user.id)
      Users.users.push(user)
      this.sortItem()
    },
    closeUserForm(isShow) {
      this.isShow = isShow
      this.user = {}
    },
    edit(id) {
      this.isEdit = true
      this.user = Users.users.find((v) => v.id === id)
      this.openUserForm()
    },
    deleteItem(id) {
      Users.users = Users.users.filter((v) => v.id !== id )
      this.sortItem()
    },
    sortItem() {
      Users.users.sort((prev, nxt) => prev.id - nxt.id)
    }
  }
}
</script>

<style>
th,td {
  border: solid 1px;
  padding: 10px;
  text-align: center;
}
table {
  border-collapse: collapse;
  width: 100%;
}
h2 {
  text-align: center;
}

#create {
  float: right;
  margin: 10px;
}
</style>