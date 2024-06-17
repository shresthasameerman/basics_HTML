(function() {
    "use strict";
    const isOperator = /[x/+-]/
      , endsWithOperator = /[x+-/]$/
      , endsWithNegativeSign = /\d[x/+-]{1}-$/
      , clearStyle = {
        background: "#ac3939"
    }
      , operatorStyle = {
        background: "#666666"
    }
      , equalsStyle = {
        background: "#004466",
        position: "absolute",
        height: 130,
        bottom: 5
    };
    class Calculator extends React.Component {
        constructor(e) {
            super(e),
            this.state = {
                currentVal: "0",
                prevVal: "0",
                formula: "",
                currentSign: "pos",
                lastClicked: ""
            },
            this.maxDigitWarning = this.maxDigitWarning.bind(this),
            this.handleOperators = this.handleOperators.bind(this),
            this.handleEvaluate = this.handleEvaluate.bind(this),
            this.initialize = this.initialize.bind(this),
            this.handleDecimal = this.handleDecimal.bind(this),
            this.handleNumbers = this.handleNumbers.bind(this)
        }
        maxDigitWarning() {
            this.setState({
                currentVal: "Digit Limit Met",
                prevVal: this.state.currentVal
            }),
            setTimeout((()=>this.setState({
                currentVal: this.state.prevVal
            })), 1e3)
        }
        handleEvaluate() {
            if (!this.state.currentVal.includes("Limit")) {
                let expression = this.state.formula;
                for (; endsWithOperator.test(expression); )
                    expression = expression.slice(0, -1);
                expression = expression.replace(/x/g, "*").replace(/-/g, "-").replace("--", "-");
                let answer = Math.round(1e12 * eval(expression)) / 1e12;
                this.setState({
                    currentVal: answer.toString(),
                    formula: expression.replace(/\*/g, "⋅").replace(/-/g, "-").replace(/(x|\/|\+)-/, "$1-").replace(/^-/, "-") + "=" + answer,
                    prevVal: answer,
                    evaluated: !0
                })
            }
        }
        handleOperators(e) {
            if (!this.state.currentVal.includes("Limit")) {
                const t = e.target.value
                  , {formula: a, prevVal: r, evaluated: s} = this.state;
                this.setState({
                    currentVal: t,
                    evaluated: !1
                }),
                s ? this.setState({
                    formula: r + t
                }) : endsWithOperator.test(a) ? endsWithNegativeSign.test(a) ? "-" !== t && this.setState({
                    formula: r + t
                }) : this.setState({
                    formula: (endsWithNegativeSign.test(a + t) ? a : r) + t
                }) : this.setState({
                    prevVal: a,
                    formula: a + t
                })
            }
        }
        handleNumbers(e) {
            if (!this.state.currentVal.includes("Limit")) {
                const {currentVal: t, formula: a, evaluated: r} = this.state
                  , s = e.target.value;
                this.setState({
                    evaluated: !1
                }),
                t.length > 21 ? this.maxDigitWarning() : r ? this.setState({
                    currentVal: s,
                    formula: "0" !== s ? s : ""
                }) : this.setState({
                    currentVal: "0" === t || isOperator.test(t) ? s : t + s,
                    formula: "0" === t && "0" === s ? "" === a ? s : a : /([^.0-9]0|^0)$/.test(a) ? a.slice(0, -1) + s : a + s
                })
            }
        }
        handleDecimal() {
            !0 === this.state.evaluated ? this.setState({
                currentVal: "0.",
                formula: "0.",
                evaluated: !1
            }) : this.state.currentVal.includes(".") || this.state.currentVal.includes("Limit") || (this.setState({
                evaluated: !1
            }),
            this.state.currentVal.length > 21 ? this.maxDigitWarning() : endsWithOperator.test(this.state.formula) || "0" === this.state.currentVal && "" === this.state.formula ? this.setState({
                currentVal: "0.",
                formula: this.state.formula + "0."
            }) : this.setState({
                currentVal: this.state.formula.match(/(-?\d+\.?\d*)$/)[0] + ".",
                formula: this.state.formula + "."
            }))
        }
        initialize() {
            this.setState({
                currentVal: "0",
                prevVal: "0",
                formula: "",
                currentSign: "pos",
                lastClicked: "",
                evaluated: !1
            })
        }
        render() {
            return React.createElement("div", null, React.createElement("div", {
                className: "calculator"
            }, React.createElement(Formula, {
                formula: this.state.formula.replace(/x/g, "⋅")
            }), React.createElement(Output, {
                currentValue: this.state.currentVal
            }), React.createElement(Buttons, {
                decimal: this.handleDecimal,
                evaluate: this.handleEvaluate,
                initialize: this.initialize,
                numbers: this.handleNumbers,
                operators: this.handleOperators
            })), React.createElement("div", {
                className: "author"
            }, " ", "Designed and Coded By ", React.createElement("br", null), React.createElement("a", {
                href: "https://www.freecodecamp.org/no-stack-dub-sack",
                target: "_blank",
                rel: "noreferrer"
            }, "Sameer Man Shrestha")))
        }
    }
    class Buttons extends React.Component {
        render() {
            return React.createElement("div", null, React.createElement("button", {
                className: "jumbo",
                id: "clear",
                onClick: this.props.initialize,
                style: clearStyle,
                value: "AC"
            }, "AC"), React.createElement("button", {
                id: "divide",
                onClick: this.props.operators,
                style: operatorStyle,
                value: "/"
            }, "/"), React.createElement("button", {
                id: "multiply",
                onClick: this.props.operators,
                style: operatorStyle,
                value: "x"
            }, "x"), React.createElement("button", {
                id: "seven",
                onClick: this.props.numbers,
                value: "7"
            }, "7"), React.createElement("button", {
                id: "eight",
                onClick: this.props.numbers,
                value: "8"
            }, "8"), React.createElement("button", {
                id: "nine",
                onClick: this.props.numbers,
                value: "9"
            }, "9"), React.createElement("button", {
                id: "subtract",
                onClick: this.props.operators,
                style: operatorStyle,
                value: "-"
            }, "-"), React.createElement("button", {
                id: "four",
                onClick: this.props.numbers,
                value: "4"
            }, "4"), React.createElement("button", {
                id: "five",
                onClick: this.props.numbers,
                value: "5"
            }, "5"), React.createElement("button", {
                id: "six",
                onClick: this.props.numbers,
                value: "6"
            }, "6"), React.createElement("button", {
                id: "add",
                onClick: this.props.operators,
                style: operatorStyle,
                value: "+"
            }, "+"), React.createElement("button", {
                id: "one",
                onClick: this.props.numbers,
                value: "1"
            }, "1"), React.createElement("button", {
                id: "two",
                onClick: this.props.numbers,
                value: "2"
            }, "2"), React.createElement("button", {
                id: "three",
                onClick: this.props.numbers,
                value: "3"
            }, "3"), React.createElement("button", {
                className: "jumbo",
                id: "zero",
                onClick: this.props.numbers,
                value: "0"
            }, "0"), React.createElement("button", {
                id: "decimal",
                onClick: this.props.decimal,
                value: "."
            }, "."), React.createElement("button", {
                id: "equals",
                onClick: this.props.evaluate,
                style: equalsStyle,
                value: "="
            }, "="))
        }
    }
    class Output extends React.Component {
        render() {
            return React.createElement("div", {
                className: "outputScreen",
                id: "display"
            }, this.props.currentValue)
        }
    }
    class Formula extends React.Component {
        render() {
            return React.createElement("div", {
                className: "formulaScreen"
            }, this.props.formula)
        }
    }
    ReactDOM.render(React.createElement(Calculator, null), document.getElementById("app"))
}
)();
