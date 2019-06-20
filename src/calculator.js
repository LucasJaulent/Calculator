import React, { Component } from 'react'
import './calculator.css'

class Calculator extends Component {
    state = {
        current: 0,
        previous: null,
        mode: "",
        first: true,
        decimalOk: true,
        round: 4,
    }

    addition = () => {
        this.setState({mode: "addition"})
        const newValue = this.getNewValue()
        this.calcul(newValue, "addition")
    }

    substract = () => {
        const newValue = this.setState({mode: "substract"})
        this.getNewValue()
        this.calcul(newValue, "substract")
    }

    times = () => {
        this.setState({mode: "times"})
        const newValue = this.state.previous * this.state.current
        this.calcul(newValue, "times")
    }

    divide = () => {
        this.setState({mode: "divide"})
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

    calcul = (newValue) => {
        if(this.state.previous != null) {
            this.setState({current: newValue, first: true, previous: newValue, decimalOk: true})
        } else {
            this.setState({previous: this.state.current, first: true, decimalOk: true})
        }
    }

    equal = () => {
        const newValue = this.getNewValue()
        this.setState({current: newValue, first: true, decimalOk: true})
    }

    getNewValue = () => {
        var newValue
        switch(this.state.mode) {
            case "divide":
                newValue = this.state.previous / this.state.current
                return newValue;
            case "addition":
                newValue = this.round(parseFloat(this.state.previous) + parseFloat(this.state.current).toFixed(this.state.round))
                return newValue;
            case "substract":
                newValue = this.state.previous - this.state.current
                return newValue;
            case "times":
                newValue = this.state.previous * this.state.current
                return newValue;
            default: 
                break;
        }
    }

    clear = () => {
        this.setState({current: 0, previous: null, mode: "", first: true, decimalOk: true})
    }

    round = (number) => {
        console.log(number.toString().length)
        for(let i = number.toString().length+5; i > 0; i--){
            if(number.toString()[i] === "0" || number.toString()[i] === ".") {
                number.toString().substring(0, i)
            } else {
                break;
            }
        }
        return number;
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