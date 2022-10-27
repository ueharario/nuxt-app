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
    close: "Close",
    update: "Update",
    register: "Register"
}

const USER = [
    {
        id: 1,
        name: 'Micheal',
        gender: 'Male'
    },
    {
        id: 2,
        name: 'Lincoln',
        gender: 'Male'
    },
    {
        id: 3,
        name: 'Michelle',
        gender: 'Female'
    }
]

export { GENDER, GENDER_ARRAY, DEFAULT_USER, TITLE, USER }