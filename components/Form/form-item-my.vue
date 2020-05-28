<script>
    import AsyncValidator from 'async-validator'
    import emit from './../../utils/emit'
    export default {
        name: "hFormItem",
        inject:['rootForm'],
        mixins:[emit],
        props:{
            label:String,
            prop:String
        },
        data(){
            return{
                isRequired:false,
                isShowTips:false,
                isSuccess:false,
                message:''
            }
        },
        computed:{
            fieldValue(){
                return this.rootForm.model[this.prop];
            }
        },
        mounted(){
            if(this.prop){
                this.initValue = this.fieldValue;
                this.dispatch('hForm','formItemPush',this);
            }
            this.setRules();
        },
        beforeDestroy(){
            this.dispatch('hForm','formItemPop',this)
        },
        methods:{
            setRules(){
                let rules = this.getRules();
                if(rules&&rules.length>0){
                    rules.forEach(rule=>{
                        if(rule.required){
                            this.isRequired = rule.required;
                        }
                    })
                }
                this.$on('blur',this.onFieldBlur)
            },
            getRules(){
                let formRules = this.rootForm.rules;
                formRules = formRules ? formRules[this.prop]:[];
                return formRules;
            },
            onFieldBlur(val){
                this.rootForm.model[this.prop] = val;
                this.validate('blur');
            },
            /*
            * function(source, [options], callback): Promise
                source: 需要校验的对象（必填）.
                options: 校验选项（可选）.
                callback: 校验完成时的回调（必填）.
            *
            * */
            /*
            * 参考 https://www.cnblogs.com/wozho/p/10955525.html
            * */
            validate(trigger,callback){
                const rules = this.getFilteredRule(trigger);
                console.log(rules)
                if(!rules || rules.length==0){
                    return true;
                }
                console.log({[this.prop]:rules})
                const validator = new AsyncValidator({[this.prop]:rules});
                const model = {[this.prop] : this.fieldValue};
                validator.validate(model,{ firstFields: true },err=>{
                    this.isShowTips = err?true:false;
                    this.isSuccess = err ? false : true;
                    this.message = err?err[0].message:'';
                    callback&&callback(this.message);
                })
            },
            getFilteredRule(trigger){
                const rules = this.getRules();
                console.log(rules)
                return rules.filter(rule=>{
                    return !rule.trigger || rule.trigger.indexOf(trigger)!==-1
                })
            },
            resetField(){
                this.message='';
                this.isShowTips = false;
                this.isSuccess = false;
                this.rootForm.model[this.prop] = this.initValue;
            }
        },
        render(){
            const labelWidth = `width:${this.rootForm.labelWidth}px`;
            const lableCalssName =['x-form-lable'];
            this.isRequired && lableCalssName.push('x-form-label-required');
            const wrapperClassNmae = ['x-form-input-wrapper'];
            this.isShowTips && wrapperClassNmae.push('x-form-input-wrapper__error')
            this.isSuccess && wrapperClassNmae.push('x-form-input-wrapper__success')
            const errorTips =<div class='x-form-error-tips'>{this.message}</div>;
            return(
                <div class='x-form-item'>
                    <label class={lableCalssName} style={labelWidth}>
                        {this.label}
                    </label>
                    <div class={wrapperClassNmae}>
                        {this.$slots.default}
                        {this.isShowTips&&errorTips}
                    </div>
                </div>
            )
        }
    }
</script>


