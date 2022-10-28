/**
 * ユーザの id を一意的に 1 ~ 100 で割り振る関数です。
 * @param { Array } users ユーザの配列です。
 * @param { Object } user 選択したユーザです。
 */
const issueId = (users, user) => {
    const _id = Math.floor(Math.random() * 100) + 1
    if (users.some((v) => v.id === _id)) {
        return issueId(users, user)
    }
    else {
        return _id
    }
}

export default issueId