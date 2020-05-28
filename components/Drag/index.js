import Element from './Drag'

Element.install = function (Vue) {
    Vue.component(Element.name, Element)
}

export default Element
