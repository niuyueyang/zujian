<template>
    <div>
        <h1>我是父组件</h1>
        <button @click="handleClick">触发事件</button>
        <child />
    </div>
</template>
<script>
    import Emitter from "./../utils/emit";
    import Child from "./Child";
    export default {
        name: "Parent",
        mixins: [Emitter],
        created() {
            this.$on("child-to-p", this.handleChild);
        },
        methods: {
            handleClick() {
                this.broadcast("Child", "on-message", "Hello Child");
            },
            handleChild(val) {
                console.log(val);
            }
        },
        components: {
            Child
        }
    };
    </script>

