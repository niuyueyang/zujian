<template>
    <div class='calendar-body'>
        <div class="item" v-for="(item,index) in calendar">
            <!-- 标题 -->
            <div class='data-title'>
                <span>{{item.fullYear + '年' + item.fullMonth+'月'}}</span>
                <div class="iconRight">
                    <div class="iconLefts" @click="prevMonth"> <img src="./../assets/img/left.png"/> </div>
                    <div class="iconLefts" @click="nextMonth"> <img src="./../assets/img/right.png"/> </div>
                </div>
            </div>
            <div class='week-title'>
                <div>日</div>
                <div>一</div>
                <div>二</div>
                <div>三</div>
                <div>四</div>
                <div>五</div>
                <div>六</div>
            </div>
            <!-- 日期 -->
            <div class='calendar-data'>
                <div class="day"
                     :class="item2.start_date + ' ' + item2.end_date +' ' + item2.active_date"
                     v-for="(item2,index) in item.days"
                     :index="index"
                     @click="selectDate(item2)">
                    {{item2.day}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "picker",
        props:{
            startDate:{
              default(){
                  var month = new Date().getMonth() + 1;
                  if(month < 10){
                      month = '0' + month
                  }
                  var date = 1;
                  if(date < 10){
                      date = '0' + date
                  }
                  return new Date().getFullYear() + '-' + month + '-' + date
              }
            },
            endDate:{
                default(){
                    var dateH = new Date().setDate(new Date(new Date().getFullYear() + '-' + new Date().getMonth() + '-' + 1).getDate() + 7);
                    var date = new Date(dateH).getDate();
                    if(date < 10){
                        date = '0' + date
                    }

                    var month = new Date(dateH).getMonth()+1;
                    if(month < 10){
                        month = '0' + month
                    }
                    return new Date(dateH).getFullYear() + '-' + month + '-' + date
                }
            }
        },
        data(){
            return{
                start:'',              //开始时间。从当天开始。
                calendar:[],
                month_length: 1,       //最长\多少个月。
                max_reserve_days: 0,   //最长预定天数。，一个月按30天计划
                max_reserve_date: '',  //最长可预定的日期。例如：2019-09-12
                select_start_ymd : '', //开始提交时间  例如：2019-5-8
                select_start_show: '', //开始显示时间  例如：05月08日
                select_end_ymd: '',    //结束提交时间  例如：2019-5-8
                select_end_show: '',   //结束显示时间  例如：05月08日
                select_index:'start',  //记录当前点击时间，所对应的时间是开始时间还是结束时间
                select_all_day:'',
                month:'',
                year:'',
                selectDates:[],
                result:{},
                startDateSel:''
            }
        },
        methods:{
            initDate:function(){
                var _this = this;
                // 创建时间对象
                let date = new Date();
                this.month = date.getMonth() + 1;
                this.year = date.getFullYear();
                // 获取完整年月
                let fullDate = [
                    date.getFullYear(),
                    date.getMonth() + 1,
                    date.getDate(),
                    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
                ];
                if(this.startDate!='' && this.endDate!=''){
                    fullDate = [
                        new Date(this.startDate).getFullYear(),
                        new Date(this.startDate).getMonth() + 1,
                        new Date(this.startDate).getDate(),
                        new Date(this.startDate).getFullYear() + '-' + (new Date(this.startDate).getMonth() + 1) + '-' + new Date(this.startDate).getDate()
                    ];
                    this.month = new Date(this.startDate).getMonth() + 1;
                    this.year = new Date(this.startDate).getFullYear();
                }

                /**
                 * 从缓存拿已经设置的开始和结束日期
                 * 如果第一次用户是第一次进入。则设置默认值为,并且保存进缓存。
                 */

                //通过月份。计划最长可预定天数和日期  ,最后一天为离店时间。所以多加一天可选择
                let max_reserve_days = _this.month_length * 30 + 1;

                //最大天数转换成毫秒数。再转换成时间
                let max_date = new Date(date.getTime() + max_reserve_days * 24 * 60 * 60 * 1000);
                let max_reserve_date = max_date.getFullYear() + '-' + (max_date.getMonth() + 1) + '-' + max_date.getDate() + '';
                _this.max_reserve_days = max_reserve_days
                _this.max_reserve_date = max_reserve_date

                //获取当前月份完整日期天数
                let cur_month_date = new Date(fullDate[0] + '-' + _this.parseMonth(fullDate[1]) + '-01')
                let cur_month = {};
                cur_month.fullYear = fullDate[0]; //  年
                cur_month.fullMonth = fullDate[1];  //月
                cur_month.dayLength = _this.getMonthDays(cur_month.fullMonth, cur_month.fullYear);//当前月份总共有多少天
                cur_month.firstDayWeek = cur_month_date.getDay();  //当前月份第一天星期几0~7
                cur_month.curDay = date.getDate(); //当前天
                cur_month.days = [];
                //初始化天数
                var item = {};
                for (let i = 1; i <= cur_month.dayLength; i++) {
                    item = {
                        ymd: cur_month.fullYear + '-' + _this.parseMonth(cur_month.fullMonth) + '-' + _this.parseDay(i),
                        ymd_cn: _this.parseMonth(cur_month.fullMonth) + '月' + _this.parseDay(i) + '日',
                        day: i,
                        disabled: i < cur_month.curDay ? 'disabled' : '',
                        time: new Date(cur_month.fullYear + '-' + cur_month.fullMonth + '-' + i).getTime(),
                        week:new Date(cur_month.fullYear + '-' + cur_month.fullMonth + '-' + i).getDay(),
                    };
                    if(this.startDate !== null && typeof this.startDate != 'undefined' && item.ymd == this.startDate && new Date(this.startDate).getDay() != 0 && new Date(this.startDate).getDay() != 6){
                        item.start_date = 'active-start'
                    }

                    if(this.endDate !== null && typeof this.endDate != 'undefined' && item.ymd == this.endDate && new Date(this.endDate).getDay() != 0 && new Date(this.endDate).getDay() != 6){
                        item.end_date = 'active-end'
                    }
                    // //开始时间
                    // item.start_date = _this.compareDate(_this.select_start_ymd, item.ymd) == 2 ? 'active-start' : '';
                    //中间的日期
                    item.active_date = (_this.compareDate(this.startDate, item.ymd) == 3 && _this.compareDate(this.endDate, item.ymd) == 1 && item['week'] != 6 && item['week'] != 0) ? 'active' : '';
                    // //结束时间
                    // item.end_date = _this.compareDate(_this.select_end_ymd, item.ymd) == 2 ? 'active-end' : '';
                    cur_month['days'].push(item);
                }
                //前补0
                if (cur_month.firstDayWeek > 0) {
                    for (let i = 0; i < cur_month.firstDayWeek; i++) {
                        cur_month['days'].unshift('');
                    }
                }

                _this.calendar.push(cur_month)

                var next_month_date;
                var nextfullDate = [];

                for (let i2 = 0; i2 < _this.month_length; i2++) {
                    //下一个朋的天数信息
                    next_month_date = new Date(fullDate[0], fullDate[1] + i2, '1');
                    nextfullDate = [
                        next_month_date.getFullYear(),
                        next_month_date.getMonth() + 1,
                    ]
                    var next_month = {};
                    next_month.fullYear = nextfullDate[0]; //  年
                    next_month.fullMonth = nextfullDate[1];  //月
                    next_month.dayLength = _this.getMonthDays(next_month.fullMonth, next_month.fullYear);//当前月份总共有多少天
                    next_month.firstDayWeek = next_month_date.getDay();  //当前月份第一天星期几0~6
                    next_month.days = [];
                    //初始化天数
                    for (let i = 1; i <= next_month.dayLength; i++) {
                        item = {
                            ymd: next_month.fullYear + '-' + _this.parseMonth(next_month.fullMonth) + '-' + _this.parseDay(i),
                            ymd_cn: _this.parseMonth(next_month.fullMonth) + '月' + _this.parseDay(i) + '日',
                            day: i,
                            active: '',
                            disabled: '',
                            week:new Date(next_month.fullYear + '-' + next_month.fullMonth + '-' + i).getDay(),
                            time: new Date(next_month.fullYear + '-' + next_month.fullMonth + '-' + i).getTime()
                        };
                        if(this.startDate !== null && typeof this.startDate != 'undefined' && this.select_start_ymd == '' && item.ymd == this.startDate  && new Date(this.startDate).getDay() != 0 && new Date(this.startDate).getDay() != 6){
                            item.start_date = 'active-start'
                        }
                        else{
                            item.start_date = _this.compareDate(_this.select_start_ymd, item.ymd) == 2 ? 'active-start' : '';
                        }

                        if(this.endDate !== null && typeof this.endDate != 'undefined' && this.select_end_ymd == '' && item.ymd == this.endDate  && new Date(this.endDate).getDay() != 0 && new Date(this.endDate).getDay() != 6){
                            item.end_date = 'active-end'
                        }
                        else{
                            item.end_date = _this.compareDate(_this.select_end_ymd, item.ymd) == 2 ? 'active-end' : '';
                        }
                        //中间的日期
                        item.active_date = (_this.compareDate(this.startDate, item.ymd) == 3 && _this.compareDate(this.endDate, item.ymd) == 1 && item['week'] != 6 && item['week'] != 0) ? 'active' : '';
                        next_month['days'].push(item);
                    }
                    //前补0
                    if (next_month.firstDayWeek > 0) {
                        for (let i = 0; i < next_month.firstDayWeek; i++) {
                            next_month['days'].unshift('');
                        }
                    }
                    _this.calendar.push(next_month)
                }
            },

            prevMonth(){
                this.calendar = [];
                this.comPrevMonth();
                this.comPrevMonth();
            },
            comPrevMonth(){
                this.month -= 1;
                if(this.month == 0){
                    this.month = 12;
                    this.year -= 1;
                }
                //通过月份。计划最长可预定天数和日期  ,最后一天为离店时间。所以多加一天可选择
                var _this = this;
                var item = {};
                var prev_month = {};
                prev_month.fullYear = this.year; //  年
                prev_month.fullMonth = this.month;  //月
                prev_month.dayLength = _this.getMonthDays(prev_month.fullMonth, prev_month.fullYear);//当前月份总共有多少天
                prev_month.firstDayWeek = new Date(prev_month.fullYear, prev_month.fullMonth-1, 1).getDay();  //当前月份第一天星期几0~6
                prev_month.days = [];
                //最大天数转换成毫秒数。再转换成时间
                //初始化天数
                for (let i = 1; i <= prev_month.dayLength; i++) {
                    item = {
                        ymd: prev_month.fullYear + '-' + _this.parseMonth(prev_month.fullMonth) + '-' + _this.parseDay(i),
                        ymd_cn: _this.parseMonth(prev_month.fullMonth) + '月' + _this.parseDay(i) + '日',
                        day: i,
                        active: '',
                        disabled: '',
                        time: new Date(prev_month.fullYear + '-' + prev_month.fullMonth + '-' + i).getTime(),
                        week:new Date(prev_month.fullYear + '-' + prev_month.fullMonth + '-' + i).getDay(),
                    };
                    if(this.startDate !== null && typeof this.startDate != 'undefined' && this.select_start_ymd == '' && item.ymd == this.startDate){
                        item.start_date = 'active-start'
                    }
                    else{
                        item.start_date = _this.compareDate(_this.select_start_ymd, item.ymd) == 2 ? 'active-start' : '';
                    }

                    if(this.endDate !== null && typeof this.endDate != 'undefined' && this.select_end_ymd == '' && item.ymd == this.endDate){
                        item.end_date = 'active-end'
                    }
                    else{
                        item.end_date = _this.compareDate(_this.select_end_ymd, item.ymd) == 2 ? 'active-end' : '';
                    }
                    //中间的日期
                    if(this.select_start_ymd != '' && this.select_end_ymd != ''){
                        item.active_date = (_this.compareDate(this.select_start_ymd, item.ymd) == 3 && _this.compareDate(this.select_end_ymd, item.ymd) == 1  && item['week'] != 6 && item['week'] != 0) ? 'active' : '';
                    }
                    else{
                        item.active_date = (_this.compareDate(this.startDate, item.ymd) == 3 && _this.compareDate(this.endDate, item.ymd) == 1  && item['week'] != 6 && item['week'] != 0) ? 'active' : '';
                    }

                    prev_month['days'].push(item);
                }
                //前补0
                if (prev_month.firstDayWeek > 0) {
                    for (let i = 0; i < prev_month.firstDayWeek; i++) {
                        prev_month['days'].unshift('');
                    }
                }
                _this.calendar.unshift(prev_month)
            },

            nextMonth(){
                this.calendar = [];
                this.comNextMonth();
                this.comNextMonth();
            },

            comNextMonth(){
                this.month += 1;
                if(this.month == 13){
                    this.month = 1;
                    this.year += 1;
                }
                //通过月份。计划最长可预定天数和日期  ,最后一天为离店时间。所以多加一天可选择
                var _this = this;
                var item = {};
                var next_month = {};
                next_month.fullYear = this.year; //  年
                next_month.fullMonth = this.month;  //月
                next_month.dayLength = _this.getMonthDays(next_month.fullMonth, next_month.fullYear);//当前月份总共有多少天
                next_month.firstDayWeek = new Date(next_month.fullYear, next_month.fullMonth-1, 1).getDay();  //当前月份第一天星期几0~6
                next_month.days = [];
                //最大天数转换成毫秒数。再转换成时间
                //初始化天数
                for (let i = 1; i <= next_month.dayLength; i++) {
                    item = {
                        ymd: next_month.fullYear + '-' + _this.parseMonth(next_month.fullMonth) + '-' + _this.parseDay(i),
                        ymd_cn: _this.parseMonth(next_month.fullMonth) + '月' + _this.parseDay(i) + '日',
                        day: i,
                        active: '',
                        disabled: '',
                        time: new Date(next_month.fullYear + '-' + next_month.fullMonth + '-' + i).getTime(),
                        week:new Date(next_month.fullYear + '-' + next_month.fullMonth + '-' + i).getDay(),
                    };
                    if(this.startDate !== null && typeof this.startDate != 'undefined' && this.select_start_ymd == '' && item.ymd == this.startDate){
                        item.start_date = 'active-start'
                    }
                    else{
                        item.start_date = _this.compareDate(_this.select_start_ymd, item.ymd) == 2 ? 'active-start' : '';
                    }

                    if(this.endDate !== null && typeof this.endDate != 'undefined' && this.select_end_ymd == '' && item.ymd == this.endDate  && item['week'] != 6 && item['week'] != 0){
                        item.end_date = 'active-end'
                    }
                    else{
                        item.end_date = _this.compareDate(_this.select_end_ymd, item.ymd) == 2 ? 'active-end' : '';
                    }

                    if(this.endDate !== null && typeof this.endDate != 'undefined' && this.select_end_ymd == '' && item.ymd == this.endDate  && item['week'] != 6 && item['week'] != 0){
                        item.end_date = 'active-end'
                    }
                    else{
                        item.end_date = _this.compareDate(_this.select_end_ymd, item.ymd) == 2 ? 'active-end' : '';
                    }
                    // //开始时间
                    //item.start_date = _this.compareDate(_this.select_start_ymd, item.ymd) == 2 ? 'active-start' : '';
                    //中间的日期
                    if(this.select_start_ymd != '' && this.select_end_ymd != ''){
                        item.active_date = (_this.compareDate(this.select_start_ymd, item.ymd) == 3 && _this.compareDate(this.select_end_ymd, item.ymd) == 1 && item['week'] != 6 && item['week'] != 0) ? 'active' : '';
                    }
                    else{
                        item.active_date = (_this.compareDate(this.startDate, item.ymd) == 3 && _this.compareDate(this.endDate, item.ymd) == 1 && item['week'] != 6 && item['week'] != 0) ? 'active' : '';
                    }
                    //item.active_date = (_this.compareDate(this.select_start_ymd, item.ymd) == 3 && _this.compareDate(this.select_end_ymd, item.ymd) == 1) ? 'active' : '';
                    //结束时间
                    //item.end_date = _this.compareDate(_this.select_end_ymd, item.ymd) == 2 ? 'active-end' : '';
                    next_month['days'].push(item);
                }
                //前补0
                if (next_month.firstDayWeek > 0) {
                    for (let i = 0; i < next_month.firstDayWeek; i++) {
                        next_month['days'].unshift('');
                    }
                }
                _this.calendar.push(next_month)
            },
            //格式月份期
            parseMonth: function(month){
                month = parseInt(month);
                if(month <10){
                    month = '0'+month
                }
                return month;
            },

            //格式天
            parseDay: function (day) {
                day = parseInt(day);
                if (day < 10) {
                    day = '0' + day
                }
                return day;
            },
            // 获取每个月的天数
            getMonthDays(m, year) {
                let days = [0, 31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                if (m != 2) {
                    return days[m];
                }
                if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0 && year % 100 === 0)) {
                    return 29
                } else {
                    return 28
                }
            },
            compareDate(date1, date2){
                var dateone = date1.replace(/-/g,'/');
                var datetwo = date2.replace(/-/g,'/');
                var oDate1 = new Date(dateone)
                var oDate2 = new Date(datetwo)
                if(oDate1.getTime() > oDate2.getTime()){
                    return 1; //大于
                } else if (oDate1.getTime() == oDate2.getTime()) {
                    return 2; //等于
                }else{
                    return 3; //小于
                }
            },
            //点击日期按钮
            selectDate:function(item){
                var _this = this;
                let select_data = item;
                let select_start_ymd = _this.select_start_ymd;
                let select_end_ymd = _this.select_end_ymd;
                //如果是点击不能用的地址
                if (_this.select_index == 'start') {
                    if(item.week == 0 || item.week == 6){
                        alert("开始时间不能选择周六或者周日");
                        return false;
                    }
                    this.startDateSel = '';
                    this.startDateSel = select_data.ymd;
                    this.selectDates = [];
                    select_start_ymd = select_data.ymd;
                    //如果选择的日期。是当前日期。或者比当前开始日期还早的。就 要把当前日期变为开始日期

                    _this.select_start_ymd = select_start_ymd;
                    _this.select_start_ymd_show = select_data.ymd_cn;
                    _this.select_end_ymd = '';
                    _this.select_end_ymd_show = '';
                    item['start_date'] = 'active-start'
                    var items = {};
                    items['ymd'] = select_start_ymd;
                    items ['ymd_show'] = select_data.ymd_cn;
                    items ['time'] = select_data.time;
                    // items.start_date = 'active_start'
                    this.selectDates.push(items);
                    console.log(this.selectDates)

                    //将索引改为结束时间

                    _this.select_index = 'end';

                }
                if (_this.select_index == 'end'){
                    if(item.week == 0 || item.week == 6){
                        alert("结束时间不能选择周六或者周日");
                        return false;
                    }
                    let v = _this.compareDate(select_start_ymd, select_data.ymd)
                    //如果选择的时间大于开始时间。则有效。否则重置开始时间
                    if(v == 3 ){
                        item['end_date'] = 'active-end'
                        _this.select_end_ymd = select_data.ymd;
                        _this.select_end_ymd_show = select_data.ymd_cn;
                        var items1 = {};
                        items1['ymd'] = select_data.ymd;
                        items1 ['ymd_show'] = select_data.ymd_cn;
                        items1 ['time'] = select_data.time;
                        this.selectDates.push(items1);
                        //将索引改为结束时间
                        _this.select_index = 'start';
                        //保存数据到缓存
                        _this.saveDate();
                    }else{
                        _this.select_start_ymd = select_data.ymd;
                        _this.select_start_ymd_show = select_data.ymd_cn;
                        _this.select_end_ymd = '';
                        _this.select_end_ymd_show = '';
                        //将索引改为结束时间
                        _this.select_index = 'end';
                    }
                }
                this.result = {};
                this.result['date'] = this.selectDates;
                // this.result['days'] = this.select_all_day;
                _this.resetCalendar();
            },

            //重新计算一下日历
            resetCalendar:function(){
                var m = 0;
                let _this = this;
                let calendar = _this.calendar;
                if(calendar.length > 0 ){
                    for (var i = 0; i < calendar.length; i++){
                        if(calendar[i]['days'].length > 0 ){
                            for (var i2 = 0; i2 < calendar[i]['days'].length; i2++) {
                                if (calendar[i]['days'][i2] != ''){
                                    //开始时间
                                    calendar[i]['days'][i2]['start_date'] = _this.compareDate(_this.select_start_ymd, calendar[i]['days'][i2]['ymd']) == 2 ? 'active-start' : '';
                                    _this.compareDate(_this.select_start_ymd, calendar[i]['days'][i2]['ymd']) == 2 && calendar[i]['days'][i2]['week'] == 0 || _this.compareDate(_this.select_start_ymd, calendar[i]['days'][i2]['ymd']) == 2 && calendar[i]['days'][i2]['week'] == 6 ? m++ : 0
                                    //中间的日期
                                    calendar[i]['days'][i2]['active_date'] = (_this.compareDate(_this.select_start_ymd, calendar[i]['days'][i2]['ymd']) == 3 && _this.compareDate(_this.select_end_ymd, calendar[i]['days'][i2]['ymd']) == 1 && calendar[i]['days'][i2]['week'] != 6 && calendar[i]['days'][i2]['week'] != 0) ? 'active' : '';
                                    _this.compareDate(_this.select_start_ymd, calendar[i]['days'][i2]['ymd']) == 3 && _this.compareDate(_this.select_end_ymd, calendar[i]['days'][i2]['ymd']) == 1 && calendar[i]['days'][i2]['week'] == 0 || _this.compareDate(_this.select_start_ymd, calendar[i]['days'][i2]['ymd']) == 3 && _this.compareDate(_this.select_end_ymd, calendar[i]['days'][i2]['ymd']) == 1 &&  calendar[i]['days'][i2]['week'] == 6 ? m++ : 0;
                                    //结束时间
                                    calendar[i]['days'][i2]['end_date'] = _this.compareDate(_this.select_end_ymd, calendar[i]['days'][i2]['ymd']) == 2 ? 'active-end' : '';
                                    _this.compareDate(_this.select_end_ymd, calendar[i]['days'][i2]['ymd']) == 2 && calendar[i]['days'][i2]['week'] == 0 || _this.compareDate(_this.select_end_ymd, calendar[i]['days'][i2]['ymd']) == 2 && calendar[i]['days'][i2]['week'] == 6 ? m++ : 0
                                }
                            }
                        }
                    }
                }
                _this.calendar = calendar;
                _this.result['days'] = this.select_all_day-m;
                this.$emit('on-end', this.result);
            },

            //如果设置结束时间成功。保存一次当前时间。并且计算总天数。到缓存中
            saveDate:function(){
                var _this = this;
                var date1 = new Date(this.select_start_ymd.replace(/-/g,'/'));
                var date2 = new Date(this.select_end_ymd.replace(/-/g,'/'));
                //计算天数
                var days = Math.ceil((date2.getTime() - date1.getTime()) / 1000 / 86400)+1;
                //保存缓存
                _this.select_all_day = days;
            }
        },
        computed:{},
        mounted(){
            var _this = this;
            _this.$nextTick(function () {
                _this.initDate()
            })
        },
        watch:{
            startDate(){
                this.calendar = [];
                this.initDate();
            },
            endDate(){
                this.calendar = [];
                this.initDate();
            }
        }
    }
