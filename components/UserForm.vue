<template>
  <div id="overlay">
      <div id="content">
        <div>
            <label>{{ TITLE.name }}</label>
            <input type="text" v-model="editUser.name">
        </div>
        <div>
            <label>{{ TITLE.gender }}</label>
            <select v-model="editUser.gender">
                <option v-for="column in GENDER_ARRAY" v-bind:key="column.id" :value="column.id">
                    {{ column.label }}
                </option>
            </select>
        </div>
        <div>
            <button @click="close">{{ TITLE.close }}</button>
            <button @click="update" v-if="isEdit">{{ TITLE.update }}</button>
            <button @click="register" v-else>{{ TITLE.register }}</button>
        </div>
      </div>
  </div>
</template>

<script>
import { TITLE, GENDER_ARRAY, DEFAULT_USER } from '@/constants/USER.js'

export default {
    props: {
        user: {
            type: Object,
            default: DEFAULT_USER
        },
        isShow: {
            type: Boolean,
            default: false
        },
        isEdit: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            TITLE,
            GENDER_ARRAY,
            editUser: {}
        }
    },
    mounted() {
        this.$watch(
            () => this.user,
            (newValue, oldValue) => {
                if (newValue !== oldValue) {
                    const { id, name, gender } = newValue
                    this.editUser = { id, name, gender }
                }
            },
            {
                immediate: true,
                deep: true
            }
        )
    },
    methods: {
        close() {
            this.reset()
            this.$emit('close', false)
        },
        reset() {
            this.editUser = DEFAULT_USER
        },
        update() {
            this.$emit('edit', this.editUser)
            this.close()
        },
        register() {
            this.$emit('new', this.editUser)
            this.close()
        }
    }
}
</script>

<style scoped>
#errors {
  color: red;
}

#overlay{
  z-index:1;

  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);

  display: flex;
  align-items: center;
  justify-content: center;
}

#content{
  z-index:2;
  width:50%;
  padding: 1em;
  background:#fff;
}
</style>