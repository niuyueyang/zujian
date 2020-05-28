import Element from './notice.vue'
import create from './../../utils/create'
import {
  isObject
} from './../../utils/data-type'

let NoticeWrap

function createNoticeWrap() {
  const NoticeWrap = document.createElement('div')
  NoticeWrap.className = 'x-notice-wrap'
  document.body.appendChild(NoticeWrap)
  return NoticeWrap
}

function NoticeCreate(props, type) {
  if (!isObject(props) && !props.title) {
    return
  }
  console.log(props,type)
  props.type = type

  if (!NoticeWrap) {
    NoticeWrap = createNoticeWrap()
  }

  const notice = create(Element, props, NoticeWrap)
  notice.$on('onClose', notice.remove)

}

const methods = Object.keys(Element.data().iconType)

const Notice = {
  open: (options) => NoticeCreate(options, 'open')
}

methods.forEach((key) => {
  /*
  * this.$notice.info({
        title: 'Notice 通知提醒',
        desc: '我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述',
    })
    {
        title: 'Notice 通知提醒',
        desc: '我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述我是描述',
    }，是传递的参数，相当于这里的options
  * */
  Notice[key] = (options) => NoticeCreate(options, key)
})
export default Notice
