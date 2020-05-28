<template>
    <hMenu>
        <MenuSub name="标题1">
            <MenuItem name="1-0">内容管理1</MenuItem>
            <MenuItem name="1-1">文章管理1</MenuItem>
            <MenuItem name="1-2">评论管理1</MenuItem>
            <MenuItem name="1-3">举报管理1</MenuItem>
            <MenuSub name="标题11" className="sub">
                <MenuItem name="1-5-1" className="subItem">内容管理1</MenuItem>
                <MenuItem name="1-5-2" className="subItem">文章管理1</MenuItem>
            </MenuSub>

        </MenuSub>
        <MenuSub name="标题2">
            <MenuItem name="2-0">内容管理2</MenuItem>
            <MenuItem name="2-1">文章管理2</MenuItem>
            <MenuItem name="2-2">评论管理2</MenuItem>
            <MenuItem name="2-3">举报管理2</MenuItem>
        </MenuSub>
        <MenuSub name="标题3">
            <MenuItem name="3-0">内容管理3</MenuItem>
            <MenuItem name="3-1">文章管理3</MenuItem>
            <MenuItem name="3-2">评论管理3</MenuItem>
            <MenuItem name="3-3">举报管理3</MenuItem>
        </MenuSub>
    </hMenu>
</template>

<script>
    export default {
        name: "menu"
    }
</script>

<style scoped>

</style>
