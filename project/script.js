// Mobile menu toggle
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}
// Open Login Modal
document.getElementById('login-link').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('login-modal').style.display = 'flex';
});

// Open Register Modal
document.getElementById('register-link').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('register-modal').style.display = 'flex';
});
// Toggle register modal close
function closeRegisterModal() {
    document.getElementById('register-modal').style.display = 'none';
}

// Toggle login modal close
function closeLoginModal() {
    document.getElementById('login-modal').style.display = 'none';
}
window.addEventListener('click', function (e) {
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    if (e.target === loginModal) loginModal.style.display = 'none';
    if (e.target === registerModal) registerModal.style.display = 'none';
});






// DOM Loaded Event Listener
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM Loaded - Initializing application');

    // Increment visitor count
    let count = parseInt(localStorage.getItem('visitor_count') || 0);
    count++;
    localStorage.setItem('visitor_count', count);
    document.getElementById('visitor-count').textContent = count;

    // Load progress for all programming languages
    const languageCards = document.querySelectorAll('.language-card');
    languageCards.forEach(card => {
        const language = card.getAttribute('data-language');
        const progress = localStorage.getItem(`progress_${language}`) || 0;

        const progressFill = card.querySelector('.progress-fill');
        const progressPercent = card.querySelector('.progress-percent');

        if (progressFill && progressPercent) {
            progressFill.style.width = `${progress}%`;
            progressPercent.textContent = `${progress}%`;
        }
    });

    // Update progress button event listeners
    const updateButtons = document.querySelectorAll('.update-progress');
    updateButtons.forEach(button => {
        button.addEventListener('click', function () {
            const card = this.closest('.language-card');
            const language = card.getAttribute('data-language');
            const languageName = card.querySelector('h3').textContent;
            const currentProgress = localStorage.getItem(`progress_${language}`) || 0;

            const modal = document.getElementById('progress-modal');
            const title = document.getElementById('progress-language-title');
            const slider = document.getElementById('progress-slider');
            const display = document.getElementById('progress-value-display');

            title.textContent = languageName;
            title.setAttribute('data-language', language);
            slider.value = currentProgress;
            display.textContent = `${currentProgress}%`;

            modal.style.display = 'flex';
        });
    });

    document.getElementById('save-progress').addEventListener('click', function () {
        const language = document.getElementById('progress-language-title').getAttribute('data-language');
        const progress = document.getElementById('progress-slider').value;

        localStorage.setItem(`progress_${language}`, progress);

        const card = document.querySelector(`.language-card[data-language="${language}"]`);
        const progressFill = card.querySelector('.progress-fill');
        const progressPercent = card.querySelector('.progress-percent');

        if (progressFill && progressPercent) {
            progressFill.style.width = `${progress}%`;
            progressPercent.textContent = `${progress}%`;
        }

        document.getElementById('progress-modal').style.display = 'none';
    });

    document.getElementById('progress-slider').addEventListener('input', function () {
        document.getElementById('progress-value-display').textContent = `${this.value}%`;
    });

    document.getElementById('close-progress-modal').addEventListener('click', function () {
        document.getElementById('progress-modal').style.display = 'none';
    });

    // Notes
    loadNotes();

    document.getElementById('add-note-btn').addEventListener('click', function () {
        openNoteModal();
    });

    document.getElementById('save-note').addEventListener('click', function () {
        saveNote();
    });

    document.getElementById('close-note-modal').addEventListener('click', function () {
        document.getElementById('note-modal').style.display = 'none';
    });

    document.getElementById('cancel-note').addEventListener('click', function () {
        document.getElementById('note-modal').style.display = 'none';
    });

    document.querySelectorAll('#note-categories li').forEach(item => {
        item.addEventListener('click', function () {
            const category = this.getAttribute('data-category');

            document.querySelectorAll('#note-categories li').forEach(li => {
                li.classList.remove('active');
            });
            this.classList.add('active');

            filterNotes(category);
        });
    });

    window.addEventListener('click', function (event) {
        const progressModal = document.getElementById('progress-modal');
        const noteModal = document.getElementById('note-modal');

        if (event.target === progressModal) {
            progressModal.style.display = 'none';
        }

        if (event.target === noteModal) {
            noteModal.style.display = 'none';
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        navbar.style.background = window.scrollY > 50 ? '#1e40af' : '#2563eb';
    });
});

