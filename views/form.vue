<template>
    <div>
        <h-form :model="formValidate" :rules="ruleValidate" ref="formValidate">
            <h-form-item label="Name" prop="user">
                <h-input placeholder="请输入用户名" v-model="formValidate.user"/>
            </h-form-item>
            <h-form-item label="E-mail" prop="mail">
                <h-input placeholder="请输入邮箱" v-model="formValidate.mail"/>
            </h-form-item>
            <h-form-item>
                <button type='primary' @click="handleSubmit('formValidate')">Submit</button>
                <button @click="handleReset('formValidate')" style="margin-left:10px;">Reset</button>
            </h-form-item>
        </h-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            formValidate: {
                user: "",
                mail: ""
            },
            ruleValidate: {
                user: [
                    {
                        required: true,
                        message: "用户名不能为空",
                        trigger: "blur"
                    },
                    {
                        type: 'string',
                        message: "用户名格式不正确",
                        trigger: "blur"
                    }
                ],
                mail: [
                    {
                        required: true,
                        message: "邮箱不能为空",
                        trigger: "blur"
                    },
                    { type: "email", message: "邮箱格式不正确", trigger: "blur" }
                ]
            }
        };
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate(valid => {
                if (valid) {
                    this.$message.success("验证成功!");
                } else {
                    this.$message.error("验证不通过!");
                }
            });
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        }
    }
};
</script>



