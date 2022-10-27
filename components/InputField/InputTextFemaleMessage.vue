<template>
    <input
        type="text"
        v-model="femaleMessage"
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
        femaleMessage: {
            get() {
                return this.editUser.femaleMessage
            },
            set(newValue) {
                this.$emit('input', newValue)
            }
        }
    }
}
</script>