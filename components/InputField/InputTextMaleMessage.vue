<template>
    <input
        class="form-control"
        type="text"
        v-model="maleMessage"
        placeholder="Male_Message"
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
        maleMessage: {
            get() {
                return this.editUser.maleMessage
            },
            set(newValue) {
                this.$emit('input', newValue)
            }
        }
    }
}
</script>