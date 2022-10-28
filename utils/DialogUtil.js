/**
 * ConfirmationDialog の呼び出しに関する関数です。
 */
const _DialogUtil = () => {
    let callbacks = []

    const showDialog = () => {
        callbacks.forEach(callback => callback(true))
    }

    const closeDialog = () => {
        callbacks.forEach(callback => callback(false))
    }

    const getCallback = (callback) => {
        callbacks.push(callback)
    }

    return {
        showDialog,
        closeDialog,
        getCallback
    }
}

export const DialogUtil = _DialogUtil()