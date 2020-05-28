<template>
    <div>
        <Radio label="爪哇犀牛" disabled checked></Radio>
        <RadioGroup v-model="animal">
            <Radio label="金斑蝶" value="1"></Radio>
            <Radio label="爪哇犀牛" disabled value="2"></Radio>
            <Radio label="印度黑羚" value="3"></Radio>
        </RadioGroup>
        <div style="margin-top:5px;">
            选中的值：{{animal}}
        </div>

        <RadioGroup v-model="animal1">
            <Radio label="金斑蝶1" value="11"></Radio>
            <Radio label="爪哇犀牛1" disabled value="21"></Radio>
            <Radio label="印度黑羚1" value="31"></Radio>
        </RadioGroup>
        <div style="margin-top:5px;">
            选中的值：{{animal1}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "radio",
        data(){
            return{
                animal:2,
                animal1:11
            }
        },
        mounted(){
            console.log(this.animal)
        }
    }
</script>

<style scoped>

</style>
