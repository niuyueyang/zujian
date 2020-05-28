<template>
    <div>我是子组件</div>
</template>
<script>
    import Emitter from "./../utils/emit";
    export default {
        name: "Child",
        mixins: [Emitter],
        created() {
            this.$on("on-message", this.showMessage);
            this.dispatch("Parent", "child-to-p", "hello parent");
        },
        methods: {
            showMessage(text) {
                console.log(text);
            }
        }
    };
</script>
