import axios from 'axios'

const api = axios.create({ baseURL: ' http://127.0.0.1:8000/users/api/' })
const adminapi = axios.create({ baseURL: 'http://127.0.0.1:8000/admin/api/' })
const doctorapi = axios.create({ baseURL: 'http://127.0.0.1:8000/doctors/api/' })
export { api, adminapi, doctorapi }