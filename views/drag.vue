<template>
    <div>
        <hDrag :w="200" :h="200" v-on:resizing="resize" v-on:dragging="resize">
            <h3>Hello World!</h3>
            <p>{{ top }} х {{ left }} </p>
            <p>{{ width }} х {{ height }}</p>
        </hDrag>
        <!--<hDrag :w="200" :h="200" v-on:resizing="resize1" v-on:dragging="resize1">-->
            <!--<h3>Hello World!</h3>-->
            <!--<p>{{ top1 }} х {{ left1 }} </p>-->
            <!--<p>{{ width }} х {{ height }}</p>-->
        <!--</hDrag>-->
        <!--<hDrag :w="200" :h="200" v-on:resizing="resize2" v-on:dragging="resize2">-->
            <!--<h3>Hello World!</h3>-->
            <!--<p>{{ top2 }} х {{ left2 }} </p>-->
            <!--<p>{{ width }} х {{ height }}</p>-->
        <!--</hDrag>-->
    </div>

</template>

<script>

    export default {
        name: 'drag',
        data() {
            return {
                width: 0,
                height: 0,
                top: 0,
                left: 0,
                top1: 0,
                left1: 0,
                top2: 0,
                left2: 0
            }
        },

        methods: {
            resize(newRect) {
                this.width = newRect.width;
                this.height = newRect.height;
                this.top = newRect.top;
                this.left = newRect.left;
            },
            resize1(newRect) {
                this.width = newRect.width;
                this.height = newRect.height;
                this.top1 = newRect.top;
                this.left1 = newRect.left;
            },
            resize2(newRect) {
                this.width = newRect.width;
                this.height = newRect.height;
                this.top2 = newRect.top;
                this.left2 = newRect.left;
            }
        }
    }
</script>