function findJobs() {
    const inputRole = document.getElementById("roleInput").value.trim().toLowerCase();
    fetch("save_search.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "term=" + encodeURIComponent(inputRole)
    });

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (inputRole === "") {
        resultsDiv.innerHTML = "<p>Please enter a job role.</p>";
        return;
    }

    const jobsDatabase = [
        { company: "Google", role: "Web Developer", location: "Bangalore", vacancies: 5, applyLink: "https://careers.google.com" },
        { company: "Amazon", role: "Data Analyst", location: "Hyderabad", vacancies: 3, applyLink: "https://www.amazon.jobs" },
        { company: "TCS", role: "Software Engineer", location: "Chennai", vacancies: 4, applyLink: "https://www.tcs.com/careers" },
        { company: "Infosys", role: "Web Developer", location: "Pune", vacancies: 2, applyLink: "https://www.infosys.com/careers" },
        { company: "Wipro", role: "System Analyst", location: "Mumbai", vacancies: 6, applyLink: "https://careers.wipro.com" },
        { company: "Accenture", role: "Web Developer", location: "Remote", vacancies: 3, applyLink: "https://www.accenture.com/in-en/careers" },
        { company: "Capgemini", role: "Data Scientist", location: "Noida", vacancies: 2, applyLink: "https://www.capgemini.com/careers" },
        { company: "Microsoft", role: "Software Engineer", location: "Bangalore", vacancies: 4, applyLink: "https://careers.microsoft.com" },
        { company: "IBM", role: "AI Engineer", location: "Hyderabad", vacancies: 3, applyLink: "https://www.ibm.com/careers" },
        { company: "Meta", role: "Frontend Developer", location: "Remote", vacancies: 2, applyLink: "https://www.metacareers.com" },
        { company: "Apple", role: "iOS Developer", location: "Mumbai", vacancies: 3, applyLink: "https://www.apple.com/careers/in/" },
        { company: "Netflix", role: "Backend Engineer", location: "Bangalore", vacancies: 2, applyLink: "https://jobs.netflix.com" }
    ];

    const matchedJobs = jobsDatabase.filter(job => job.role.toLowerCase().includes(inputRole));

    if (matchedJobs.length === 0) {
        resultsDiv.innerHTML = `<p>No jobs found for <strong>${inputRole}</strong>.</p>`;
    } else {
        matchedJobs.forEach(job => {
            resultsDiv.innerHTML += `
                <div class="job-card">
                    <h3>${job.role}</h3>
                    <p><strong>Company:</strong> ${job.company}</p>
                    <p><strong>Location:</strong> ${job.location}</p>
                    <p><strong>Vacancies:</strong> ${job.vacancies}</p>
                    <a class="apply-btn" href="${job.applyLink}" target="_blank">Apply Now</a>
                </div>
            `;
        });
    }
}
document.getElementById('feedback-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const feedback = document.getElementById('feedback-text').value.trim();

    if (!feedback) {
        alert('Please write something!');
        return;
    }

    fetch('save_feedback.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'feedback=' + encodeURIComponent(feedback)
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById('feedback-message').textContent = data.message;
        document.getElementById('feedback-form').reset();
    })
    .catch(() => {
        document.getElementById('feedback-message').textContent = 'Failed to send feedback.';
    });
});

document.getElementById('feedback-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const message = document.getElementById('feedback-message');
    message.textContent = "Thank you for your feedback!";
    this.reset();
});
document.getElementById('open-feedback-modal').addEventListener('click', () => {
    document.getElementById('feedback-modal').style.display = 'flex';
});

function closeFeedbackModal() {
    document.getElementById('feedback-modal').style.display = 'none';
}

document.getElementById('feedback-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const message = document.getElementById('feedback-message');
    message.textContent = "✅ Thank you for your feedback!";
    this.reset();

    // Close after short delay
    setTimeout(() => {
        closeFeedbackModal();
        message.textContent = "";
    }, 2000);
});

window.addEventListener('click', function (e) {
    const modal = document.getElementById('feedback-modal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});




document.querySelectorAll('.apply-form').forEach(form => {
    form.addEventListener('submit', (e) => {
        const email = form.querySelector('.email-input').value;
        if (!email) {
            alert("Please enter your email!");
            e.preventDefault();
        }
    });
});

function loadNotes() {
    try {
        let notes = JSON.parse(localStorage.getItem('student_notes')) || [];
        const notesList = document.getElementById('notes-list');

        if (notes.length === 0) {
            notesList.innerHTML = `
                <div class="empty-notes">
                    <i class="fas fa-sticky-note fa-3x"></i>
                    <p>No notes yet. Create your first note!</p>
                </div>
            `;
            return;
        }

        renderNotes(notes);
    } catch (error) {
        console.error('Error loading notes:', error);
        localStorage.setItem('student_notes', JSON.stringify([]));
        document.getElementById('notes-list').innerHTML = `
            <div class="empty-notes">
                <i class="fas fa-sticky-note fa-3x"></i>
                <p>No notes yet. Create your first note!</p>
            </div>
        `;
    }
}

function renderNotes(notes) {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';
    notes.forEach((note, index) => {
        const noteCard = document.createElement('div');
        noteCard.className = 'note-card';
        noteCard.setAttribute('data-id', index);
        noteCard.setAttribute('data-category', note.category);
        noteCard.innerHTML = `
            <div class="note-title">${note.title}</div>
            <div class="note-category">${getCategoryName(note.category)}</div>
            <div class="note-content">${note.content}</div>
            <div class="note-actions">
                <button class="edit-note" onclick="editNote(${index})"><i class="fas fa-edit"></i></button>
                <button class="delete-note" onclick="deleteNote(${index})"><i class="fas fa-trash"></i></button>
            </div>
        `;
        notesList.appendChild(noteCard);
    });
}

function filterNotes(category) {
    let notes = JSON.parse(localStorage.getItem('student_notes')) || [];
    if (category !== 'all') {
        notes = notes.filter(note => note.category === category);
    }
    renderNotes(notes);
}

function openNoteModal(noteId = null) {
    const modal = document.getElementById('note-modal');
    const titleInput = document.getElementById('note-title');
    const categorySelect = document.getElementById('note-category');
    const contentTextarea = document.getElementById('note-content');
    if (noteId !== null) {
        const notes = JSON.parse(localStorage.getItem('student_notes')) || [];
        const note = notes[noteId];
        titleInput.value = note.title;
        categorySelect.value = note.category;
        contentTextarea.value = note.content;
        modal.setAttribute('data-note-id', noteId);
    } else {
        titleInput.value = '';
        categorySelect.value = 'python';
        contentTextarea.value = '';
        modal.removeAttribute('data-note-id');
    }
    modal.style.display = 'flex';
}
// Handle login form submission
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    fetch('login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            closeLoginModal();
            // Update UI for logged in user
            document.getElementById('login-link').textContent = 'Logout';
            document.getElementById('login-link').href = 'logout.php';
            document.getElementById('register-link').style.display = 'none';
            
            // Show welcome message
            alert(`Welcome back, ${data.user.name}!`);
            
            // Refresh logged users table if on admin page
            if (document.getElementById('logged-users-table')) {
                fetchLoggedUsers();
            }
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Login failed. Please try again.');
    });
});

