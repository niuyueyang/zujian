<template>
    <div>
        {{msg}}
    </div>
</template>

<script>
    import schema from 'async-validator'
    export default {
        name: "Test",
        data(){
            return{
                error:false,
                msg:''
            }
        },
        mounted(){
            this.init();
        },
        methods:{
            init(){
                var validator = new schema(
                    {
                        name:
                            [
                                {
                                    message: "用户名不能为空",
                                    required: true,
                                    trigger: "blur"
                                },
                                {
                                    min:1,
                                    max:3,
                                    message:'做多不超过3位'
                                }
                            ]
                    }
                );
                validator.validate({name: '1261236561253'},{ firstFields: true }, errors => {
                    console.log(999)
                    if(errors) {
                        console.log(errors)
                        this.error=true;
                        this.msg=JSON.stringify(errors)
                        // validation failed, errors is an array of all errors
                        // fields is an object keyed by field name with an array of
                        // errors per field

                        // 校验未通过的情况，errors 是所有错误的数组
                        // fields 是一个 object，以字段作为 key 值，该字段对应的错误数组作为 value
                        // （其实 fields 就是把 errors 按照原对象的 key 值分组）

                        // return handleErrors(errors, fields);
                    }

                    // validation passed
                    // 这里说明校验已通过
                });



            },
            handleErrors(){
                console.log(this.error)
            }
        }
    }
</script>

<style scoped>

</style>
