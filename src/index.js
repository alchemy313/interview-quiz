import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { useEventForm } from './hooks/useEvent';
import { TagInput } from './components/tagInput';
import { SearchInput } from './components/searchInput';
import { mockSearchOrganizers, mockSearchParticipants } from './mock/mockEvent';

import './index.css';

const EventEditCon  = (props) => {
    //let me pretend this is a detail page and I got the eventId from somewhere
    const eventId = 1;

    const {formData, loading, data, error, submitEvent, loadChange} = useEventForm(eventId);

    const {
        title,
        description,
        event_length,
        tags,
        organizer_name,
        organizer_id,
        participant_names,
        participant_ids,
        status,
        date,
        start_time
    } = formData;

    const participantsArr = participant_ids.map((id, index) => ({ name: participant_names[index], id }))

    return (
        <div>
            <h2>Event Edit Page</h2>
            <div>
                <div className='column'>
                    <label>title</label>
                    <input
                        type='text'
                        name='title'
                        defaultValue={title}
                        onChange={loadChange}
                    />
                </div>

                <div className='column'>
                   <label>description</label>
                   <input
                       type='text'
                       name='description'
                       defaultValue={description}
                       onChange={loadChange}
                   />
               </div>

                <div className='column'>
                    <label>event_length</label>
                    <input
                        type='number'
                        name='event_length'
                        defaultValue={event_length}
                        onChange={loadChange}
                    />
                </div>

                <div className='column'>
                    <label>status</label>
                    <select name='status' defaultValue={status} onChange={loadChange}>
                        <option value="active">active</option>
                        <option value="de_active">de_active</option>
                        <option value="banned">banned</option>
                    </select>
                </div>

                <div className='column'>
                    <label>start time</label>
                    <input
                        type="date"
                        name="date"
                        defaultValue={date}
                        onChange={loadChange}
                    />
                </div>

                <div className='column'>
                    <label>start time</label>
                    <input
                        type="time"
                        name="start_time"
                        min="0:00"
                        max="24:00"
                        defaultValue={start_time}
                        onChange={loadChange}
                    />
                </div>

                <div className='column'>
                    <TagInput
                        name='tags'
                        defaultValue={tags}
                        onChange={loadChange}
                    />
                </div>

                <div className='column'>
                    <SearchInput
                        multiple={false}
                        name='organizer_name'
                        id='organizer_id'
                        placeholder='input organizer name'
                        defaultValue={{ name: organizer_name, id: organizer_id }}
                        onChange={loadChange}
                        searchApi={mockSearchOrganizers}
                    />
                </div>

                <div className='column'>
                    <SearchInput
                        multiple={true}
                        name='participant_names'
                        id='participant_ids'
                        placeholder='input participant name'
                        defaultValue={participantsArr}
                        onChange={loadChange}
                        searchApi={mockSearchParticipants}
                    />
                </div>

            </div>

            <button onClick={submitEvent}>submit</button>
        </div>
    )
}

ReactDOM.render(<EventEditCon />, document.querySelector("#app"))
