<template>
    <input
        class="form-control"
        type="text"
        v-model="name"
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
        name: {
            get() {
                return this.editUser.name
            },
            set(newValue) {
                this.$emit('input', newValue)
            }
        }
    }
}
</script>