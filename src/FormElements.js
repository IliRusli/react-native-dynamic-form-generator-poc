"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var formik_1 = require("formik");
var react_native_1 = require("react-native");
var react_native_check_box_1 = __importDefault(require("react-native-check-box"));
var react_native_dropdown_picker_1 = __importDefault(require("react-native-dropdown-picker"));
function Form(props) {
    return (react_1.default.createElement(react_native_1.View, null,
        react_1.default.createElement(formik_1.Formik, __assign({}, props), props.children)));
}
exports.Form = Form;
function Header(props) {
    var additionalProps = props.additionalProps;
    return (react_1.default.createElement(react_native_1.View, null,
        react_1.default.createElement(react_native_1.View, { style: styles.headerContainer },
            react_1.default.createElement(react_native_1.Text, { style: styles.headerText }, additionalProps.label))));
}
exports.Header = Header;
function Checkbox(props) {
    var additionalProps = props.additionalProps, setFieldValue = props.setFieldValue, values = props.values, touched = props.touched, errors = props.errors, rest = __rest(props, ["additionalProps", "setFieldValue", "values", "touched", "errors"]);
    var _a = react_1.useState(values.isChecked), bool = _a[0], setBool = _a[1];
    var key = additionalProps.name;
    var handleClick = function (bool) {
        setFieldValue(additionalProps.name, !bool);
        setBool(!bool);
    };
    return (react_1.default.createElement(react_native_1.View, { style: styles.itemContainer },
        react_1.default.createElement(react_native_1.View, { style: styles.titleContainer },
            react_1.default.createElement(react_native_1.View, { style: styles.textContainer },
                react_1.default.createElement(react_native_1.Text, { style: styles.title }, additionalProps.label)),
            react_1.default.createElement(react_native_1.View, { style: styles.checkboxContainer },
                react_1.default.createElement(react_native_check_box_1.default, { disabled: false, isChecked: bool, onClick: function () { return handleClick(bool); } }))),
        touched[key] && errors[key] &&
            react_1.default.createElement(react_native_1.Text, { style: { fontSize: 12, color: '#FF0D10' } }, errors[key])));
}
exports.Checkbox = Checkbox;
function ValuePicker(props) {
    var additionalProps = props.additionalProps, setFieldValue = props.setFieldValue, values = props.values;
    console.log({ props: props });
    var key = additionalProps.name;
    return (react_1.default.createElement(react_native_1.View, { style: styles.itemContainer },
        additionalProps.label && react_1.default.createElement(react_native_1.Text, { style: styles.title }, additionalProps.label),
        react_1.default.createElement(react_native_1.TouchableOpacity, null,
            react_1.default.createElement(react_native_1.View, { style: styles.viewContainer },
                react_1.default.createElement(react_native_dropdown_picker_1.default, { items: additionalProps.options, defaultValue: values[key], containerStyle: { height: 40 }, style: { backgroundColor: '#fafafa' }, itemStyle: {
                        justifyContent: 'flex-start'
                    }, dropDownStyle: { backgroundColor: '#fafafa' }, onChangeItem: function (item) { return setFieldValue(key, item.value); } })))));
}
exports.ValuePicker = ValuePicker;
function TextField(props) {
    var additionalProps = props.additionalProps, handleChange = props.handleChange, touched = props.touched, errors = props.errors, rest = __rest(props, ["additionalProps", "handleChange", "touched", "errors"]);
    var key = additionalProps.name;
    return (react_1.default.createElement(react_native_1.View, { style: styles.itemContainer },
        additionalProps.label && react_1.default.createElement(react_native_1.Text, { style: styles.title }, additionalProps.label),
        react_1.default.createElement(react_native_1.TextInput, __assign({ numberOfLines: 1, underlineColorAndroid: "transparent", editable: props.editable, value: props.value, placeholder: props.placeholder, onChangeText: handleChange, onBlur: props.onBlur, keyboardType: props.keyboardType, secureTextEntry: props.secureTextEntry, autoCapitalize: props.autoCapitalize, placeholderTextColor: "#8E8E8E", style: styles.input, onSubmitEditing: props.onSubmitEditing }, rest)),
        touched[key] && errors[key] &&
            react_1.default.createElement(react_native_1.Text, { style: { fontSize: 12, color: '#FF0D10' } }, errors[key])));
}
exports.TextField = TextField;
function SubmitButton(props) {
    var title = props.title, onSubmitEditing = props.onSubmitEditing, onSubmit = props.onSubmit, rest = __rest(props, ["title", "onSubmitEditing", "onSubmit"]);
    return (react_1.default.createElement(react_native_1.View, { style: styles.submitButtonContainer },
        react_1.default.createElement(react_native_1.TouchableOpacity, { style: styles.button, onPress: function () { return onSubmit(); }, disabled: false },
            react_1.default.createElement(react_native_1.Text, { style: styles.buttonText },
                " ",
                title))));
}
exports.SubmitButton = SubmitButton;
var styles = react_native_1.StyleSheet.create({
    title: {
        fontSize: 16,
        color: '#333333',
    },
    input: {
        color: '#333333',
        marginBottom: 5
    },
    itemContainer: {
        width: '100%',
        margin: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    },
    titleContainer: {
        flexDirection: 'row',
        marginRight: 16,
        marginTop: 12,
        marginBottom: 10,
    },
    checkboxContainer: {
        marginLeft: 'auto',
    },
    textContainer: {},
    viewContainer: {
        width: '85%',
        marginTop: 17,
        marginBottom: 13,
        marginLeft: 16,
        marginRight: 16,
    },
    headerContainer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    headerText: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0072CE',
        margin: 15
    },
    submitButtonContainer: {
        marginTop: 16,
        marginBottom: 16,
        marginLeft: 16,
        marginRight: 16,
    },
    button: {
        height: 48,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        elevation: 5,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: '500',
        color: "#FFF",
    },
});
