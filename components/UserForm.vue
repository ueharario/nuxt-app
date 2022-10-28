<template>
  <div id="overlay">
      <div id="content">
        <div class="group-form">
            <label>{{ TITLE.name }}</label>
            <InputTextName v-model="editUser.name" :editUser="editUser" @blur="validate('name')" />
            <p class="errors form-text" v-if="!!errors.name">{{ errors.name }}</p>
        </div>
        <div class="group-form">
            <label>{{ TITLE.gender }}</label>
            <SelectGender v-model="editUser.gender" :editUser="editUser" :options="GENDER_ARRAY" @blur="validate('gender')" />
            <p class="errors form-text" v-if="!!errors.gender">{{ errors.gender }}</p>
        </div>
        <div class="group-form" v-if="isMale">
            <label>{{ TITLE.message }}</label>
            <InputTextMaleMessage v-model="editUser.maleMessage" :editUser="editUser" @blur="validate('maleMessage')" />
            <p class="errors form-text" v-if="!!errors.maleMessage">{{ errors.maleMessage }}</p>
        </div>
        <div class="group-form" v-if="isFemale">
            <label>{{ TITLE.message }}</label>
            <InputTextFemaleMessage v-model="editUser.femaleMessage" :editUser="editUser" @blur="validate('femaleMessage')" />
            <p class="errors form-text" v-if="!!errors.femaleMessage">{{ errors.femaleMessage }}</p>
        </div>
        <div class="form-group float-end">
            <button class="btn btn-outline-secondary btn-sm my-2 mr-2" @click="close">{{ TITLE.close }}</button>
            <button class="btn btn-outline-warning btn-sm my-2" @click="openConfirm" v-if="isEdit">{{ TITLE.update }}</button>
            <button class="btn btn-outline-warning btn-sm my-2" @click="openConfirm" v-else>{{ TITLE.register }}</button>
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
import { DialogUtil } from '@/utils/DialogUtil.js'
import UserSchema from '@/utils/UserSchema.js'

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
        /**
         * 確認ダイアログでユーザ選択後、登録処理を行います。
         * @param {boolean} userChoice 確認ダイアログの結果です。
         */
        confirm(userChoice) {
            if (this.isEdit && userChoice) {
                this.successUpdate()
            }
            else if (!this.isEdit && userChoice) {
                this.successRegister()
            }
        },
        /**
         * 新規作成モードで登録します。
         */
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
        /**
         * 編集モードで更新します。
         */
        successRegister() {
            UserSchema.validate(this.editUser, { abortEarly: false })
            .then(() => {
                this.$emit('new', this.editUser)
                this.close()
            })
            .catch((err) => {
                err.inner.forEach((error) => {
                    this.errors = { ...this.errors, [error.path]: error.message}
                })
            })
        },
        /**
         * バリデーションチェックを行います。
         * @param {string} field 入力内容です。
         */
        validate(field) {
            UserSchema.validateAt(field, this.editUser)
                .then(() => (this.errors[field] = ''))
                .catch((err) => {
                    this.errors[err.path] = err.message
                })
        },
        /**
         * 確認ダイアログを開きます。
         */
         openConfirm() {
            DialogUtil.showDialog()
        },
        /**
         * ダイアログを閉じます。
         */
        close() {
            this.reset()
            this.$emit('close', false)
        },
        /**
         * 入力項目をリセットします。
         */
        reset() {
            this.editUser = DEFAULT_USER
        }
    }
}
</script>

<style scoped>
.errors {
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