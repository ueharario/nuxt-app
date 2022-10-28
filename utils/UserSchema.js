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

export default UserSchema