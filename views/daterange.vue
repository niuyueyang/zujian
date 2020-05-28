<template>
    <div>
        <button @click="test">显示</button>
        <div>
            <div>开始日期：{{startDate}}</div>
            <div>结束日期：{{endDate}}</div>
        </div>
        <DateRange v-model="isShow" :default_startDate="startDate" :default_endDate="endDate" @confirm="confirm"></DateRange>
    </div>
</template>
<script>
    export default {
        name: 'app',
        data () {
            return {
                isShow: false,
                startDate: new Date(),
                endDate: new Date()
            }
        },
        methods: {
            test () {
                this.isShow = true
            },
            confirm (startDate, endDate) {
                console.log('confirm:')
                console.log('startDate is ' + startDate)
                console.log('endDate is ' + endDate)
                this.startDate = startDate
                this.endDate = endDate
                this.isShow = false
            },
        },
        created () {
            let tempDate = this.endDate
            tempDate.setDate(tempDate.getDate() + 10)
            this.endDate = tempDate
        },
        computed: {
            startDateString () {
                let startDate = this.startDate
                return startDate.getFullYear() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getDate()
            },
            endDateString () {
                let endDate = this.endDate
                return endDate.getFullYear() + '-' + (endDate.getMonth() + 1) + '-' + endDate.getDate()
            },
        }
    }
</script>
<style>
    html, body {
        margin: 0;
        padding: 0;
    }
</style>
