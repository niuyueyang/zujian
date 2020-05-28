<template>
    <Skeleton :paragraph="paragraph" :active="true"/>
</template>

<script>
    import Skeleton from './../components/Skeleton/Skeleton'
    export default {
        data() {
            return {
                paragraph: {
                    type: "row",
                    rows: [
                        {
                            type: 'rect',
                            style: {
                                width: '50%',
                                height: '16px'
                            }
                        },
                        {
                            type: 'rect',
                            rowStyle: {
                                marginTop: '24px'
                            },
                            style: {
                                width: '100%',
                                height: '16px'
                            }
                        },
                        {
                            type: 'rect',
                            rowStyle: {
                                marginTop: '16px'
                            },
                            style: {
                                width: '50%',
                                height: '16px'
                            }
                        },
                        {
                            type: 'rect',
                            rowStyle: {
                                marginTop: '16px'
                            },
                            style: {
                                width: '61%',
                                height: '16px'
                            }
                        }
                    ]
                }
            }
        },
        components:{
            Skeleton
        }
    }
</script>