</script>

<style scoped>
    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        list-style: none;
    }
    .calendar-body{
        width: 100%;
        height: auto;
        padding: 15px;
        box-sizing: border-box;
        overflow: hidden;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
    }
    .week-title {
        background-color: #f6f6f8;
        width: 100%;
        height: 30px;
        background-color: rgba(246, 250, 254, 1);
    }
    .week-title>div {
        width: 14.27%;
        height: 25px;
        line-height: 25px;
        float: left;
        color: rgba(112, 133, 195, 1);
        font-size: 13px;
        text-align: center;
    }
    .box {
        position: absolute;
        top: 2rem;
        z-index: 1;
    }
    .data-title {
        font-size: 17px;
        color: rgba(67, 147, 224, 1);
        font-family: "思源黑体";
        text-align: left;
        padding-left: 9px;
        background-color: #f6f6f8;
        padding-right: 9px;
        height: 40px;
        line-height: 40px;
        overflow: hidden;
        clear: both;
    }
    .iconRight{
        width: 25%;
        float: right;
        height: 40px;
        line-height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .iconLefts,.iconRights{
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background-color: rgba(67, 147, 224, 1);
        text-align: center;
        line-height: 18px;
        float: left;
        color: #fff;
        font-size: 14px;
        cursor: pointer;

    }
    .iconLefts{
        margin-right: 13px;
    }
    .iconLefts img, .iconRights img{
        width: 15px;
        height: 15px;
        margin-top: 1.5px;
    }
    .item{
        width: 49%;
        height: auto;
        clear: both;
        overflow: hidden;
    }
    .calendar-data {
        width: 100%;
        height: 100%;
        clear: both;
        background-color: #f6faff;
    }
    .day {
        width: 14.27%;
        height: 25px;
        line-height: 25px;
        float: left;
        font-size: 13px;
        font-family: "Adobe 黑体 Std R";
        text-align: center;
        cursor: pointer;
        margin-bottom: 10px;
        color: rgba(94, 46, 186, 1);
    }
    .day.disabled{
        line-height: 25px;
        float: left;
        font-size: 13px;
        color: rgba(155, 167, 207, 1);
    }
    .day.active-start {
        color: white;
        background-color: #4394e2;
        border-radius: 5px;
    }
    .active {
        color: white;
        background-color: #d2e6f8;
        color: rgba(94, 46, 186, 1);
    }
    .active-end {
        color: white;
        background-color: #4394e2;
        position: relative;
        border-radius: 5px;
    }
    .active-end i{
        position: absolute;
        top:-120%;
        width:100%;
        height:100%;
        background:rgba(0,0,0,1);
        opacity:0.6;
        border-radius:8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-style: normal;
        font-size: 15px;
        color:#fff;
    }
    .active-end i::after{
        position: absolute;
        content: '';
        float: left;
        width: 0;
        height: 0;
        border-width: 10px;
        border-style: solid;
        border-color:#000 transparent transparent transparent;
        opacity:1;
        bottom:-20px;
        left:50%;
        margin-left:-10px;
    }
    .screenbottom{
        height:35px;
        width:100%;
        display: flex;
    }
    .reset{
        width:50%;
        height:40px;
        line-height: 40px;
        color:#3E3E3E;
        text-align: center;
        background: #fff;
    }
    .determine{
        width:50%;
        height:40px;
        line-height: 40px;
        background: #48D8BF;
        color:#fff;
        text-align: center;
    }
    footer{
        position: fixed;
        bottom:0;
        width:100%;
    }
    [v-cloak]
    {
        display: none;
    }
</style>
