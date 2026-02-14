// Sample employee data
const employeeData = [
    { name: 'John Smith', company: 'Tech Solutions', role: 'Developer', age: 28, workers: 5, department: 'IT' },
    { name: 'Sarah Johnson', company: 'Tech Solutions', role: 'Manager', age: 35, workers: 12, department: 'Management' },
    { name: 'Michael Brown', company: 'Tech Solutions', role: 'Designer', age: 26, workers: 3, department: 'Design' },
    { name: 'Emma Wilson', company: 'Innovation Corp', role: 'Developer', age: 32, workers: 8, department: 'IT' },
    { name: 'David Lee', company: 'Innovation Corp', role: 'Developer', age: 29, workers: 5, department: 'IT' },
    { name: 'Lisa Anderson', company: 'Innovation Corp', role: 'Manager', age: 45, workers: 15, department: 'Management' },
    { name: 'James Taylor', company: 'Digital Ventures', role: 'Developer', age: 31, workers: 6, department: 'IT' },
    { name: 'Maria Garcia', company: 'Digital Ventures', role: 'Designer', age: 27, workers: 4, department: 'Design' },
    { name: 'Robert Martinez', company: 'Digital Ventures', role: 'Manager', age: 48, workers: 18, department: 'Management' },
    { name: 'Jennifer White', company: 'Tech Solutions', role: 'Developer', age: 24, workers: 2, department: 'IT' },
    { name: 'William Clark', company: 'Innovation Corp', role: 'Designer', age: 38, workers: 7, department: 'Design' },
    { name: 'Patricia Harris', company: 'Digital Ventures', role: 'Developer', age: 33, workers: 5, department: 'IT' },
    { name: 'Christopher Martin', company: 'Tech Solutions', role: 'Manager', age: 52, workers: 20, department: 'Management' },
    { name: 'Nancy Thompson', company: 'Innovation Corp', role: 'Developer', age: 25, workers: 3, department: 'IT' },
    { name: 'Daniel Jackson', company: 'Digital Ventures', role: 'Designer', age: 41, workers: 9, department: 'Design' },
];

let filteredData = [...employeeData];

// Get DOM elements
const tableBody = document.getElementById('tableBody');
const companyFilter = document.getElementById('companyFilter');
const roleFilter = document.getElementById('roleFilter');
const ageFilter = document.getElementById('ageFilter');
const searchInput = document.getElementById('searchInput');
const resetBtn = document.getElementById('resetBtn');
const noResults = document.getElementById('noResults');

// Initialize the page
function init() {
    populateFilterDropdowns();
    renderTable(employeeData);
    attachEventListeners();
}

// Populate filter dropdowns with unique values
function populateFilterDropdowns() {
    // Get unique companies
    const companies = [...new Set(employeeData.map(emp => emp.company))].sort();
    companies.forEach(company => {
        const option = document.createElement('option');
        option.value = company;
        option.textContent = company;
        companyFilter.appendChild(option);
    });

    // Get unique roles
    const roles = [...new Set(employeeData.map(emp => emp.role))].sort();
    roles.forEach(role => {
        const option = document.createElement('option');
        option.value = role;
        option.textContent = role;
        roleFilter.appendChild(option);
    });
}

// Attach event listeners to filters
function attachEventListeners() {
    companyFilter.addEventListener('change', applyFilters);
    roleFilter.addEventListener('change', applyFilters);
    ageFilter.addEventListener('change', applyFilters);
    searchInput.addEventListener('input', applyFilters);
    resetBtn.addEventListener('click', resetFilters);
}

// Apply all active filters
function applyFilters() {
    const selectedCompany = companyFilter.value;
    const selectedRole = roleFilter.value;
    const selectedAgeRange = ageFilter.value;
    const searchTerm = searchInput.value.toLowerCase();

    filteredData = employeeData.filter(employee => {
        // Company filter
        if (selectedCompany && employee.company !== selectedCompany) {
            return false;
        }

        // Role filter
        if (selectedRole && employee.role !== selectedRole) {
            return false;
        }

        // Age range filter
        if (selectedAgeRange) {
            if (selectedAgeRange === '61+' && employee.age < 61) {
                return false;
            } else if (selectedAgeRange !== '61+') {
                const [minAge, maxAge] = selectedAgeRange.split('-').map(Number);
                if (employee.age < minAge || employee.age > maxAge) {
                    return false;
                }
            }
        }

        // Search filter
        if (searchTerm) {
            const matchesSearch = 
                employee.name.toLowerCase().includes(searchTerm) ||
                employee.company.toLowerCase().includes(searchTerm) ||
                employee.role.toLowerCase().includes(searchTerm);
            if (!matchesSearch) {
                return false;
            }
        }

        return true;
    });

    renderTable(filteredData);
}

// Render table with data
function renderTable(data) {
    tableBody.innerHTML = '';

    if (data.length === 0) {
        noResults.classList.add('show');
        return;
    }

    noResults.classList.remove('show');

    data.forEach(employee => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.company}</td>
            <td>${employee.role}</td>
            <td>${employee.age}</td>
            <td>${employee.workers}</td>
            <td>${employee.department}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Reset all filters
function resetFilters() {
    companyFilter.value = '';
    roleFilter.value = '';
    ageFilter.value = '';
    searchInput.value = '';
    filteredData = [...employeeData];
    renderTable(employeeData);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);
