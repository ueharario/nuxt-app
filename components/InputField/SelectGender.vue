<template>
    <select class="form-control" v-model="gender">
        <option disabled value="">Please select.</option>
        <option v-for="key in options" :key="key.id" :value="key.id">
            {{ key.label }}
        </option>
    </select>
</template>

<script>
import { GENDER_ARRAY } from '@/constants/USER.js'
export default {
    props: {
        editUser: {
            type: Object,
            default: () => {}
        },
        options: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            GENDER_ARRAY
        }
    },
    computed: {
        gender: {
            get() {
                return this.editUser.gender
            },
            set(newValue) {
                this.$emit('input', Number(newValue))
            }
        }
    }
}
</script>