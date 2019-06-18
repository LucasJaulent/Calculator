import React, { Component } from 'react'
import './calculator.css'

class Calculator extends Component {
    state = {
        current: 0,
        previous: null,
        mode: "",
        first: true,
        decimalOk: true,
    }

    addition = () => {
        const newValue = parseFloat(this.state.previous) + parseFloat(this.state.current)
        this.calcul(newValue, "addition")
    }

    substract = () => {
        const newValue = this.state.previous - this.state.current
        this.calcul(newValue, "substract")
    }

    times = () => {
        const newValue = this.state.previous * this.state.current
        this.calcul(newValue, "times")
    }

    divide = () => {
        const newValue = this.state.previous / this.state.current
        this.calcul(newValue, "divide")
    }

    absolute = () => {
        const newValue = -this.state.current
        this.setState({current: newValue, first: true, mode: "", previous: null, decimalOk: true})
    }

    percent = () => {
        const newValue = this.state.current / 100
        this.setState({current: newValue, first: true, mode: "", previous: null, decimalOk: true})
    }

    calcul = (newValue, newMode = "") => {
        if(this.state.previous != null) {
            this.setState({current: newValue, first: true, mode: newMode, previous: newValue, decimalOk: true})
        } else {
            this.setState({previous: this.state.current, first: true, mode: newMode, decimalOk: true})
        }
    }

    equal = () => {
        var newValue
        switch(this.state.mode) {
            case "divide":
                newValue = this.state.previous / this.state.current
                this.setState({current: newValue, first: true, decimalOk: true})
                break;
            case "addition":
                newValue = parseFloat(this.state.previous) + parseFloat(this.state.current)
                this.setState({current: newValue, first: true, decimalOk: true})
                break;
            case "substract":
                newValue = this.state.previous - this.state.current
                this.setState({current: newValue, first: true, decimalOk: true})
                break;
            case "times":
                newValue = this.state.previous * this.state.current
                this.setState({current: newValue, first: true, decimalOk: true})
                break;
            default: 
                break;
        }
    }

    clear = () => {
        this.setState({current: 0, previous: null, mode: "", first: true, decimalOk: true})
    }

    inputDecimal = (e) => {
        if(this.state.decimalOk) {
            if(this.state.first) {
                const newValue = e.target.value
                this.setState({current: newValue, decimalOk: false, first: false})
            } else {
                const newValue = this.state.current + e.target.value
                this.setState({current: newValue, decimalOk: false, first: false})
            }
        }
    }

    inputNumber = (e) => {
        if(this.state.first) {
            this.setState({current: e.target.value, first: false})
        } else {
            this.setState({current: this.state.current + e.target.value})
        }
    }

    render () {
        return (
            <div className="calculator"> 
                <output id="calc" value={this.state.current}>
                    {this.state.current}
                </output>
                <div className="inputs">
                            <button className="symbol"          onClick={this.clear}>C</button>
                            <button className="symbol"          onClick={this.absolute}>±</button>
                            <button className="symbol"          onClick={this.percent}>%</button>
                            <button className="operator"        onClick={this.divide}>/</button>
                            <button className="number"          onClick={this.inputNumber} value={7}>7</button>
                            <button className="number"          onClick={this.inputNumber} value={8}>8</button>
                            <button className="number"          onClick={this.inputNumber} value={9}>9</button>
                            <button className="operator"        onClick={this.times}>x</button>
                            <button className="number"          onClick={this.inputNumber} value={4}>4</button>
                            <button className="number"          onClick={this.inputNumber} value={5}>5</button>
                            <button className="number"          onClick={this.inputNumber} value={6}>6</button>
                            <button className="operator"        onClick={this.substract}>-</button>
                            <button className="number"          onClick={this.inputNumber} value={1}>1</button>
                            <button className="number"          onClick={this.inputNumber} value={2}>2</button>
                            <button className="number"          onClick={this.inputNumber} value={3}>3</button>
                            <button className="operator"        onClick={this.addition}>+</button>
                            <button className="button-0 number" onClick={this.inputNumber} value={0}>0</button>
                            <button className="number"          onClick={this.inputDecimal} value=".">.</button>
                            <button className="operator"        onClick={this.equal}>=</button>
                </div>
            </div>
        )
    }
}

export default Calculator