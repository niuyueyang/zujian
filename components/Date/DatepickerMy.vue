<template>
    <div class="x-datepicker" @click.stop="()=> false">
        <h-input
                :placeholder="placeholder"
                v-model="dateTime"
                @click.prevent="pickerShow"
                iconBefore="x-icon-watch"
                 clearable>
        </h-input>
        <transition name="fade-up" mode="out-in">
            <div class="x-picker" v-show="isActive">
                <div class="x-picker_header x-clearfix">
                    <span class="x-icon-chevrons-left x-btn-prve" @click="changePrevYear"></span>
                    <span class="x-icon-chevron-left x-btn-prve" @click="changePrevMonth"></span>
                    <span>{{nowTime.year}} 年 {{nowTime.month + 1}} 月 {{nowTime.day}} 号 </span>
                    <span class="x-icon-chevrons-right x-btn-next" @click="changeNextYear"></span>
                    <span class="x-icon-chevron-right x-btn-next" @click="changeNextMonth"></span>
                </div>
                <ul class="x-picker_week x-clearfix">
                    <li v-for="(week,index) in 7" :key="index">{{backWeek(index)}}</li>
                </ul>
                <ul class="x-picker_day x-clearfix">
                    <li
                            v-for="(item, i) in calendarData"
                            :key="i"
                            :class="[
                                    item.type,
                                    {
                                        active: isActiveDay(item),
                                        today: isToDay(item)
                                    }
                                ]"
                            @click="changeDay(item)"
                    >
                        <span>{{item.d}}</span>
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script>
    function repair(d){
        return d<10?`0${d}`:d
    }
    export default {
        name: "xDatepicker",
        props:{
            value:{
                default:'',
            },
            placeholder:{
                default:'',
            },
            disabled:{
                default: false
            }
        },
        data(){
            return{
                dateTime:'',
                isActive: false,
                nowTime: this.getNowTime(new Date()),
            }
        },
        mounted(){
            document.addEventListener("click", e => {
                if (!this.$el.contains(e.target)) {
                    this.isActive = false;
                }
            });
        },
        computed:{
            calendarData(){
                const getWeek = new Date(this.nowTime.year, this.nowTime.month, 1).getDay() || 7;//计算本月1号是周几
                const nowMonthBigDay = this.getYearMonthDayNum(
                    this.nowTime.year,
                    this.nowTime.month + 1
                ); //计算本月最后一天是几号
                const prevMonthBigDay = this.getYearMonthDayNum(
                    this.nowTime.year,
                    this.nowTime.month
                );//计算上月最后一天是几号
                const CELL = 42;//共计6行，每行7个日期
                const nextMonthDay = CELL - nowMonthBigDay - getWeek; //计算本月最后一天空余多少天
                const nowMonthDay = nowMonthBigDay; //30
                const prevMonthDay = CELL - nowMonthDay - nextMonthDay;//计算本月1号之前这一行空余多少天
                const prevMonth = this.prevMonth;// {year:2019,month:9}
                const nowMonth  = this.nowTime;//{day: 20,days: 3,month: 10,year: 2019}
                const nextMonth = this.nextMonth;//{month: 11,year: 2019}
                const CellData = [];
                for(let i = prevMonthDay;i>0;i--){
                    const day = prevMonthBigDay - i + 1;
                    const d = repair(day);
                    CellData.push({
                        y: prevMonth.year,
                        m: prevMonth.month + 1,
                        d: d,
                        type: "Prev"
                    });
                }

                for (let i = 1; i <= nowMonthDay; i++) {
                    const d = repair(i);
                    CellData.push({
                        y: nowMonth.year,
                        m: nowMonth.month + 1,
                        d: d,
                        type: "Now"
                    });
                }

                for (let i = 1; i <= nextMonthDay; i++) {
                    const d = repair(i);
                    CellData.push({
                        y: nextMonth.year,
                        m: nextMonth.month + 1,
                        d: d,
                        type: "Next"
                    });
                }
                return CellData;
            },
            prevMonth(){
                let year = this.nowTime.year;
                let month = this.nowTime.month;
                if(month==0){
                    year--;
                    month=11;
                }
                else{
                    month--;
                }
                return {year,month}
            },
            nextMonth() {
                let year = this.nowTime.year;
                let month = this.nowTime.month;

                if (month == 11) {
                    year++;
                    month = 0;
                } else {
                    month++;
                }
                return { year, month };
            }
        },
        methods:{
            //控制是否显示
            pickerShow(){
                if(!this.disabled){
                    if(this.isfocus&&this.isActive){
                        this.isActive = false;
                    }
                    else{
                        this.isActive = true;
                    }
                }
            },
            getNowTime(date){
                return {
                    year:date.getFullYear(),
                    month:date.getMonth(),
                    day:date.getDate(),
                    days:date.getDay()
                }
            },
            //上一年
            changePrevYear(){
                this.nowTime.year--;
            },
            //上个月
            changePrevMonth(){
                this.nowTime.year = this.prevMonth.year;
                this.nowTime.month = this.prevMonth.month;
                const month = repair(this.nowTime.month+1);
                this.dateTime = this.nowTime.year + '-' + month + '-01'
            },
            //下一年
            changeNextYear() {
                this.nowTime.year++;
            },
            //下个月
            changeNextMonth() {
                this.nowTime.year = this.nextMonth.year;
                this.nowTime.month = this.nextMonth.month;
                const month = repair(this.nowTime.month+1);
                this.dateTime = this.nowTime.year + '-' + month + '-01'
            },
            backWeek(index){
                switch (index){
                    case 0:
                        return "日";
                    case 1:
                        return "一";
                    case 2:
                        return "二";
                    case 3:
                        return "三";
                    case 4:
                        return "四";
                    case 5:
                        return "五";
                    case 6:
                        return "六";
                }
            },
            //计算本月最后一天是28，29,，30，31
            getYearMonthDayNum(year, month) {
                var dayNum = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                if(new Date(year,1,29).getDate()==29){
                    dayNum[1]=29;
                }
                if(month-1<0){
                    month=12;
                }
                return dayNum[month-1]
            },
            isActiveDay({ y, m, d }) {
                const date = y + "-" + repair(m) + "-" + d;
                return this.dateTime === date;
            },
            isToDay({y,m,d}) {
                return (
                    y==new Date().getFullYear()&&d == new Date().getDate() && m == new Date().getMonth()+1
                );
            },
            changeDay({y,m,d,type}){
                this.isActive = false;
                if(type!=='Now'){
                    return;
                }
                this.dateTime = y + "-" + repair(m) + "-" + d;
                this.$emit("input", this.dateTime);
            }
        }
    }
</script>

<style scoped>

</style>
