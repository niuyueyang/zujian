<script>
    import emit from './../../utils/emit'
    export default{
        name: 'hCheckbox',
        mixins:[emit],
        props:{
            label:String,
            checked:Boolean,
            disabled:Boolean
        },
        data(){
            return{
                checkedVal:false
            }
        },
        created(){
            const checkArray = this.$parent.checkArray;
            if(typeof (checkArray)!='undefined'){
                if(checkArray.some(item=>item===this.label)){
                    this.checkedVal = true;
                }
            }
        },
        mounted(){
            this.$on('input',val=>{
                console.log(val)
            })
        },
        methods:{
            stop(e){
                if(this.disabled) return
                e&&e.preventDefault();
                this.checkedVal = !this.checkedVal
                this.$emit('change', this.checkedVal)
                this.$emit('input', this.checkedVal)
                this.dispatch('hCheckboxGroup', 'check', this.label)
            }
        },
        render(){
            const value = this.$slots.default || this.label;
            const classNames = ['x-checkbox'];
            const checked = this.checkedVal || this.checked;
            checked && classNames.push('x-checkbox-checked');
            this.disabled && classNames.push('x-checkbox-disabled');
            return <label class={classNames} onClick={this.stop}>
                        <input type="checkbox" name={this.label} disabled={this.disabled}/>
                        <span>{value}</span>
                    </label>
        }
    }
</script>
