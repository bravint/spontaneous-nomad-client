import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Profile } from './Profile';
import { User } from './User';

import { HTTP_METHOD, LOCAL_PATH, LOCAL_STORAGE, SERVER_URL, STORE_ACTIONS } from '../utils/config';
import { StoreContext } from '../utils/store';

import '../styles/auth.css';

export const Register = () => {
    const { dispatch } = useContext(StoreContext);

    const navigate = useNavigate();

    const handleDispatch = (type: string, payload: any) => {
        dispatch({
            type: type,
            payload: payload,
        });
    };

    const initialForm = {
        email: '',
        password: '',
        passwordCheck: '',
        username: '',
        profileImage: '',
    };

    const [form, setForm] = useState(initialForm);
    const [step, setStep] = useState(1);

    const previousStep = () => setStep(step - 1);

    const nextStep = () => setStep(step + 1);

    const handleChange = (event: any) => {
        const { name, value } = event.target;

        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const response = await fetch(SERVER_URL.AUTH_REGISTER, {
            method: HTTP_METHOD.POST,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });

        const result = await response.json();

        localStorage.setItem(LOCAL_STORAGE.JWT, result.token);

        handleDispatch(STORE_ACTIONS.USER, result.data);

        navigate(LOCAL_PATH.DASHBOARD);
    };

    switch (step) {
        case 1:
            return (
                <User
                    form={form}
                    handleChange={handleChange}
                    nextStep={nextStep}
                />
            );
        case 2:
            return (
                <Profile
                    form={form}
                    handleChange={handleChange}
                    previousStep={previousStep}
                    handleSubmit={handleSubmit}
                />
            );
    }

    return <></>;
};
