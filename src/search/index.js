import React from 'react'
const ReactDom = require('react-dom') 
import './search.styl'
import 'fixed-data-table-2/dist/fixed-data-table-base.min.css'
import logo from '../images/logo.png'
import { format } from 'util';
import {Table, Column, Cell} from 'fixed-data-table-2'
class Search extends React.Component {
    render () {
        return <div className="search-text">
            Search Text11<img src={logo} />
            </div>
    }
}

ReactDom.render(
    <Search/>,
    document.getElementById('root')
)

// 受控组件
class NameForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            value: ''
        }
    }
    updateValue (e) {
        this.setState({
            value: e.target.value
        })
    }
    checkSubmit (e) {
        console.log(this.state.value)
        e.preventDefault()
    }
    shouldComponentUPdate() {
        console.log('Component Update')
        return true
    }
    componentWillUpdate () {
        console.log('componentWillUpdate', this.state.value)
    }
    render () {
        console.log('render')
        return (
            <form onSubmit={(e)=>checkSubmit(e)}>
                <input value={this.state.value} onChange={(e) => this.updateValue(e)}/>
                {/* <p>
                    <select value='3'>
                        <option value='1'>Bob</option>
                        <option value='2'>John</option>
                        <option value='3'>Kaly</option>
                    </select>
                </p> */}
            </form>
        )
    }
    componentDidUpdate () {
        console.log('componentDidUpdate',this.state.value)
    }
}
ReactDom.render(<NameForm/>,document.querySelector('.form-control'))

// 函数式组件
function CustomTextInput () {
    let textInput = null
    function handleClick () {
        textInput.focus()
    }
    return (
        <div>
            <input type="text" ref={(input)=>{textInput = input}}/>
            <input type="button" value='focus the input' onClick={handleClick}/>
        </div>
    )
}
ReactDom.render(<CustomTextInput/>,document.querySelector('.custom-text-focus'))

class MyTable extends React.Component {
    render () {
        return (
            <Table 
            rowsCount={500}
            rowHeight = {50}
            headerHeight={50}
            width = {1000}
            height = {500}
            >
                <Column header={<Cell>first-name</Cell>} cell={<Cell>Basic content</Cell>} width={200} fixed={true}/>
                <Column header={<Cell>last-name</Cell>} cell={<Cell>Basic content</Cell>} width={200}/>
                <Column header={<Cell>birth-day</Cell>} cell={<Cell>Basic content</Cell>} width={200}/>
                <Column header={<Cell>show-time</Cell>} cell={<Cell>Basic content</Cell>} width={200}/>
                <Column header={<Cell>first-name</Cell>} cell={<Cell>Basic content</Cell>} width={200}/>
            </Table>
        )
    }
}
ReactDom.render(<MyTable/>, document.querySelector('.table-wrapper'))