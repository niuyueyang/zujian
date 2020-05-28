<template >
    <div>
        <h-checkbox v-model="checked" label="Checkbox"/>
        <h-checkbox-group v-model="options">
            <h-checkbox label="A">Vue</h-checkbox>
            <h-checkbox label="B">React</h-checkbox>
            <h-checkbox label="C">Angular</h-checkbox>
        </h-checkbox-group>
        <div style="margin-top:5px;">
            选中的值：{{options}}
        </div>

        <!--<h-checkbox-group v-model="options1">-->
            <!--<h-checkbox label="A">Vue</h-checkbox>-->
            <!--<h-checkbox label="B">React</h-checkbox>-->
            <!--<h-checkbox label="C">Angular</h-checkbox>-->
        <!--</h-checkbox-group>-->
        <!--<div style="margin-top:5px;">-->
            <!--选中的值：{{options1}}-->
        <!--</div>-->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                checked: true,
                options: ['A'],
                options1:[]
            };
        },
    };
</script>
