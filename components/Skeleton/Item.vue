<template>
    <div>
        <div
                v-if="paragraph.type=='row'"
                :class="paragraph.containerClass"
                class="ske-row-container"
        >
            <div class="ske ske-row" :style="row.rowStyle" v-for="(row,index) in paragraph.rows" :key="index">
                <Item :paragraph="row" :active="active"></Item>
            </div>
        </div>

        <div
            v-else-if="paragraph.type=='col'"
            :class="paragraph.containerClass"
            class="ske-row-container"
        >
            <div class="ske ske-col" :style="col.colStyle" v-for="(col,index) in paragraph.cols" :key="index">
                <Item :paragraph="col" :active="active"></Item>
            </div>
        </div>

        <div
                v-else-if="paragraph.type=='rect'"
                :class="paragraph.containerClass"
                class="ske-row-container"
        >
            <div class="ske ske-rect" :class="{'ske-ani':active}" :style="paragraph.style">
            </div>
        </div>

        <div
                v-else-if="paragraph.type=='circle'"
                :class="paragraph.containerClass"
                class="ske-row-container"
        >
            <div class="ske ske-circle" :class="{'ske-ani':active}" :style="paragraph.style">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Item",
        props:['paragraph','active']
    }
</script>

<style scoped>
    @keyframes skeleton-stripes {
        from {
            background-position: 0 0;
        }
        to {
            background-position: 20rem 0;
        }
    }

    .ske-rect, .ske-circle {
        background-size: 400% 100%;
        background-color: #f2f2f2;
        margin: 0;
    }

    .ske-rect.ske-ani, .ske-circle.ske-ani {
        animation: skeleton-stripes 1s linear infinite;
        background: #F1F3F4 linear-gradient(90deg, rgba(255, 255, 255, 0.39) 25%, transparent 25%);
        background-size: 20rem 20rem;
    }

    .ske-col-container {
        display: flex;
    }

    .ske-col, .ske-row {
        margin: 0;
    }

    .ske-circle {
        border-radius: 100%;
    }
</style>
