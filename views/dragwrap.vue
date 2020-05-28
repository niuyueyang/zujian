<template>
    <div>
        <DragWrap class="wrap" :data="list" @watchData="watchData">
            <DrapItem class="item" v-for="(item, index) in list" :key="index">
                <template #drag>
                    <div>拖拽Dom</div>
                </template>
                <div>{{item}}</div>
            </DrapItem>
        </DragWrap>
    </div>


</template>

<script>
    export default {
        data() {
            return {
                list: [111, 222, 333, 444, 555, 666, 777, 888, 999]
            };
        },
        methods: {
            watchData(newList) {
                console.log("newList", newList);
            }
        }
    }
</script>
<style scoped>
    .wrap {
        display: flex;
        flex-wrap: wrap;
    }
    .wrap-item {
        display: flex;
        margin-right: 20px;
        width: 200px;
        background: #ccc;
    }
    .item {
        margin: 50px 10px;
        height: 60px;
        width: 100px;
        color: #fff;
        background: #369;
    }
    .item.green {
        background: green;
    }
    .item.blue {
        background: blue;
    }
</style>
