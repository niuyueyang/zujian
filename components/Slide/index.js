import Element from './Slide'

Element.install = function (Vue) {
    Vue.component(Element.name, Element)
}

export default Element
