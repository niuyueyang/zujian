import Element from './Message.vue'
import create from './../../utils/create'
import {
    isString,
    isNumber
} from './../../utils/data-type'


function messageCreate(content, type, duration) {
    if (!isString(content) && content == '') {
        return
    }

    let props = {
        content: content,
        type: type
    }

    if (isNumber(duration)) {
        props.duration = duration
    }

    const message = create(Element, props)
    //在Message.vue组件执行onClose后，执行remove移除

    message.$on('onClose', message.remove)

    return message.hide.bind(this)
}
const methods = Object.keys(Element.data().iconType)
const Message = {}


methods.forEach((key) => {
    //this.$message.info('message 消息')，this.$message相当于这里的Message
    Message[key] = (content, duration) => messageCreate(content, key, duration)
})

export default Message
