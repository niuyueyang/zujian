import Element from './input'

Element.install = function (Vue) {
  Vue.component(Element.name, Element)
}

export default Element
