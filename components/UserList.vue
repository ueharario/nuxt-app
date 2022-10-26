<template>
  <div>
    <h2>{{ TITLE.title }}</h2>
    <button @click="create">{{ TITLE.create }}</button>
    <UserForm v-if="isShow" @new="createUser" @edit="updateUser" @close="closeUserForm" :user="user" :isEdit="isEdit" />
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
        <tr v-for="user in _users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ getGenderLabel(user.gender) }}</td>
          <td>
            <button @click="update(user.id)">{{ TITLE.edit }}</button>
          </td>
          <td>
            <button @click="deleteUser(user.id)">{{ TITLE.delete }}</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import UserForm from '@/components/UserForm.vue'
import { ENDER_ARRAY, TITLE, DEFAULT_EDIT_INDEX } from '@/constants/USER.js'

export default {
  data() {
    return {
      TITLE,
      user: {},
      isShow: false,
      isEdit: true
    }
  },
  components: {
    UserForm
  },
  computed: {
    _users() {
      return this.$store.getters['UsersApi/_users']
    }
  },
  async created() {
    await this.$store.dispatch('UsersApi/fetchUsers')
  },
  methods: {
    /** 新規作成 */
    createUser(user) {
      this.$store.dispatch('UsersApi/createUser', user)
    },

    /** 編集 */
    updateUser(user) {
      this.$store.dispatch('UsersApi/updateUser', user)
    },

    /** 削除 */
    deleteUser(user) {
      this.$store.dispatch('UsersApi/deleteUser', user)
    },

    /** 新規作成モード */
    create() {
      this.isEdit = false
      this.openUserForm()
    },

    /** 編集モード */
    update(id) {
      this.isEdit = true
      this.user = this._users.find((v) => v.id === id)
      this.openUserForm()
    },

    /** 性別のラベル表示 */
    getGenderLabel(gender) {
      const targetGender = GENDER_ARRAY.find((v) => v.id === Number(gender))
      return targetGender.label
    },

    /** UserForm を開く */
    openUserForm() {
      this.isShow = true
    },

    /** UserForm を閉じる */
    closeUserForm(isShow) {
      this.isShow = isShow
      this.user = {}
      this.editIndex = DEFAULT_EDIT_INDEX
      this.sortUser()
    },

    /** user を id 順に並び替える */
    sortUser() {
      this._users.sort((prev, nxt) => prev.id - nxt.id)
    }
  }
}
</script>