import {useEffect, useState} from 'react';
import { mockEventDetail, mockSubmitEventDetail } from '../mock/mockEvent';
import FormValidator from '../utils/formValidator'
export const useEventForm = (id) => {
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        description: '',
        event_length: '',

        tags: [],

        organizer_name: '',
        organizer_id: '',

        participant_names: [],
        participant_ids: [],

        status: '',

        date: '',
        start_time: '',
    });
    const [data, setData] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);

    useEffect(() => {
        async function f() {
            if (!!loading) return false;
            if (!id) return false;
            setLoading(true);
            await loadEvent();
            setLoading(false);
        }

        f().then();
    }, [id]);

    const loadEvent = async () => {
        try {
            const { data: { success, data } } = await mockEventDetail(id);
            console.log(data);
            setData(data);
            setFormData(data);
        } catch (err) {
            setError(err.message)
        }
    };

    const submitEvent = async () => {
        // const validator = new FormValidator(formData)
        // if (!validator.passed) {
        //     setError(validator.errorMessage);
        //     return false;
        // }

        try {
            setSubmitLoading(true);
            await mockSubmitEventDetail(id, formData);
            await loadEvent(id);
            setSubmitLoading(false);

            alert('submit success')
        } catch (err) {
            setError(err.message)
        }
    };

    const loadChange = ({ target: { name, value } }) => {
        setFormData({...formData, [name]: value})
    }

    return {
        formData,
        loading,
        submitLoading,
        data,
        error,
        loadEvent,
        submitEvent,
        loadChange
    };
};
