<template>
  <div id="overlay">
      <div id="content">
        <div>
            <label>{{ TITLE.name }}</label>
            <input type="text" v-model="editUser.name" @blur="validate('name')">
            <p id="errors" v-if="!!errors.name">{{ errors.name }}</p>
        </div>
        <div>
            <label>{{ TITLE.gender }}</label>
            <select v-model="editUser.gender" @blur="validate('gender')">
                <option v-for="column in GENDER_ARRAY" v-bind:key="column.id" :value="column.id">
                    {{ column.label }}
                </option>
            </select>
            <p id="errors" v-if="!!errors.gender">{{ errors.gender }}</p>
        </div>
        <div v-if="isMale">
            <input type="text" placeholder="Male_Message" v-model="editUser.maleMsg" @blur="validate('maleMsg')">
            <p id="errors" v-if="!!errors.maleMsg">{{ errors.maleMsg }}</p>
        </div>
        <div v-if="isFemale">
            <input type="text" placeholder="Female_Message" v-model="editUser.femaleMsg" @blur="validate('femaleMsg')">
            <p id="errors" v-if="!!errors.femaleMsg">{{ errors.femaleMsg }}</p>
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
import { TITLE, GENDER, GENDER_ARRAY, DEFAULT_USER } from '@/constants/USER.js'
import * as yup from "yup";

const UserSchema = yup.object().shape({
    name: yup.string().required('Name is required.'),
    gender: yup.number().required('Gender is a required selection.'),
    maleMsg: yup.string().when("gender", {
        is: 1 ,
        then: yup.string().required('This is a required message.')
    }),
    femaleMsg: yup.string().when('gender', {
        is: 2,
        then: yup.string().required('This is a required message.')
    })
})

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
            editUser: {},
            errors: DEFAULT_USER
        }
    },
    computed: {
        isMale() {
            return this.editUser.gender === GENDER.male.id
        },
        isFemale() {
            return this.editUser.gender === GENDER.female.id
        }
    },
    mounted() {
        this.$watch(
            () => this.user,
            (newValue, oldValue) => {
                if (newValue !== oldValue) {
                    const { id, name, gender, maleMsg, femaleMsg } = newValue
                    this.editUser = { id, name, gender, maleMsg, femaleMsg }
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
            UserSchema.validate(this.editUser, { abortEarly: false })
            .then(() => {
                this.$emit('edit', this.editUser)
                this.close()
            })
            .catch((err) => {
                err.inner.forEach((error) => {
                    this.errors = { ...this.errors, [error.path]: error.message}
                })
            })
        },
        register() {
            UserSchema.validate(this.editUser, { abortEarly: false })
            .then(() => {
                console.log("clear")
                this.$emit('new', this.editUser)
                this.close()
            })
            .catch((err) => {
                console.log("error")
                err.inner.forEach((error) => {
                    this.errors = { ...this.errors, [error.path]: error.message}
                })
            })
        },
        validate(field) {
            UserSchema.validateAt(field, this.editUser)
                .then(() => (this.errors[field] = ''))
                .catch((err) => {
                    this.errors[err.path] = err.message
                })
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