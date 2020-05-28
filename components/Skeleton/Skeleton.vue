<template>
    <div class="skeleton-wrapper">
        <div class="skeleton-content">
            <Item :paragraph="paragraph" :active="active"></Item>
        </div>
    </div>
</template>

<script>
    import Item from './Item'
    export default {
        name: "Skeleton",
        props:['paragraph','active'],
        mounted(){
            console.log(this.paragraph)
        },
        components:{
            Item
        }
    }
</script>

<style scoped>

</style>
