import Element from './Confirm.vue'
import create from './../../utils/create'
import {isString,isObject} from "@/utils/data-type";

function confirmCreate(content, title, obj) {
    if (!isString(content) && content == '') {
        return
    }

    let props = {
        content: content,
        type: 'confirm',
        title:title
    }

    if (isObject(obj)) {
        props.obj = obj
    }

    const confirm = create(Element, props)
    //在Confirm.vue组件执行onClose后，执行remove移除


    confirm.$on('onClose', confirm.remove)
    // new Promise((resolve, reject ) => {
    //     confirm.$on('onOk', (fn) => {
    //        resolve(fn)
    //     })
    //     confirm.$on('onCancel', (fn) => {
    //        reject(fn)
    //     })
    // })



    return confirm.hide.bind(this)
}

let Confirm = (content, title, obj) => confirmCreate(content, title, obj)


export default Confirm
