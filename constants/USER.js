const GENDER = {
    male: { id:1, label: "Male" },
    female: { id:2, label: "Female" }
}

const GENDER_ARRAY = Object.entries(GENDER).map((item) => item[1])

const DEFAULT_USER = {
    id: 0,
    name: '',
    gender: 0,
    maleMsg: '',
    femaleMsg: ''
}

const TITLE = {
    title: "User Management System",
    create: "Create",
    edit: "Edit",
    delete: "Delete",
    name: "Name",
    gender: "Gender",
    message: "Message",
    close: "Close",
    update: "Update",
    register: "Register"
}

export { GENDER, GENDER_ARRAY, DEFAULT_USER, TITLE }