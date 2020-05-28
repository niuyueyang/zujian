import Element from './Date'

Element.install = function (Vue) {
  Vue.component(Element.name, Element)
}

export default Element
