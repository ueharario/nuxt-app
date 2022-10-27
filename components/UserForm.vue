<template>
  <div id="overlay">
      <div id="content">
        <div>
            <input type="text" v-model="editUser.name">
        </div>
        <div>
            <select v-model="editUser.gender">
                <option v-for="column in GENDER_ARRAY" v-bind:key="column.id" :value="column.id">
                    {{ column.label }}
                </option>
            </select>
        </div>
        <button @click="close">Cancel</button>
        <button @click="save">Update</button>
      </div>
  </div>
</template>

<script>
import { GENDER_ARRAY, DEFAULT_USER } from '@/constants/USER.js'

export default {
    props: {
        user: Object,
        isShow: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            editUser: DEFAULT_USER,
            GENDER_ARRAY
        }
    },
    mounted() {
        this.$watch(
            () => this.user,
            (newValue, oldValue) => {
                if (newValue !== oldValue) {
                    const { name, gender } = newValue
                    this.editUser = { name, gender }
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
        save() {
            this.$emit('send', this.editUser)
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