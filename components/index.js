import Input from './Input'
import Select from './Select'
import Checkbox from './Checkbox'
import Radio from './Radio'
import Form from './Form'
import DatepickerMy from './Date/DatepickerMy'
import Message from './Message/index.js'
import Notice from './Notice/index.js'
import Confirm from './Confirm/index.js'
import Menu from './Menu'
import Page from './Page'
import Slide from './Slide'
import Swiper from './Swiper'
import Drag from './Drag'
import ChartNum from './ChartNum'
import DateRange from './DateRange'
import DragWrap from './DragWrap'
import CardDrag from './CardDrag'
import Table from './Table'
import Tree from './Tree'
// import Skeleton from './Skeleton'



const components = {
    ...Select,
    Input,
    ...Checkbox,
    ...Menu,
    ...Form,
    DatepickerMy,
    ...Radio,
    Page,
    Slide,
    Swiper,
    Drag,
    ChartNum,
    DateRange,
    ...DragWrap,
    CardDrag,
    ...Table,
    ...Tree
    // Skeleton
}

const install = (Vue) => {
    Object.keys(components).map((key) => {
        const component = components[key]
        Vue.component(component.name, component)
    })
    Vue.prototype.$message = Message
    Vue.prototype.$notice = Notice;
    Vue.prototype.$confirm = Confirm
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

const h3 = {
    install
}

Object.keys(components).map((key) => {
    const component = components[key]
    h3[component.name] = component
})

export default h3
