import React, { useState } from 'react';
import {
  Formik,
  Form as FormikForm,
  Field,
  ErrorMessage,
  useFormikContext,
  useField,
  useFormik,
} from 'formik';
import { Text, TouchableOpacity, View, TextInput, StyleSheet } from 'react-native';
import CheckBox from 'react-native-check-box';
import DropDownPicker from 'react-native-dropdown-picker';

export function Form(props) {
  return (
    <View>
      <Formik {...props}>
        {props.children}
      </Formik>
    </View>
  );
}

export function Header(props) {
  const { additionalProps } = props;
  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{additionalProps.label}</Text>
      </View>
    </View>
  );
}

export function Checkbox(props) {
  const { additionalProps, setFieldValue, values, touched, errors, ...rest } = props;
  const [bool, setBool] = useState(values.isChecked)
  const key = additionalProps.name
  const handleClick = (bool: boolean) => {
    setFieldValue(additionalProps.name, !bool)
    setBool(!bool)
  }
  return (
    <View style={styles.itemContainer}>
      <View style={styles.titleContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {additionalProps.label}
          </Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            disabled={false}
            isChecked={bool}
            onClick={() => handleClick(bool)}
          />
        </View>
      </View>
      {touched[key] && errors[key] &&
        <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors[key]}</Text>
      }
    </View>
  );
}

export function ValuePicker(props) {
  const { additionalProps, setFieldValue, values } = props;
  console.log({ props })
  const key = additionalProps.name
  return (
    <View style={styles.itemContainer}>
      {additionalProps.label && <Text style={styles.title}>{additionalProps.label}</Text>}
      <TouchableOpacity
      >
        <View style={styles.viewContainer}>
          <DropDownPicker
            items={additionalProps.options}
            defaultValue={values[key]}
            containerStyle={{ height: 40 }}
            style={{ backgroundColor: '#fafafa' }}
            itemStyle={{
              justifyContent: 'flex-start'
            }}
            dropDownStyle={{ backgroundColor: '#fafafa' }}
            onChangeItem={item => setFieldValue(key, item.value)}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export function TextField(props) {
  const { additionalProps, handleChange, touched, errors, ...rest } = props;
  const key = additionalProps.name
  return (
    <View style={styles.itemContainer}>
      {additionalProps.label && <Text style={styles.title}>{additionalProps.label}</Text>}
      <TextInput
        numberOfLines={1}
        underlineColorAndroid="transparent"
        editable={props.editable}
        value={props.value}
        placeholder={props.placeholder}
        onChangeText={handleChange}
        onBlur={props.onBlur}
        keyboardType={props.keyboardType}
        secureTextEntry={props.secureTextEntry}
        autoCapitalize={props.autoCapitalize}
        placeholderTextColor="#8E8E8E"
        style={styles.input}
        onSubmitEditing={props.onSubmitEditing}

        {...rest}
      />
      {touched[key] && errors[key] &&
        <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors[key]}</Text>
      }
    </View>
  );
}

export function SubmitButton(props) {
  const { title, onSubmitEditing, onSubmit, ...rest } = props;
  return (
    <View style={styles.submitButtonContainer}>
      <TouchableOpacity
        style={styles.button} onPress={() => onSubmit()} disabled={false}>
        <Text style={styles.buttonText}> {title}</Text>
      </TouchableOpacity> 
      </View>
  );
}

const styles = StyleSheet.create({
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
  textContainer: {
  },
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
