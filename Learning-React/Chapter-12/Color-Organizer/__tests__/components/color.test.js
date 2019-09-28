
import toJSON from 'enzyme-to-json'
import { compose } from 'redux'
import Color from '../../src/components/Color'

const { shallow, mount } = Enzyme

describe("<Color /> UI Component", () => {

    const shallowExpect = compose(expect,toJSON,shallow)

    it("Renders correct properties", () =>
        shallowExpect(
            <Color title="Test Color" color="#F0F0F0" rating={3}  timestamp="Mon Apr 11 2016 12:54:19 GMT-0700 (PDT)" />
        ).toMatchSnapshot()
    )

    it("Invokes onRate property", () => {
        mount(<Color title="Test Color" color="#F0F0F0" />)
            .find("div.star-container")
            .childAt(2)
            .simulate('click')
    })

    it("Invokes onRate property", () => {
        mount(<Color title="Test Color" color="#F0F0F0" />)
            .find("button")
            .simulate('click')
    })

    it("Invokes onRate property", () => {
        mount(<Color title="Test Color" color="#F0F0F0" />)
            .find("div.star-rating")
    })

})
