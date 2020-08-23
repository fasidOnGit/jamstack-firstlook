import React, {useReducer} from 'react';
import styles from './form.module.css';

const INITIAL_STATE  = {
    name: '',
    email: '',
    subject: '',
    body: '',
    status: 'IDLE'
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'updateFieldValue':
            return {...state, [action.field]: action.value};
        case 'updateStatus':
            return {...state, status: action.status};
        case 'reset':
        default:
            return INITIAL_STATE;
    }
}

const Form = () => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    const handleSubmit = event => {
        event.preventDefault();
        setStatus('PENDING');

        // TODO actually send message.
        console.log({...state});
        setTimeout(() => {
            setStatus('SUCCESS');
        }, 1000);
    };

    const setStatus = status => dispatch({ type: 'updateStatus', status});

    if (state.status === 'SUCCESS') {
        return (
            <p className={styles.success}>
                Message sent!.
                <button type="reset"
                    className={`${styles.button} ${styles.centered}`} 
                    onClick={() => dispatch({type: 'reset'})}>Reset</button>
            </p>
        )
    }

    const updateFieldValue = field => event => {
        dispatch({
            type: 'updateFieldValue',
            field,
            value: event.target.value
        });
    }

    return (
        <>
            {state.status === 'ERROR' && (
                <p className={styles.error}>Something went wrong. Please try again.</p>
            )}
            <form className={`${styles.form} ${state.status === 'PENDING' && styles.pending}`} onSubmit={handleSubmit}>
                <label className={styles.label}>
                    Name
                    <input type="text" 
                        name="name" 
                        className={styles.input} 
                        onChange={updateFieldValue('name')}
                        value={state.name}/>
                </label>
                <label className={styles.label}>
                    Email
                    <input type="email" 
                        name="email" 
                        onChange={updateFieldValue('email')}
                        value={state.email}
                        className={styles.input} />
                </label>
                <label className={styles.label}>
                    Subject
                    <input type="text" 
                    name="subject" 
                    onChange={updateFieldValue('subject')}
                    value={state.subject}
                    className={styles.input} />
                </label>
                <label className={styles.label}>
                    Body
                    <textarea name="subject"
                        onChange={updateFieldValue('body')}
                        value={state.body}
                    className={styles.input} />
                </label>
                <button className={styles.button}>Send</button>
            </form>
        </>
    )
}
export default Form;