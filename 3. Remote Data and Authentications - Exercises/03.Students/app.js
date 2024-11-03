const baseUrl = 'http://localhost:3030/jsonstore/collections/students';

const tableBody = document.querySelector('#results tbody');
const formRef = document.querySelector('#form');

formRef.addEventListener('submit', createStudent);

async function getAllStudents() {
    tableBody.replaceChildren();

    try {
        const response = await fetch(baseUrl);
        const result = await response.json();

        Object.values(result).forEach(student => {
            const newStudent = renderStudent(student);
            tableBody.appendChild(newStudent);
        });
    } catch (error) {
        alert(error.message);
    }
}

async function createStudent(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const { firstName, lastName, facultyNumber, grade } = Object.fromEntries(formData);

    if (!firstName || !lastName || !facultyNumber || !grade) {
        return
    }

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, facultyNumber, grade })
    }

    try {
        await fetch(baseUrl, options);
        getAllStudents();
    } catch (error) {
        alert(error.message);
    }

}

function renderStudent(student) {
    const trEl = document.createElement('tr');
    const tdFirstName = document.createElement('td');
    tdFirstName.textContent = student.firstName;
    const tdLastName = document.createElement('td');
    tdLastName.textContent = student.lastName;
    const tdFacultyNumber = document.createElement('td');
    tdFacultyNumber.textContent = student.facultyNumber;
    const tdGrade = document.createElement('td');
    tdGrade.textContent = student.grade;

    trEl.append(tdFirstName, tdLastName, tdFacultyNumber, tdGrade);

    return trEl;
}

getAllStudents();