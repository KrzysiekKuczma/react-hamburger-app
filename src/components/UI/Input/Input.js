import React from 'react'

import styles from './Input.css';

const input = (props) => {
    let inputElement = null;
    const inputStyles = [styles.InputElement];
    if (props.invalid && props.shouldValidate && props.touched) {
        inputStyles.push(styles.Invalid)
    }

    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p className={styles.ErrorMessage}>Please give correct {props.elementConfig.placeholder}</p>
    }
    switch (props.elementType) {
        case ( 'input' ):
        inputElement = <input 
                className={inputStyles.join(' ')} 
                {...props.elementConfig}  
                value={props.value}
                onChange={props.changed}
            />;
            break;

        case ( 'textarea' ):
            inputElement = <textarea 
                className={inputStyles.join(' ')} 
                {...props.elementConfig}  
                value={props.value}
                onChange={props.changed}
            />
            break;

        case ( 'select' ):
            inputElement = (
            <select
                className={inputStyles.join(' ')} 
                {...props.elementConfig}  
                value={props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.displayValue}</option>
                ))}
                
            </select>);
            break;

        default: 
            inputElement = <input 
                className={inputStyles.join(' ')}
                {...props.elementConfig} 
                 value={props.value}
                 onChange={props.changed}
            />
    }
    return (
        <div className={styles.Input}>
            <label className={styles.Label}></label>
            {inputElement}
            {validationError}
        </div>
    );
}

export default input;
