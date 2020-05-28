<script>
    import emit from './../../utils/emit'
    export default {
        name: "hCheckboxGroup",
        props:{
            value:Array
        },
        data(){
            return{
                checkArray:this.value
            }
        },
        mounted(){
            this.$on('check',value=>{
                var index =this.checkArray.indexOf(value)
                if(index==-1){
                    this.checkArray.push(value)
                }
                else{
                    this.checkArray.splice(index,1)
                }
                this.$emit('input',this.checkArray)
            })
        },
        render(){
            return <div>{this.$slots.default}</div>
        }
    }
</script>

