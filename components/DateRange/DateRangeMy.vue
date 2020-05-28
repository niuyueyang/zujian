<template>
    <div class="date-range-wrapper" v-show="isShow">
        <div class="date-range-shadow"></div>
        <div class="date-range-box">
            <div class="box-body">
                <div class="date-range-calendar">
                    <div class="date-range-display">
                        <div class="start">{{startDateString}}</div>
                        <div class="to">到</div>
                        <div class="end">{{endDateString}}</div>
                    </div>
                    <div class="calendar-container">
                        <div class="main">
                            <div class="tool-bar">
                                <div class="arrow" @click="toLastMonth">&lt;</div>
                                <div class="display">{{monthPointDateString}}</div>
                                <div class="arrow" @click="toNextMonth">&gt;</div>
                            </div>
                            <div class="weeks">
                                <span class="week">一</span>
                                <span class="week">二</span>
                                <span class="week">三</span>
                                <span class="week">四</span>
                                <span class="week">五</span>
                                <span class="week">六</span>
                                <span class="week">日</span>
                            </div>
                            <div class="date-box">
                                <div class="date" :class="pick.customerClass" v-for="pick in picks"
                                     @click="pickDate(pick.date)">
                                    {{pick.displayNumber}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var clickCount = 0;
    export default {
        name: "DateRange",
        props:['value','default_startDate', 'default_endDate'],
        data(){
            return{
                startDate:this.default_startDate ? this.default_startDate : '',
                endDate:this.default_endDate ? this.default_endDate : '',
                monthPointDate: this.default_startDate ? this.default_startDate : new Date(),
                picks: []
            }
        },
        created () {
            /*
            * @desc 初始化日期
            * */
            this.createCalendar(this.monthPointDate)
        },
        computed:{
            isShow () {
                return this.value
            },
            /*
            * @desc 显示开始日期，默认是当前日期
            * */
            startDateString(){
                if(this.startDate == ''){
                    return
                }
                let startDate = this.startDate;
                return startDate.getFullYear() + '-' + (startDate.getMonth() + 1) +  '-' + startDate.getDate()
            },
            /*
            * @desc 显示结束日期，默认是开始日期加10天
            * */
            endDateString(){
                if(this.endDate == ''){
                    return
                }
                let endDate = this.endDate;
                return endDate.getFullYear() + '-' + (endDate.getMonth() + 1) +  '-' + endDate.getDate()
            },
            /*
            * @desc 月份显示
            * */
            monthPointDateString () {
                let monthPointDate = this.monthPointDate
                return monthPointDate.getFullYear() + '年' + ( monthPointDate.getMonth() + 1) + '月'
            }
        },
        methods:{
            confirm () {
                this.$emit('confirm', this.startDate, this.endDate)
            },
            cancel () {
                this.$emit('cancel', this.startDate, this.endDate)
            },
            /*
            * @desc 点击日期
            * */
            pickDate(date){
                clickCount++;
                let monthPointDate = this.monthPointDate  // 默认是当前日期
                let startDate = this.startDate // 默认是当前日期
                let endDate = this.endDate // 默认是当前日期后10天
                if(date.getMonth() != monthPointDate.getMonth()){
                    return;
                }

                if(clickCount % 2 ==1){
                    this.startDate = date;
                    this.endDate = '';


                }
                if(clickCount % 2 ==0){
                    this.endDate = date;
                }

                this.createCalendar(this.monthPointDate)

                if(this.startDate!='' && this.endDate!=''){
                    this.confirm ()
                }
            },
            /*
            * @param monthPointDate {Date} 默认是开始日期，没有则是当前日期 => this.default_startDate ? this.default_startDate : new Date()
            * @desc 初始化日期
            * @return {Date} 上个月，这个月，下个月日期
            * */
            createCalendar(monthPointDate){
                /*
                * @desc 如果开始日期大于结束日期，让它们交换位置
                * */
                var startDate = this.startDate;
                var temp = startDate;
                var endDate = this.endDate;
                if(startDate!='' && endDate!='' && startDate.getTime() > endDate.getTime()){
                    this.startDate = endDate;
                    this.endDate = temp;
                }
                if(monthPointDate!=''){
                    // 当前月份天数
                    this.picks = [];
                    let picks = [];
                    let monthStartDate = new Date(monthPointDate.getFullYear(), monthPointDate.getMonth(), 1); // 获取当前月份第一天
                    // 要显示的上月的dates
                    let lastMonthRestNum = monthStartDate.getDay() == 0 ? 6 : monthStartDate.getDay() - 1;
                    for(let i = lastMonthRestNum; i > 0; i--){
                        let tempDate = new Date(monthStartDate);
                        tempDate.setDate(tempDate.getDate() - i)
                        picks.push(this.createPickByDate(tempDate))
                    }

                    // 本月dates
                    let tempIndexDate = new Date(monthStartDate);
                    while(tempIndexDate.getMonth() === monthStartDate.getMonth()){
                        let tempDate = new Date(tempIndexDate);
                        picks.push(this.createPickByDate(tempDate))
                        tempIndexDate.setDate(tempIndexDate.getDate() + 1)
                    }
                    //要显示的下月的dates
                    while (tempIndexDate.getDay() != 1) {
                        let tempDate = new Date(tempIndexDate)
                        picks.push(this.createPickByDate(tempDate))
                        tempIndexDate.setDate(tempIndexDate.getDate() + 1)
                    }
                    this.picks = picks
                }
            },
            /*
            * @param date {Date} 每天日期
            * @desc 初始化日期样式
            * @result {Object} {customerClass:每个日期样式,date:每个日期,displayNumber：每天}
            * */
            createPickByDate(date){
                if(date != ''){
                    let customerClass = '';
                    let monthPointDate = this.monthPointDate; // 默认是当前日期
                    let startDate = this.startDate;
                    let endDate = this.endDate;
                    // 上月与下个月显示样式
                    if(date.getMonth()!=monthPointDate.getMonth()){
                        customerClass = 'light'
                    }
                    else{
                        if(startDate!='' && date.toDateString() == startDate.toDateString() || endDate!='' && date.toDateString() == endDate.toDateString()){
                            customerClass = 'start'
                        }
                        else{
                            if(startDate!='' && endDate!='' && date.getTime() > startDate.getTime() && date.getTime() < endDate.getTime()){
                                customerClass = 'pass'
                            }
                        }
                    }
                    return {
                        date:date,
                        customerClass:customerClass,
                        displayNumber:date.getDate()
                    }
                }

            },

            /*
            * @desc 上个月
            * */
            toLastMonth () {
                if(this.monthPointDate!=''){
                    let tempDate = new Date(this.monthPointDate)
                    tempDate.setMonth(tempDate.getMonth() - 1)
                    this.monthPointDate = tempDate
                    this.createCalendar(this.monthPointDate)
                }
            },

            /*
            * @desc 下个月
            * */
            toNextMonth () {
                if(this.monthPointDate!=''){
                    let tempDate = new Date(this.monthPointDate)
                    tempDate.setMonth(tempDate.getMonth() + 1)
                    this.monthPointDate = tempDate
                    this.createCalendar(this.monthPointDate)
                }
            },
        },
    }
</script>

<style lang="less" scoped>
    .date-range-shadow {
        position: absolute;
        z-index: 1000;
        opacity: .4;
        background-color: #000;
        width: 100%;
        height: 100%;
    }

    .date-range-wrapper {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
    }

    .date-range-box {
        left: 50%;
        top: 50%;
        position: absolute;
        z-index: 1001;
        box-shadow: 0 19px 60px rgba(0, 0, 0, .298039), 0 15px 20px rgba(0, 0, 0, .219608);
        transform: translate3d(-50%, -50%, 0);

        .box-body {
            background-color: #fff;
            width: 310px;
        }
    }

    .date-range-calendar {
        .date-range-display {
            background-color: #03a9f4;
            padding: 20px;
            color: #fff;
            display: flex;
            font-size: 22px;
            .start {
                flex: 1;
                text-align: center;
            }
            .end {
                flex: 1;
                text-align: center;
            }
        }
        .calendar-container {
            display: flex;
            flex-direction: column;
            .main {
                padding: 0 8px;
                color: rgba(0, 0, 0, .87);
                .tool-bar {
                    font-size: 20px;
                    height: 48px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .arrow {
                        flex: 0 0 40px;
                        font-size: 20px;
                        text-align: center;
                        height: 40px;
                        line-height: 40px;
                    }
                }
                .weeks {
                    display: flex;
                    color: rgba(0, 0, 0, .57);
                    .week {
                        flex: 1;
                        text-align: center;
                        height: 30px;
                    }
                }
            }
        }
    }

    .date-box {
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        height: 240px;
        .date {
            flex: 0 0 14.285%;
            text-align: center;
            line-height: 36px;
            height: 36px;
            padding: 2px 0;
            &.start, &.end {
                background-color: #03a9f4;
                color: #fff;
            }
            &.pass {
                background-color: lightgray;
            }
            &.light {
                color: lightgray;
            }
        }
    }

    .confirm-box {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .confirm, .cancel {
            width: 64px;
            height: 36px;
            color: #03a9f4;
            line-height: 36px;
            text-align: center;
            margin-right: 10px;
        }
        margin-bottom: 20px;
    }
</style>