// Handle registration form submission
document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    fetch('register.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            closeRegisterModal();
            // Update UI for logged in user
            document.getElementById('login-link').textContent = 'Logout';
            document.getElementById('login-link').href = 'logout.php';
            document.getElementById('register-link').style.display = 'none';
            
            // Show welcome message
            alert(`Welcome, ${data.user.name}! Your account has been created.`);
            
            // Refresh logged users table if on admin page
            if (document.getElementById('logged-users-table')) {
                fetchLoggedUsers();
            }
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Registration failed. Please try again.');
    });
});
document.getElementById("save-note").addEventListener("click", () => {
    const title = document.getElementById("note-title").value.trim();
    const category = document.getElementById("note-category").value;
    const content = document.getElementById("note-content").value.trim();

    if (!title || !content) {
        alert("Title and content are required!");
        return;
    }

    fetch("save_note.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `title=${encodeURIComponent(title)}&category=${encodeURIComponent(category)}&content=${encodeURIComponent(content)}`
    })
    .then(res => res.json())
    .then(data => {
        if (data.message === "Note saved") {
            alert("Note saved!");
            location.reload();
        } else {
            alert("Failed to save: " + data.message);
        }
    });
    
});


// Check login status on page load
function checkLoginStatus() {
    fetch('check_login.php')
    .then(response => response.json())
    .then(data => {
        if (data.logged_in) {
            // Update UI for logged in user
            
             document.getElementById('login-link').style.display='none';
            
            document.getElementById('register-link').style.display = 'none';
        }
    })
    .catch(error => console.error('Error checking login status:', error));
}

// Add this to your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    loadNotes();
    // ...
});


function saveNote() {
    const modal = document.getElementById('note-modal');
    const titleInput = document.getElementById('note-title');
    const categorySelect = document.getElementById('note-category');
    const contentTextarea = document.getElementById('note-content');
    if (!titleInput.value.trim()) {
        alert('Please enter a title for your note.');
        return;
    }
    if (!contentTextarea.value.trim()) {
        alert('Please enter some content for your note.');
        return;
    }
    const newNote = {
        title: titleInput.value.trim(),
        category: categorySelect.value,
        content: contentTextarea.value.trim(),
        date: new Date().toISOString()
    };
    let notes = JSON.parse(localStorage.getItem('student_notes')) || [];
    const noteId = modal.getAttribute('data-note-id');
    if (noteId !== null) {
        notes[parseInt(noteId, 10)] = newNote;
    } else {
        notes.push(newNote);
    }
    localStorage.setItem('student_notes', JSON.stringify(notes));
    loadNotes();
    const activeCategory = document.querySelector('#note-categories li.active');
    if (activeCategory) {
        const category = activeCategory.getAttribute('data-category');
        if (category !== 'all') {
            filterNotes(category);
        }
    }
    modal.style.display = 'none';
}

function deleteNote(index) {
    if (confirm('Are you sure you want to delete this note?')) {
        let notes = JSON.parse(localStorage.getItem('student_notes')) || [];
        notes.splice(index, 1);
        localStorage.setItem('student_notes', JSON.stringify(notes));
        loadNotes();
        const activeCategory = document.querySelector('#note-categories li.active');
        if (activeCategory) {
            const category = activeCategory.getAttribute('data-category');
            if (category !== 'all') {
                filterNotes(category);
            }
        }
    }
}

function editNote(index) {
    openNoteModal(index);
}

function getCategoryName(category) {
    const categories = {
        'python': 'Python',
        'c': 'C',
        'java': 'Java',
        'cpp': 'C++',
        'ds': 'Data Structures',
        'algo': 'Algorithms',
        'dbms': 'DBMS',
        'web': 'Web Development',
        'other': 'Other'
    };
    return categories[category] || 'Other';
}