<template>
  <div class="container">
    <h2 class="text-center">{{ TITLE.title }}</h2>
    <button class="btn btn-outline-success btn-sm my-2 float-end" @click="create">
      {{ TITLE.create }}
    </button>
    <UserForm v-if="isShow" @new="createUser" @edit="updateUser" @close="closeUserForm" :user="user" :isEdit="isEdit" />
    <table class="table table-striped mt-2">
      <thead class="table-dark">
        <tr>
          <th>{{ TITLE.name }}</th>
          <th>{{ TITLE.gender }}</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in _users" :key="user.id">
          <td class="col-md-5 align-middle">{{ user.name }}</td>
          <td class="col-md-5 align-middle">{{ getGenderLabel(user.gender) }}</td>
          <td class="col-md-1">
            <button class="btn btn-outline-primary btn-sm" @click="update(user.id)">
              {{ TITLE.edit }}
            </button>
          </td>
          <td class="col-md-1">
            <button class="btn btn-outline-danger btn-sm" @click="deleteUser(user.id)">
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
    _users: {
      get() {
        return Array.from(this.$store.getters['UserApi/_users'])
      },
      set(value) {
        this.$store.commit('UserApi/_users', value)
      }
    }
  },
  async created() {
    await this.$store.dispatch('UserApi/fetchUser')
  },
  methods: {
    /**
     * 新規作成を行います。
     * @param {object} user 登録するユーザです。
     */
    createUser(user) {
      this.$store.dispatch('UserApi/createUser', user)
    },
    /**
     * 編集を行います。
     * @param {object} user 更新するユーザです。
     */
    updateUser(user) {
      this.$store.dispatch('UserApi/updateUser', user)
    },
    /**
     * 削除を行います。
     * @param {object} user 削除するユーザです。
     */
    deleteUser(user) {
      this.$store.dispatch('UserApi/deleteUser', user)
    },
    /**
     * 新規作成モードです。
     */
    create() {
      this.isEdit = false
      this.openUserForm()
    },
    /**
     * 編集モードです。
     * @param {number} id 選択したユーザの id です。
     */
    update(id) {
      this.isEdit = true
      this.user = this._users.find((v) => v.id === id)
      this.openUserForm()
    },
    /**
     * 性別のラベルを表示します。
     * @param {number} gender 選択した性別の id です。(1: Male, 2: Female)
     */
    getGenderLabel(gender) {
      const targetGender = GENDER_ARRAY.find((v) => v.id === Number(gender))
      return targetGender.label
    },
    /**
     * UserForm を開きます。
     */
    openUserForm() {
      this.isShow = true
    },
    /**
     * UserForm を閉じます。
     * @param {boolean} isShow コンポーネントの表示切替のフラグです。
     */
    closeUserForm(isShow) {
      this.isShow = isShow
      this.user = {}
      this.sortUser()
    },
    /**
     * user を id 順に並び替えます。
     */
    sortUser() {
      this._users.sort((prev, nxt) => prev.id - nxt.id)
    }
  }
}
</script>