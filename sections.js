class Hospital {
    constructor(name) {
        this.name = name;
        this.sections = [];
    }
}

class Section {
    constructor(name, hospital) {
        this.name = name;
        this.hospital = hospital;
        this.nurses = [];
        this.doctors = [];
        this.patients = [];
    }
}

class Nurse {
    constructor(name, section) {
        this.name = name;
        this.section = section;
    }
}

class Doctor {
    constructor(name, section) {
        this.name = name;
        this.section = section;
    }
}

class Patient {
    constructor(name, section) {
        this.name = name;
        this.section = section;
    }
}

let hospitals = JSON.parse(localStorage.getItem('hospitals')) || [];

function saveData() {
    localStorage.setItem('hospitals', JSON.stringify(hospitals));
}

function addHospital() {
    let name = document.getElementById('hospital-name').value;
    let hospital = new Hospital(name);
    hospitals.push(hospital);
    updateHospitalTable();
    updateHospitalSelect();
    saveData();
}

function addSection() {
    let name = document.getElementById('section-name').value;
    let hospitalName = document.getElementById('hospital-select').value;
    let hospital = hospitals.find(hosp => hosp.name === hospitalName);
    if (hospital) {
        let section = new Section(name, hospital);
        hospital.sections.push(section);
        updateSectionTable();
        updateSectionSelect();
        saveData();
    } else {
        alert("Please select a valid hospital.");
    }
}

function addNurse() {
    let name = document.getElementById('nurse-name').value;
    let sectionName = document.getElementById('section-select-nurse').value;
    let section = findSectionByName(sectionName);
    if (section) {
        let nurse = new Nurse(name, section);
        section.nurses.push(nurse);
        updateNurseTable();
        saveData();
    } else {
        alert("Please select a valid section.");
    }
}

function addDoctor() {
    let name = document.getElementById('doctor-name').value;
    let sectionName = document.getElementById('section-select-doctor').value;
    let section = findSectionByName(sectionName);
    if (section) {
        let doctor = new Doctor(name, section);
        section.doctors.push(doctor);
        updateDoctorTable();
        saveData();
    } else {
        alert("Please select a valid section.");
    }
}

function addPatient() {
    let name = document.getElementById('patient-name').value;
    let sectionName = document.getElementById('section-select-patient').value;
    let section = findSectionByName(sectionName);
    if (section) {
        let patient = new Patient(name, section);
        section.patients.push(patient);
        updatePatientTable();
        saveData();
    } else {
        alert("Please select a valid section.");
    }
}

function findSectionByName(name) {
    for (let hospital of hospitals) {
        for (let section of hospital.sections) {
            if (section.name === name) {
                return section;
            }
        }
    }
    return null;
}

function updateHospitalTable() {
    let table = document.getElementById('hospital-table');
    table.innerHTML = '<tr><th>Hospital Name</th></tr>';
    hospitals.forEach(hospital => {
        let row = table.insertRow();
        let cell = row.insertCell(0);
        cell.innerHTML = hospital.name;
    });
}

function updateSectionTable() {
    let table = document.getElementById('section-table');
    table.innerHTML = '<tr><th>Section Name</th><th>Hospital</th></tr>';
    hospitals.forEach(hospital => {
        hospital.sections.forEach(section => {
            let row = table.insertRow();
            let nameCell = row.insertCell(0);
            let hospitalCell = row.insertCell(1);
            nameCell.innerHTML = section.name;
            hospitalCell.innerHTML = hospital.name;
        });
    });
    updateSectionSelect();
}

function updateNurseTable() {
    let table = document.getElementById('nurse-table');
    table.innerHTML = '<tr><th>Nurse Name</th><th>Section</th></tr>';
    hospitals.forEach(hospital => {
        hospital.sections.forEach(section => {
            section.nurses.forEach(nurse => {
                let row = table.insertRow();
                let nameCell = row.insertCell(0);
                let sectionCell = row.insertCell(1);
                nameCell.innerHTML = nurse.name;
                sectionCell.innerHTML = section.name;
            });
        });
    });
}

function updateDoctorTable() {
    let table = document.getElementById('doctor-table');
    table.innerHTML = '<tr><th>Doctor Name</th><th>Section</th></tr>';
    hospitals.forEach(hospital => {
        hospital.sections.forEach(section => {
            section.doctors.forEach(doctor => {
                let row = table.insertRow();
                let nameCell = row.insertCell(0);
                let sectionCell = row.insertCell(1);
                nameCell.innerHTML = doctor.name;
                sectionCell.innerHTML = section.name;
            });
        });
    });
}

function updatePatientTable() {
    let table = document.getElementById('patient-table');
    table.innerHTML = '<tr><th>Patient Name</th><th>Section</th></tr>';
    hospitals.forEach(hospital => {
        hospital.sections.forEach(section => {
            section.patients.forEach(patient => {
                let row = table.insertRow();
                let nameCell = row.insertCell(0);
                let sectionCell = row.insertCell(1);
                nameCell.innerHTML = patient.name;
                sectionCell.innerHTML = section.name;
            });
        });
    });
}

function updateHospitalSelect() {
    let select = document.getElementById('hospital-select');
    select.innerHTML = '<option value="">Select Hospital</option>';
    hospitals.forEach(hospital => {
        let option = document.createElement('option');
        option.value = hospital.name;
        option.text = hospital.name;
        select.add(option);
    });
}

function updateSectionSelect() {
    let nurseSelect = document.getElementById('section-select-nurse');
    let doctorSelect = document.getElementById('section-select-doctor');
    let patientSelect = document.getElementById('section-select-patient');
    nurseSelect.innerHTML = '<option value="">Select Section</option>';
    doctorSelect.innerHTML = '<option value="">Select Section</option>';
    patientSelect.innerHTML = '<option value="">Select Section</option>';

    hospitals.forEach(hospital => {
        hospital.sections.forEach(section => {
            let nurseOption = document.createElement('option');
            nurseOption.value = section.name;
            nurseOption.text = section.name;
            nurseSelect.add(nurseOption);

            let doctorOption = document.createElement('option');
            doctorOption.value = section.name;
            doctorOption.text = section.name;
            doctorSelect.add(doctorOption);

            let patientOption = document.createElement('option');
            patientOption.value = section.name;
            patientOption.text = section.name;
            patientSelect.add(patientOption);
        });
    });
}

updateHospitalSelect();
updateHospitalTable();
updateSectionTable();
updateNurseTable();
updateDoctorTable();
updatePatientTable();
