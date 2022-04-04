import React, { useState } from 'react';

const CreateLocation = () => {
    const initialForm = {
        name: '',
        lat: 0,
        lng: 0,
        rating: 0,
    };

    const handleChange = (event: any) => {
        const { name, value } = event;

        setForm({ ...form, [name]: value });
    };

    const [form, setForm] = useState(initialForm);
    return (
        <form>
            <input
                id="name"
                type="text"
                placeholder="Name of Location"
                value={form.name}
                onChange={handleChange}
                required
            />
            <input
                id="lat"
                type="text"
                placeholder="latitude"
                value={form.lat}
                onChange={handleChange}
                required
            />
            <input
                id="lng"
                type="text"
                placeholder="longitude"
                value={form.lng}
                onChange={handleChange}
                required
            />
        </form>
    );
};
