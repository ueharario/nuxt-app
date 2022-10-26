<template>
    <input
        class="form-control"
        type="text"
        v-model="femaleMsg"
        placeholder="Female_Message"
    />
</template>

<script>
export default {
    props: {
        editUser: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        femaleMsg: {
            get() {
                return this.editUser.femaleMsg
            },
            set(newValue) {
                this.$emit('input', newValue)
            }
        }
    }
}
</script>