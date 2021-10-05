import Mock from 'mockjs';
import axios from 'axios';

Mock.setup({
    timeout: '1000'
})

Mock.mock('/event/', 'get', {
    success: true,
    data: {
        id: '1',
        title: 'title',
        description: 'example desc',
        organizer_name: 'name1',
        organizer_id: '1',
        date: '2021-12-06',
        start_time: '00:14',
        event_length: '2',
        tags: ['test1', 'test2'],
        status: 'banned',
        participant_names: ['name1', 'name2'],
        participant_ids: [1,2]
    }
})

Mock.mock('/event/', 'post', {
    success: true
})

Mock.mock('/organizers/', 'get', {
    success: true,
    "data|10": [
        {
            "id|+1": 1,
            "name": '@tld'
        },
    ],
})

Mock.mock('/participants/', 'get', {
    success: true,
    "data|10": [
        {
            "id|+1": 1,
            "name": '@name'
        },
    ],
})

const mockEventDetail = (id) => axios.get(`/event/`);
const mockSubmitEventDetail = (id, data) => axios.post(`/event/`)
const mockSearchOrganizers = (name) => axios.get(`/organizer/`)
const mockSearchParticipants = (name) => axios.get(`/participants/`)

export {
    mockEventDetail,
    mockSubmitEventDetail,
    mockSearchOrganizers,
    mockSearchParticipants
}
