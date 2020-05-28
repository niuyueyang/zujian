<template>
    <Table :columns = "columns" :data = "data">
        <template slot-scope="{ row, index }" slot="birthday">
            <input type="text" v-model="editBirthday" v-if="editIndex === index" />
            <span v-else>{{ getBirthday(row.birthday) }}</span>
        </template>
        <template slot-scope="{ row, index }" slot="action">
            <div v-if="editIndex === index">
                <button @click="handleSave(index)">保存</button>
                <button @click="editIndex = -1">取消</button>
            </div>
            <div v-else>
                <button @click="handleEdit(row, index)">操作</button>
            </div>
        </template>
    </Table>
</template>

<script>
    export default {
        name: "tableRender",
        data(){
            return{
                columns: [
                    {
                        title: '姓名',
                        key: 'name',
                        render: (h, { row, index }) => {
                            let edit;

                            // 当前行为聚焦行时
                            if (this.editIndex === index) {
                                edit = [h('input', {
                                    domProps: {
                                        value: row.name
                                    },
                                    on: {
                                        input: (event) => {
                                            this.editName = event.target.value;
                                        }
                                    }
                                })];
                            } else {
                                edit = row.name;
                            }

                            return h('div', [
                                edit
                            ]);
                        }
                    },
                    {
                        title: '年龄',
                        key: 'age',
                        render: (h, { row, index }) => {
                            let edit;

                            // 当前行为聚焦行时
                            if (this.editIndex === index) {
                                edit = [h('input', {
                                    domProps: {
                                        value: row.age
                                    },
                                    on: {
                                        input: (event) => {
                                            this.editAge = event.target.value;
                                        }
                                    }
                                })];
                            } else {
                                edit = row.age;
                            }

                            return h('div', [
                                edit
                            ]);
                        }
                    },
                    {
                        title: '出生日期',
                        slot:'birthday'
                    },
                    {
                        title: '地址',
                        key: 'address',
                        render: (h, { row, index }) => {
                            let edit;

                            // 当前行为聚焦行时
                            if (this.editIndex === index) {
                                edit = [h('input', {
                                    domProps: {
                                        value: row.address
                                    },
                                    on: {
                                        input: (event) => {
                                            this.editAddress = event.target.value;
                                        }
                                    }
                                })];
                            } else {
                                edit = row.address;
                            }

                            return h('div', [
                                edit
                            ]);
                        }
                    },
                    {
                        title: '操作',
                        slot: 'action'
                    }
                ],
                data: [
                    {
                        name: '王小明',
                        age: 18,
                        birthday: '919526400000',
                        address: '北京市朝阳区芍药居'
                    },
                    {
                        name: '张小刚',
                        age: 25,
                        birthday: '696096000000',
                        address: '北京市海淀区西二旗'
                    },
                    {
                        name: '李小红',
                        age: 30,
                        birthday: '563472000000',
                        address: '上海市浦东新区世纪大道'
                    },
                    {
                        name: '周小伟',
                        age: 26,
                        birthday: '687024000000',
                        address: '深圳市南山区深南大道'
                    }
                ],
                editIndex: -1,  // 当前聚焦的输入框的行数
                editName: '',  // 第一列输入框
                editAge: '',  // 第二列输入框
                editBirthday: '',  // 第三列输入框
                editAddress: '',  // 第四列输入框
            }
        },
        methods:{
            getBirthday (birthday) {
                const date = new Date(parseInt(birthday));
                const year = date.getFullYear();
                const month = date.getMonth() + 1;
                const day = date.getDate();

                return `${year}-${month}-${day}`;
            },
            handleEdit (row, index) {
                this.editName = row.name;
                this.editAge = row.age;
                this.editAddress = row.address;
                this.editBirthday = row.birthday;
                this.editIndex = index;
                console.log(row)
            },
            handleSave (index) {
                this.data[index].name = this.editName;
                this.data[index].age = this.editAge;
                this.data[index].birthday = this.editBirthday;
                this.data[index].address = this.editAddress;
                this.editIndex = -1;
                console.log(row)
            },
        }
    }
</script>

<style scoped>

</style>
