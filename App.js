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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var FormElements_1 = require("./src/FormElements");
var Yup = __importStar(require("yup"));
var formik_1 = require("formik");
function App() {
    var formSchema = {
        sectionOne: {
            type: "header",
            label: "Section 1",
        },
        name: {
            type: "text",
            label: "Name",
            required: true,
            defaultValue: null
        },
        email: {
            type: "email",
            label: "Email",
            required: true,
            defaultValue: null
        },
        age: {
            type: "number",
            label: "Age",
            required: true,
            defaultValue: null
        },
        role: {
            type: "select",
            label: "Role",
            required: true,
            defaultValue: "admin",
            options: [
                {
                    label: "Admin",
                    value: "admin"
                },
                {
                    label: "User",
                    value: "user"
                }
            ]
        },
        agreement: {
            type: "boolean",
            label: "I agree",
            required: true,
            disabled: false,
            defaultValue: false
        },
    };
    var _a = react_1.useState({}), formData = _a[0], setFormData = _a[1];
    var _b = react_1.useState({}), validationSchema = _b[0], setValidationSchema = _b[1];
    react_1.useEffect(function () {
        initForm(formSchema);
    }, []);
    var initForm = function (formSchema) {
        var _formData = {};
        var _validationSchema = {};
        for (var _i = 0, _a = Object.keys(formSchema); _i < _a.length; _i++) {
            var key = _a[_i];
            if (formSchema[key].type !== "header") {
                _formData[key] = formSchema[key].defaultValue;
            }
            if (formSchema[key].type === "text") {
                _validationSchema[key] = Yup.string();
            }
            else if (formSchema[key].type === "email") {
                _validationSchema[key] = Yup.string().email();
            }
            else if (formSchema[key].type === "select") {
                _validationSchema[key] = Yup.string().oneOf(formSchema[key].options.map(function (o) { return o.value; }));
            }
            else if (formSchema[key].type === "boolean") {
                _validationSchema[key] = Yup.boolean();
            }
            else if (formSchema[key].type === "number") {
                _validationSchema[key] = Yup.number().moreThan(0);
            }
            if (formSchema[key].required) {
                _validationSchema[key] = _validationSchema[key].required('Required');
            }
        }
        setFormData(_formData);
        setValidationSchema(Yup.object().shape(__assign({}, _validationSchema)));
    };
    var getFormElement = function (elementName, elementSchema, props) {
        var additionalProps = {
            name: elementName,
            label: elementSchema.label,
            options: elementSchema.options
        };
        props = __assign({}, props, { additionalProps: additionalProps });
        if (elementSchema.type === "header") {
            return react_1.default.createElement(FormElements_1.Header, __assign({}, props));
        }
        if (elementSchema.type === "text" || elementSchema.type === "email" || elementSchema.type === "number") {
            return react_1.default.createElement(FormElements_1.TextField, __assign({}, props, { handleChange: props.handleChange(elementName) }));
        }
        if (elementSchema.type === "boolean") {
            return react_1.default.createElement(FormElements_1.Checkbox, __assign({}, props, { callback: props.handleChange(elementName) }));
        }
        if (elementSchema.type === "select") {
            return react_1.default.createElement(FormElements_1.ValuePicker, __assign({}, props));
        }
    };
    var onSubmit = function (values, _a) {
        var setSubmitting = _a.setSubmitting, resetForm = _a.resetForm, setStatus = _a.setStatus;
        console.log({ values: values });
        setSubmitting(false);
    };
    return (react_1.default.createElement(react_native_1.View, { style: styles.container },
        react_1.default.createElement(formik_1.Formik, { enableReinitialize: true, initialValues: formData, validationSchema: validationSchema, onSubmit: onSubmit }, function (props) {
            var handleSubmit = props.handleSubmit;
            return (react_1.default.createElement(react_native_1.View, null,
                Object.keys(formSchema).map(function (key, ind) { return (react_1.default.createElement(react_native_1.View, { key: key }, getFormElement(key, formSchema[key], props))); }),
                react_1.default.createElement(FormElements_1.SubmitButton, { onSubmit: function () { return handleSubmit(); }, title: "Submit" })));
        })));
}
exports.default = App;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    },
});
