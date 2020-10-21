import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Form, TextField, SubmitButton, Checkbox, ValuePicker, Header } from './src/FormElements';
import * as Yup from 'yup';
import { Formik } from 'formik';

export default function App() {
  const formSchema = {
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
  }

  const [formData, setFormData] = useState({});
  const [validationSchema, setValidationSchema] = useState({});

  useEffect(() => {
    initForm(formSchema);
  }, []);

  const initForm = (formSchema: any) => {
    let _formData: object = {};
    let _validationSchema: object = {};

    for (var key of Object.keys(formSchema)) {
      if (formSchema[key].type !== "header") {
        _formData[key] = formSchema[key].defaultValue;
      }

      if (formSchema[key].type === "text") {
        _validationSchema[key] = Yup.string();
      } else if (formSchema[key].type === "email") {
        _validationSchema[key] = Yup.string().email()
      } else if (formSchema[key].type === "select") {
        _validationSchema[key] = Yup.string().oneOf(formSchema[key].options.map(o => o.value));
      } else if (formSchema[key].type === "boolean") {
        _validationSchema[key] = Yup.boolean();
      } else if (formSchema[key].type === "number") {
        _validationSchema[key] = Yup.number().moreThan(0);
      }

      if (formSchema[key].required) {
        _validationSchema[key] = _validationSchema[key].required('Required');
      }
    }

    setFormData(_formData);
    setValidationSchema(Yup.object().shape({ ..._validationSchema }));
  }

  const getFormElement = (elementName, elementSchema, props) => {
    const additionalProps = {
      name: elementName,
      label: elementSchema.label,
      options: elementSchema.options
    }

    props = {
      ...props,
      additionalProps
    };

    if (elementSchema.type === "header") {
      return <Header {...props} />
    }

    if (elementSchema.type === "text" || elementSchema.type === "email" || elementSchema.type === "number") {
      return <TextField {...props} handleChange={props.handleChange(elementName)} />
    }

    if (elementSchema.type === "boolean") {
      return <Checkbox {...props} callback={props.handleChange(elementName)} />
    }

    if (elementSchema.type === "select") {
      return <ValuePicker  {...props} />
    }

  }

  const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
    console.log({ values });
    setSubmitting(false);
  }

  return (
    <View style={styles.container}>
      <Formik
        enableReinitialize
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(props: any) => {
          const { handleSubmit } = props;
          return (
            <View>
              {Object.keys(formSchema).map((key: string, ind) => (
                <View key={key}>
                  {getFormElement(key, formSchema[key], props)}
                </View>
              ))}
              <SubmitButton onSubmit={() => handleSubmit()} title={"Submit"} />
            </View>
          )
        }}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
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