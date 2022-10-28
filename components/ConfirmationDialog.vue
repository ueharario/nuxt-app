<template>
    <div id="overlay" v-if="showDialog">
        <div id="content">
            <p class="message">{{ message }}</p>
            <div class="btn-container float-right">
                <button class="btn btn-outline-primary btn-sm my-2 mr-2" @click="successConfirm">Yes</button>
                <button class="btn btn-outline-danger btn-sm my-2" @click="cancelConfirm">No</button>
            </div>
        </div>
    </div>
</template>

<script>
import { DialogUtil } from '@/utils/DialogUtil.js'

export default {
    data() {
        return {
            message: 'Confirmation',
            showDialog: false,
            resolve: () => {},
            userChoice: false
        }
    },
    mounted() {
        DialogUtil.getCallback((value) => {
            this.showDialog = value
        })
    },
    methods: {
        /**
         * 確認ダイアログの結果を Promise で取得します。
         */
        async someProcess() {
            DialogUtil.showDialog()
            const answer = await new Promise((resolve) => {
            this.resolve = resolve
            })
            this.userChoice = answer
            this.$emit('confirm', this.userChoice)
            DialogUtil.closeDialog()
        },
        /**
         * 確認ダイアログで Yes を選択したときの処理です。
         */
        successConfirm() {
            this.someProcess()
            this.resolve(true)
        },
        /**
         * 確認ダイアログで No を選択したときの処理です。
         */
        cancelConfirm() {
            this.someProcess()
            this.resolve(false)
        }
    }
}
</script>

<style>
#overlay{
  z-index:1;

  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);

  display: flex;
  align-items: center;
  justify-content: center;
}

#content{
  z-index:2;
  width:25%;
  padding: 1em;
  background:#fff;
}
</style>