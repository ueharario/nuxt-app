<template>
  <div id="overlay">
      <div id="content">
        <div>
            <label>{{ TITLE.name }}</label>
            <InputTextName v-model="editUser.name" :editUser="editUser" @blur="validate('name')" />
            <p id="errors" v-if="!!errors.name">{{ errors.name }}</p>
        </div>
        <div>
            <label>{{ TITLE.gender }}</label>
            <SelectGender v-model="editUser.gender" :editUser="editUser" :options="GENDER_ARRAY" @blur="validate('gender')" />
            <p id="errors" v-if="!!errors.gender">{{ errors.gender }}</p>
        </div>
        <div v-if="isMale">
            <InputTextMaleMessage v-model="editUser.maleMessage" :editUser="editUser" @blur="validate('maleMessage')" />
            <p id="errors" v-if="!!errors.maleMessage">{{ errors.maleMessage }}</p>
        </div>
        <div v-if="isFemale">
            <InputTextFemaleMessage v-model="editUser.femaleMessage" :editUser="editUser" @blur="validate('femaleMessage')" />
            <p id="errors" v-if="!!errors.femaleMessage">{{ errors.femaleMessage }}</p>
        </div>
        <div>
            <button @click="close">{{ TITLE.close }}</button>
            <button @click="openConfirm" v-if="isEdit">{{ TITLE.update }}</button>
            <button @click="openConfirm" v-else>{{ TITLE.register }}</button>
        </div>
        <ConfirmationDialog @confirm="confirm" />
      </div>
  </div>
</template>

<script>
import InputTextName from '@/components/InputField/InputTextName.vue'
import SelectGender from '@/components/InputField/SelectGender.vue'
import InputTextMaleMessage from '@/components/InputField/InputTextMaleMessage.vue'
import InputTextFemaleMessage from '@/components/InputField/InputTextFemaleMessage.vue'
import { TITLE, GENDER, GENDER_ARRAY, DEFAULT_USER } from '@/constants/USER.js'
import ConfirmationDialog from '@/components/ConfirmationDialog.vue'
import { DialogUtil } from '@/components/ConfirmationDialog.vue'
import * as yup from "yup";

const UserSchema = yup.object().shape({
    name: yup.string().required('Name is required.'),
    gender: yup.number().required('Gender is a required selection.'),
    maleMessage: yup.string().when("gender", {
        is: 1 ,
        then: yup.string().required('This is a required message.')
    }),
    femaleMessage: yup.string().when('gender', {
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
    components: {
        InputTextName,
        SelectGender,
        InputTextMaleMessage,
        InputTextFemaleMessage,
        ConfirmationDialog
    },
    computed: {
        isMale() {
            return Number(this.editUser.gender) === GENDER.male.id
        },
        isFemale() {
            return Number(this.editUser.gender) === GENDER.female.id
        }
    },
    mounted() {
        this.$watch(
            () => this.user,
            (newValue, oldValue) => {
                if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
                    const { id, name, gender, maleMessage, femaleMessage } = newValue
                    this.editUser = { id, name, gender, maleMessage, femaleMessage }
                }
            },
            {
                immediate: true,
                deep: true
            }
        )
    },
    methods: {
        confirm(userChoice) {
            if (this.isEdit && userChoice) {
                this.successUpdate()
            }
            else if (!this.isEdit && userChoice) {
                this.successRegister()
            }
        },
        openConfirm() {
            DialogUtil.showDialog()
        },
        close() {
            this.reset()
            this.$emit('close', false)
        },
        reset() {
            this.editUser = DEFAULT_USER
        },
        successUpdate() {
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
        successRegister() {
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