
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Sidebar Toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            if (overlay) overlay.classList.toggle('active');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    // Simple active link highlighting
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.sidebar-nav a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // Notification Toggle
    const notificationBtn = document.querySelector('.header-actions .icon-btn'); // Assuming the bell icon is the first icon-btn in header-actions
    const notificationDropdown = document.getElementById('notificationDropdown'); // Updated to use the target ID

    if (notificationBtn && notificationDropdown) {
        notificationBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            notificationDropdown.classList.toggle('active');
            if (profileDropdown) profileDropdown.classList.remove('active'); // Close profile if open
        });

        document.addEventListener('click', (e) => {
            if (!notificationDropdown.contains(e.target) && !notificationBtn.contains(e.target)) {
                notificationDropdown.classList.remove('active');
            }
        });
    }

    // Profile Menu Toggle
    const profileToggleBtn = document.getElementById('profileToggleBtn');
    const profileDropdown = document.getElementById('profileDropdown');

    if (profileToggleBtn && profileDropdown) {
        profileToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
            if (notificationDropdown) notificationDropdown.classList.remove('active'); // Close notifications if open
        });

        document.addEventListener('click', (e) => {
            if (!profileDropdown.contains(e.target) && !profileToggleBtn.contains(e.target)) {
                profileDropdown.classList.remove('active');
            }
        });
    }

    // Mark All Read Logic
    const markAllReadBtn = document.getElementById('markAllReadBtn');
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Remove unread class from items
            const unreadItems = document.querySelectorAll('.notification-item.unread');
            unreadItems.forEach(item => {
                item.classList.remove('unread');
                // Target the specific active dot inside the item and make it transparent
                const dot = item.querySelector('div[style*="background: var(--primary-color)"]');
                if (dot) {
                    dot.style.background = 'transparent';
                }
            });

            // Hide the notification badge
            const badge = document.querySelector('.header-actions .badge');
            if (badge) {
                badge.style.display = 'none';
            }
        });
    }

    /* --- New Interaction Logic --- */

    // 1. Login Logic
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (email && password) {
                // Save Login Time
                localStorage.setItem('lastLoginTime', new Date().getTime());

                // Mimic loading state
                const btn = loginForm.querySelector('button');
                const originalText = btn.innerText;
                btn.innerText = 'Signing In...';
                btn.disabled = true;

                setTimeout(() => {
                    // Simple Mock Validation
                    window.location.href = 'dashboard.html';
                }, 800);
            } else {
                alert('Please enter both email and password.');
            }
        });
    }

    // 1.5 Alternative Login Logic
    const googleLoginBtn = document.getElementById('googleLoginBtn');
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', () => {
            // Mock Google login flow asking for email
            const email = prompt("Choose an account to continue to Mini LMS:\n\nEnter your Google email address:");

            if (email) {
                // Save an assumed first name based on email to make the dashboard personalized
                const assumedFirstName = email.split('@')[0].replace(/[^a-zA-Z]/g, ' ');
                // Capitalize first letter
                const formattedName = assumedFirstName.charAt(0).toUpperCase() + assumedFirstName.slice(1);

                localStorage.setItem('userFirstName', formattedName);

                // Save Login Time
                localStorage.setItem('lastLoginTime', new Date().getTime());

                const btn = googleLoginBtn;
                const originalText = btn.innerHTML;
                btn.innerHTML = 'Connecting to Google...';
                btn.disabled = true;

                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 800);
            }
        });
    }

    const emailLoginToggleBtn = document.getElementById('emailLoginToggleBtn');
    const loginDivider = document.getElementById('loginDivider');
    if (emailLoginToggleBtn && loginForm) {
        emailLoginToggleBtn.addEventListener('click', () => {
            loginForm.style.display = 'block';
            if (loginDivider) loginDivider.style.display = 'flex';
            emailLoginToggleBtn.style.display = 'none'; // Optional: hide the toggle button once clicked

            // Focus on email input
            const emailInput = document.getElementById('email');
            if (emailInput) {
                // Focus slightly after allowing display to render
                setTimeout(() => emailInput.focus(), 50);
            }
        });
    }

    // 2. Signup & Forgot Password Logic
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('signupEmail').value;

            if (fullname && email) {
                const btn = signupForm.querySelector('button');
                const originalText = btn.innerText;
                btn.innerText = 'Creating Account...';
                btn.disabled = true;

                setTimeout(() => {
                    alert(`Welcome, ${fullname}! Your account has been created.`);
                    window.location.href = 'index.html'; // Redirect to login
                }, 800);
            }
        });
    }

    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('resetEmail').value;
            if (email) {
                const btn = forgotPasswordForm.querySelector('button');
                const originalText = btn.innerText;
                btn.innerText = 'Sending...';
                btn.disabled = true;

                setTimeout(() => {
                    alert(`Password reset instructions have been sent to ${email}`);
                    window.location.href = 'index.html'; // Redirect to login
                }, 800);
            }
        });
    }

    // 3. Change Photo Logic (Profile Page)
    const changePhotoBtn = document.getElementById('changePhotoBtn');
    const photoInput = document.getElementById('photoInput');
    const profileImage = document.getElementById('profileImage');

    if (changePhotoBtn && photoInput && profileImage) {
        changePhotoBtn.addEventListener('click', () => {
            photoInput.click();
        });

        photoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    profileImage.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    /* --- New Interaction Logic (Step 73 Request) --- */

    // 4. Export CSV (Students Page)
    const exportCsvBtn = document.getElementById('exportCsvBtn');
    if (exportCsvBtn) {
        exportCsvBtn.addEventListener('click', () => {
            // Mock CSV download
            const csvContent = "data:text/csv;charset=utf-8,Name,Email,Progress\nAlice Wonder,alice.w@example.com,75%\nBob Builder,bob.b@example.com,45%\nCharlie Day,charlie.d@example.com,90%\nDiana Prince,diana.p@example.com,12%";
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "students_list.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            alert('CSV Exported Successfully!');
        });
    }

    // 5. View Student Details (Global Function for onclick)
    window.viewStudentDetails = (name) => {
        alert(`Viewing details for student: ${name}\n(Redirecting to student profile...)`);
        // window.location.href = 'student-details.html?name=' + encodeURIComponent(name);
    };

    // 6. Assignment Interactions
    const submitNewAssignmentBtn = document.getElementById('submitNewAssignmentBtn');
    if (submitNewAssignmentBtn) {
        submitNewAssignmentBtn.addEventListener('click', () => {
            alert('Opening "Submit New Assignment" form...');
        });
    }

    const toggleSearchBtn = document.getElementById('toggleSearchBtn');
    const assignmentSearchContainer = document.getElementById('assignmentSearchContainer');
    const assignmentSearchInput = document.getElementById('assignmentSearchInput');

    if (toggleSearchBtn && assignmentSearchContainer) {
        toggleSearchBtn.addEventListener('click', () => {
            if (assignmentSearchContainer.style.display === 'none') {
                assignmentSearchContainer.style.display = 'block';
                // Focus if input exists
                if (assignmentSearchInput) assignmentSearchInput.focus();
            } else {
                assignmentSearchContainer.style.display = 'none';
            }
        });
    }

    if (assignmentSearchInput) {
        assignmentSearchInput.addEventListener('keyup', (e) => {
            const searchText = e.target.value.toLowerCase();
            const table = document.getElementById('assignmentsTable');
            if (table) {
                const rows = table.getElementsByTagName('tr');
                // Start from 1 to skip header
                for (let i = 1; i < rows.length; i++) {
                    const titleCell = rows[i].getElementsByTagName('td')[0];
                    if (titleCell) {
                        const txtValue = titleCell.textContent || titleCell.innerText;
                        if (txtValue.toLowerCase().indexOf(searchText) > -1) {
                            rows[i].style.display = "";
                        } else {
                            rows[i].style.display = "none";
                        }
                    }
                }
            }
        });
    }

    window.uploadAssignment = (title) => {
        const file = prompt(`Upload file for assignment: "${title}"\n(Enter simulation filename like 'homework.pdf')`);
        if (file) {
            alert(`File "${file}" uploaded successfully for ${title}! Status changed to Submitted.`);
            // Logic to update UI status would go here
        }
    };

    window.viewAssignment = (title) => {
        alert(`Opening submission for: "${title}"...`);
    };

    window.viewAssignmentFeedback = (title) => {
        alert(`Showing feedback for: "${title}"\n\nGrade: A\nFeedback: Great work on the structure!`);
    };

    // 6.5 Lecturer Edit Actions (Modal Logic)
    const quickAddModal = document.getElementById('quickAddModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelModalBtn = document.getElementById('cancelModalBtn');
    const quickAddForm = document.getElementById('quickAddForm');
    const modalTitle = document.getElementById('modalTitle');
    const moduleTypeInput = document.getElementById('moduleType');

    // Form Groups
    const descriptionGroup = document.getElementById('descriptionGroup');
    const fileUploadGroup = document.getElementById('fileUploadGroup');
    const dueDateGroup = document.getElementById('dueDateGroup');

    // Open Modal Function
    window.addModule = (type) => {
        if (!quickAddModal) return;

        // Reset form
        quickAddForm.reset();
        moduleTypeInput.value = type;
        modalTitle.innerText = `Add New ${type}`;

        // Show/Hide fields based on type
        descriptionGroup.style.display = 'block'; // Most have descriptions
        fileUploadGroup.style.display = 'none';
        dueDateGroup.style.display = 'none';

        if (type === 'Lecture' || type === 'Note') {
            fileUploadGroup.style.display = 'block';
        } else if (type === 'Assignment') {
            fileUploadGroup.style.display = 'block';
            dueDateGroup.style.display = 'block';
        } else if (type === 'Quiz') {
            dueDateGroup.style.display = 'block';
        } else if (type === 'Course') {
            fileUploadGroup.style.display = 'block'; // for cover image or syllabus
        }

        quickAddModal.classList.add('active');
    };

    // Close Modal Helpers
    const closeModal = () => {
        if (quickAddModal) {
            quickAddModal.classList.remove('active');
            quickAddModal.style.display = ''; // Clear inline styles just in case
        }
    };

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (cancelModalBtn) cancelModalBtn.addEventListener('click', closeModal);

    // Close on outside click
    if (quickAddModal) {
        quickAddModal.addEventListener('click', (e) => {
            if (e.target === quickAddModal) closeModal();
        });
    }

    // Handle Form Submission
    if (quickAddForm) {
        quickAddForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const type = moduleTypeInput.value;
            const title = document.getElementById('itemTitle').value;

            // Mock Saving
            const btn = quickAddForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            btn.innerText = 'Saving...';
            btn.disabled = true;

            setTimeout(() => {
                alert(`Success! ${type} "${title}" has been added.`);
                btn.innerText = originalText;
                btn.disabled = false;
                closeModal();

                // Optional: You could write JS here to append a new HTML block to the dashboard showing the new item.
            }, 600);
        });
    }

    // 7. Course Interactions (Courses Page)
    const addNewCourseBtn = document.getElementById('addNewCourseBtn');
    if (addNewCourseBtn) {
        addNewCourseBtn.addEventListener('click', () => {
            alert('Redirecting to Course Creation Wizard...');
        });
    }

    // Course Filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    const coursesGrid = document.getElementById('coursesGrid');

    if (filterBtns.length > 0 && coursesGrid) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.remove('btn-outline'); // Stylistic toggle helper
                filterBtns.forEach(b => {
                    if (b !== btn) b.classList.add('btn-outline');
                });

                // Add active to clicked
                btn.classList.add('active');
                btn.classList.remove('btn-outline');

                const filter = btn.getAttribute('data-filter');
                const courses = coursesGrid.querySelectorAll('.course-item');

                courses.forEach(course => {
                    if (filter === 'all' || course.getAttribute('data-status') === filter) {
                        course.style.display = 'block';
                    } else {
                        course.style.display = 'none';
                    }
                });
            });
        });
    }

    // 8. Recent Activity & Upgrade (Dashboard)
    const viewAllActivityBtn = document.getElementById('viewAllActivityBtn');
    if (viewAllActivityBtn) {
        viewAllActivityBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Navigating to full Activity Log...');
        });
    }

    const viewPlansBtn = document.getElementById('viewPlansBtn');
    if (viewPlansBtn) {
        viewPlansBtn.addEventListener('click', () => {
            alert('Opening Pricing Plans...\n1. Basic (Free)\n2. Pro ($9.99/mo) - Selected');
        });
    }

    // 9. Course Details Interaction (Course Details Page)
    const continueCourseBtn = document.getElementById('continueCourseBtn');
    if (continueCourseBtn) {
        continueCourseBtn.addEventListener('click', () => {
            alert('Resuming last lesson: "Wireframing Basics"\nLoading video player...');
        });
    }

    const dropCourseBtn = document.getElementById('dropCourseBtn');
    if (dropCourseBtn) {
        dropCourseBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to drop this course? All progress will be lost.')) {
                alert('Course dropped successfully.');
                window.location.href = 'courses.html';
            }
        });
    }

    // 10. Edit Mode Toggle (Dashboard)
    const editModeToggle = document.getElementById('editModeToggle');
    if (editModeToggle) {
        editModeToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                alert('Edit Mode Enabled. You can now rearrange widgets and course materials.');
                // Add an edit-mode class to the body to potentially style editable elements
                document.body.classList.add('edit-mode-active');
            } else {
                alert('Edit Mode Disabled.');
                document.body.classList.remove('edit-mode-active');
            }
        });
    }

    // Private Files Action Buttons
    const savePrivateFilesBtn = document.getElementById('savePrivateFilesBtn');
    if (savePrivateFilesBtn) {
        savePrivateFilesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const originalText = savePrivateFilesBtn.innerText;
            savePrivateFilesBtn.innerText = 'Saving...';
            savePrivateFilesBtn.disabled = true;

            setTimeout(() => {
                alert('File changes saved successfully.');
                savePrivateFilesBtn.innerText = originalText;
                savePrivateFilesBtn.disabled = false;
            }, 800);
        });
    }

    const cancelPrivateFilesBtn = document.getElementById('cancelPrivateFilesBtn');
    if (cancelPrivateFilesBtn) {
        cancelPrivateFilesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Are you sure you want to discard your changes?')) {
                window.location.href = 'dashboard.html';
            }
        });
    }

    // Chat / Messaging Logic
    const chatToggleBtn = document.getElementById('chatToggleBtn');
    const chatModal = document.getElementById('chatModal');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const chatInputMessage = document.getElementById('chatInputMessage');
    const chatHistory = document.getElementById('chatHistory');
    const chatTabs = document.querySelectorAll('.chat-tab');
    const contactItems = document.querySelectorAll('.contact-item');

    if (chatToggleBtn && chatModal && closeChatBtn) {
        chatToggleBtn.addEventListener('click', () => {
            chatModal.style.display = 'flex';
        });

        closeChatBtn.addEventListener('click', () => {
            chatModal.style.display = 'none';
        });

        chatModal.addEventListener('click', (e) => {
            if (e.target === chatModal) {
                chatModal.style.display = 'none';
            }
        });
    }

    if (sendMessageBtn && chatInputMessage && chatHistory) {
        sendMessageBtn.addEventListener('click', () => {
            const text = chatInputMessage.value.trim();
            if (text) {
                const now = new Date();
                const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                const newBubble = document.createElement('div');
                newBubble.className = 'chat-bubble right';
                newBubble.innerHTML = `
                    <div class="bubble-text">${text}</div>
                    <div class="bubble-actions" style="display: flex; gap: 8px; margin-top: 4px; justify-content: flex-end;">
                        <button class="icon-btn edit-msg-btn" title="Edit Message" style="width:14px; height:14px; padding:0; color:white; opacity:0.8;">
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                        </button>
                        <button class="icon-btn delete-msg-btn" title="Delete Message" style="width:14px; height:14px; padding:0; color:white; opacity:0.8;">
                            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                    </div>
                    <span class="bubble-time">${timeString}</span>
                `;
                chatHistory.appendChild(newBubble);
                chatInputMessage.value = '';
                chatHistory.scrollTop = chatHistory.scrollHeight;

                // Simulate reply
                setTimeout(() => {
                    const replyBubble = document.createElement('div');
                    replyBubble.className = 'chat-bubble left';
                    replyBubble.innerHTML = `
                        <div class="bubble-text">Thanks for your message! I'll get back to you soon.</div>
                        <span class="bubble-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    `;
                    chatHistory.appendChild(replyBubble);
                    chatHistory.scrollTop = chatHistory.scrollHeight;
                }, 1000);
            }
        });

        chatInputMessage.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessageBtn.click();
            }
        });

        // Event delegation for Chat Edit & Delete Actions
        chatHistory.addEventListener('click', (e) => {
            const editBtn = e.target.closest('.edit-msg-btn');
            const delBtn = e.target.closest('.delete-msg-btn');

            if (delBtn) {
                const bubble = delBtn.closest('.chat-bubble.right');
                if (bubble && confirm('Are you sure you want to delete this message?')) {
                    bubble.remove();
                }
            } else if (editBtn) {
                const bubble = editBtn.closest('.chat-bubble.right');
                if (bubble) {
                    const textDiv = bubble.querySelector('.bubble-text');
                    const currentText = textDiv.innerText;
                    const newText = prompt('Edit your message:', currentText);

                    if (newText !== null && newText.trim() !== '') {
                        textDiv.innerText = newText.trim();
                    }
                }
            }
        });
    }

    // Chat tabs interaction
    chatTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            chatTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const tabText = tab.innerText.toLowerCase();
            contactItems.forEach(item => {
                const badge = item.querySelector('.badge');
                if (!badge) return;
                const role = badge.innerText.toLowerCase();

                if (tabText === 'all') {
                    item.style.display = 'flex';
                } else if (tabText === 'students' && role === 'student') {
                    item.style.display = 'flex';
                } else if (tabText === 'lecturers' && role === 'lecturer') {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Contact selection
    contactItems.forEach(item => {
        item.addEventListener('click', () => {
            contactItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Update chat header 
            const name = item.querySelector('h4').childNodes[0].nodeValue.trim();
            const avatarSrc = item.querySelector('.contact-avatar').src;

            const chatHeaderName = document.querySelector('.chat-header h3');
            const chatHeaderAvatar = document.querySelector('.chat-header-avatar');

            if (chatHeaderName && chatHeaderAvatar) {
                chatHeaderName.innerText = name;
                chatHeaderAvatar.src = avatarSrc;
            }

            // Clear chat history for demo
            if (chatHistory) {
                chatHistory.innerHTML = `
                    <div style="text-align: center; color: #888; font-size: 0.8rem; margin: 20px 0;">
                        This is the beginning of your conversation with ${name}.
                    </div>
                `;
            }
        });
    });

    // Private Files Toolbar Buttons
    const addFileBtn = document.getElementById('addFileBtn');
    const addFolderBtn = document.getElementById('addFolderBtn');
    const downloadFilesBtn = document.getElementById('downloadFilesBtn');

    if (addFileBtn) {
        addFileBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Reuse the existing Quick Add modal but customize it for File Upload
            const modal = document.getElementById('quickAddModal');
            const title = document.getElementById('modalTitle');
            const descGroup = document.getElementById('descriptionGroup');
            const fileGroup = document.getElementById('fileUploadGroup');
            const dateGroup = document.getElementById('dueDateGroup');
            const quickAddForm = document.getElementById('quickAddForm');

            if (modal && title) {
                if (quickAddForm) quickAddForm.reset();
                title.innerText = 'Upload a File';
                if (descGroup) descGroup.style.display = 'none';
                if (dateGroup) dateGroup.style.display = 'none';
                if (fileGroup) fileGroup.style.display = 'block';
                // Remove any lingering inline styles and use the active class
                modal.style.display = '';
                modal.classList.add('active');
            } else {
                alert('Please select a file to upload to your private files area.');
            }
        });
    }

    if (addFolderBtn) {
        addFolderBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const folderName = prompt('Enter a name for the new folder:');
            if (folderName) {
                alert(`Folder "${folderName}" created successfully.`);
            }
        });
    }

    if (downloadFilesBtn) {
        downloadFilesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Preparing download... All files will be compressed into a ZIP archive.');
        });
    }

    // --- Profile Name Update via localStorage ---
    const profileSettingsForm = document.getElementById('profileSettingsForm');
    const profileFirstName = document.getElementById('profileFirstName');
    const profileLastName = document.getElementById('profileLastName');
    const profileImageName = document.querySelector('.card h2'); // Profile page name display
    const dashboardWelcomeName = document.getElementById('dashboardWelcomeName');
    const lastLoginDisplay = document.getElementById('lastLoginDisplay');

    // 1. Dashboard Load Update
    if (dashboardWelcomeName) {
        const savedFirstName = localStorage.getItem('userFirstName');
        if (savedFirstName) {
            dashboardWelcomeName.innerText = `Welcome back, ${savedFirstName} 👋`;
        }
    }

    if (lastLoginDisplay) {
        const savedLoginTime = localStorage.getItem('lastLoginTime');
        if (savedLoginTime) {
            const loginDate = new Date(parseInt(savedLoginTime));
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);

            const isToday = loginDate.getDate() === today.getDate() && loginDate.getMonth() === today.getMonth() && loginDate.getFullYear() === today.getFullYear();
            const isYesterday = loginDate.getDate() === yesterday.getDate() && loginDate.getMonth() === yesterday.getMonth() && loginDate.getFullYear() === yesterday.getFullYear();

            let dateStr = "";
            if (isToday) {
                dateStr = "Today";
            } else if (isYesterday) {
                dateStr = "Yesterday";
            } else {
                const options = { month: 'short', day: 'numeric' };
                dateStr = loginDate.toLocaleDateString(undefined, options);
            }

            const timeStr = loginDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
            lastLoginDisplay.innerText = `Last login: ${dateStr}, ${timeStr}`;
        }
    }

    // 1.5 Avatar Update Function
    const updateAvatars = (firstName, lastName) => {
        const avatars = document.querySelectorAll('.profile-avatar');
        let initial = 'C'; // Default
        if (firstName) {
            initial = firstName.charAt(0).toUpperCase();
        }
        avatars.forEach(avatar => {
            avatar.innerText = initial;
        });
    };

    // Initial avatar load
    const savedFirst = localStorage.getItem('userFirstName');
    const savedLast = localStorage.getItem('userLastName');
    if (savedFirst) {
        updateAvatars(savedFirst, savedLast);
    }

    // 2. Profile Load Update
    if (profileFirstName) {
        const savedFirstName = localStorage.getItem('userFirstName');
        if (savedFirstName) profileFirstName.value = savedFirstName;

        const savedLastName = localStorage.getItem('userLastName');
        if (savedLastName && profileLastName) profileLastName.value = savedLastName;

        if (profileImageName && savedFirstName) {
            profileImageName.innerText = savedFirstName + (savedLastName ? ' ' + savedLastName : '');
        }
    }

    // 3. Profile Form Submit
    if (profileSettingsForm && profileFirstName) {
        profileSettingsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newFirstName = profileFirstName.value.trim();
            const newLastName = profileLastName ? profileLastName.value.trim() : '';

            if (newFirstName) {
                localStorage.setItem('userFirstName', newFirstName);
                localStorage.setItem('userLastName', newLastName);

                if (profileImageName) {
                    profileImageName.innerText = newFirstName + (newLastName ? ' ' + newLastName : '');
                }

                updateAvatars(newFirstName, newLastName);

                const btn = profileSettingsForm.querySelector('button[type="submit"]');
                const originalText = btn.innerText;
                btn.innerText = 'Saving...';
                btn.disabled = true;

                setTimeout(() => {
                    alert('Profile settings saved successfully!');
                    btn.innerText = originalText;
                    btn.disabled = false;
                }, 500);
            }
        });
    }

    // --- Dynamic Calendar Logic ---
    const calTodayBtn = document.getElementById('calTodayBtn');
    const calPrevBtn = document.getElementById('calPrevBtn');
    const calNextBtn = document.getElementById('calNextBtn');
    const calMonthDisplay = document.getElementById('calMonthDisplay');
    const calGridDays = document.getElementById('calGridDays');

    // View Toggles
    const calViewMonth = document.getElementById('calViewMonth');
    const calViewWeek = document.getElementById('calViewWeek');
    const calViewDay = document.getElementById('calViewDay');

    if (calGridDays) {
        let currentDate = new Date();

        // Hardcoded dummy events for UI demonstration
        const dummyEvents = [
            { dayOffset: 5, title: '⏰ Database Schema Due', colorBg: '#fee2e2', colorText: '#dc2626' },
            { dayOffset: 10, title: '📘 Web Design Lecture', colorBg: '#e0f2fe', colorText: '#0284c7' },
            { dayOffset: 18, title: '📝 Midterm Quiz', colorBg: '#fef3c7', colorText: '#d97706' },
            { dayOffset: 18, title: '⏰ User Research Due', colorBg: '#fee2e2', colorText: '#dc2626' }
        ];

        const renderCalendar = (date) => {
            calGridDays.innerHTML = '';

            const year = date.getFullYear();
            const month = date.getMonth();

            // Format Month Year text
            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            calMonthDisplay.innerText = `${monthNames[month]} ${year}`;

            const firstDayOfMonth = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const daysInPrevMonth = new Date(year, month, 0).getDate();

            const today = new Date();
            const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;

            let htmlArr = [];

            // Previous month trailing days
            for (let i = firstDayOfMonth; i > 0; i--) {
                const dayNum = daysInPrevMonth - i + 1;
                htmlArr.push(`
                    <div class="fc-day other-month" style="background: #fafafa; min-height: 120px; padding: 10px;">
                        <span class="fc-date" style="color: #bbb; font-size: 0.9rem;">${dayNum}</span>
                    </div>
                `);
            }

            // Current month days
            for (let i = 1; i <= daysInMonth; i++) {
                let isToday = isCurrentMonth && i === today.getDate();
                let dayClasses = "fc-day";
                let dayStyle = "background: white; min-height: 120px; padding: 10px;";
                let dateHtml = `<span class="fc-date" style="color: var(--text-main); font-size: 0.9rem;">${i}</span>`;

                if (isToday) {
                    dayClasses += " active-day";
                    dayStyle = "background: #eff6ff; min-height: 120px; padding: 10px;";
                    dateHtml = `
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <span class="fc-date" style="background: var(--primary-color); color: white; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-size: 0.85rem; font-weight: bold;">${i}</span>
                        </div>
                    `;
                } else {
                    dateHtml = `<span class="fc-date" style="color: var(--text-main); font-size: 0.9rem; margin-bottom: 8px; display: block;">${i}</span>`;
                }

                let eventsHtml = '';
                // Inject dummy events relative to the 1st of the month so they always appear
                dummyEvents.forEach(evt => {
                    if (i === evt.dayOffset) {
                        eventsHtml += `
                            <div class="fc-event" style="background: ${evt.colorBg}; color: ${evt.colorText}; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 500; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; cursor: pointer;">
                                ${evt.title}
                            </div>
                        `;
                    }
                });

                htmlArr.push(`
                    <div class="${dayClasses}" style="${dayStyle}">
                        ${dateHtml}
                        ${eventsHtml}
                    </div>
                `);
            }

            // Next month leading days to fill grid (35 cells minimum, or 42)
            const totalCells = htmlArr.length;
            const remainingCells = (totalCells > 35) ? 42 - totalCells : 35 - totalCells;
            for (let i = 1; i <= remainingCells; i++) {
                htmlArr.push(`
                    <div class="fc-day other-month" style="background: #fafafa; min-height: 120px; padding: 10px;">
                        <span class="fc-date" style="color: #bbb; font-size: 0.9rem;">${i}</span>
                    </div>
                `);
            }

            calGridDays.innerHTML = htmlArr.join('');
        };

        renderCalendar(currentDate);

        calPrevBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar(currentDate);
        });

        calNextBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar(currentDate);
        });

        calTodayBtn.addEventListener('click', () => {
            currentDate = new Date();
            renderCalendar(currentDate);
        });

        // View Toggles (Visual indication only)
        const toggleView = (activeBtn) => {
            [calViewMonth, calViewWeek, calViewDay].forEach(btn => {
                if (btn) {
                    btn.classList.remove('active-view');
                    btn.style.background = 'transparent';
                    btn.style.color = 'var(--text-light)';
                    btn.style.boxShadow = 'none';
                }
            });
            if (activeBtn) {
                activeBtn.classList.add('active-view');
                activeBtn.style.background = 'white';
                activeBtn.style.color = 'var(--text-main)';
                activeBtn.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
            }
        };

        if (calViewMonth) calViewMonth.addEventListener('click', () => toggleView(calViewMonth));
        if (calViewWeek) calViewWeek.addEventListener('click', () => toggleView(calViewWeek));
        if (calViewDay) calViewDay.addEventListener('click', () => toggleView(calViewDay));
    }

    // --- Dashboard Calendar Widget Logic ---
    const dashCalPrevBtn = document.getElementById('dashCalPrevBtn');
    const dashCalNextBtn = document.getElementById('dashCalNextBtn');
    const dashCalMonthDisplay = document.getElementById('dashCalMonthDisplay');
    const dashCalGridDays = document.getElementById('dashCalGridDays');

    if (dashCalGridDays) {
        let currentDashDate = new Date();

        // Dummy events for the widget
        const widgetEvents = [6, 18];

        const renderDashCalendar = (date) => {
            dashCalGridDays.innerHTML = '';

            const year = date.getFullYear();
            const month = date.getMonth();

            const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            dashCalMonthDisplay.innerText = `${monthNames[month]} ${year}`;

            const firstDayOfMonth = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const daysInPrevMonth = new Date(year, month, 0).getDate();

            const today = new Date();
            const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;

            let htmlArr = [];

            for (let i = firstDayOfMonth; i > 0; i--) {
                const dayNum = daysInPrevMonth - i + 1;
                htmlArr.push(`<div class="day other-month" style="color: #ccc; font-size: 0.8rem; padding: 4px 0;">${dayNum}</div>`);
            }

            for (let i = 1; i <= daysInMonth; i++) {
                let isToday = isCurrentMonth && i === today.getDate();
                let hasEvent = widgetEvents.includes(i);

                if (isToday) {
                    htmlArr.push(`<div class="day active" style="font-size: 0.8rem; padding: 4px 0; cursor: pointer; background: var(--primary-color); color: white; border-radius: 50%; font-weight: bold;">${i}</div>`);
                } else if (hasEvent) {
                    htmlArr.push(`<div class="day has-event" style="font-size: 0.8rem; padding: 4px 0; cursor: pointer; position: relative; color: var(--primary-color); font-weight: bold;">${i}<span style="position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 4px; height: 4px; border-radius: 50%; background: var(--danger-color);"></span></div>`);
                } else {
                    htmlArr.push(`<div class="day" style="font-size: 0.8rem; padding: 4px 0; cursor: pointer;">${i}</div>`);
                }
            }

            const totalCells = htmlArr.length;
            const remainingCells = (totalCells > 35) ? 42 - totalCells : 35 - totalCells;
            for (let i = 1; i <= remainingCells; i++) {
                htmlArr.push(`<div class="day other-month" style="color: #ccc; font-size: 0.8rem; padding: 4px 0;">${i}</div>`);
            }

            dashCalGridDays.innerHTML = htmlArr.join('');
        };

        renderDashCalendar(currentDashDate);

        if (dashCalPrevBtn) {
            dashCalPrevBtn.addEventListener('click', () => {
                currentDashDate.setMonth(currentDashDate.getMonth() - 1);
                renderDashCalendar(currentDashDate);
            });
        }

        if (dashCalNextBtn) {
            dashCalNextBtn.addEventListener('click', () => {
                currentDashDate.setMonth(currentDashDate.getMonth() + 1);
                renderDashCalendar(currentDashDate);
            });
        }
    }
});

// Minimizable Calendar Toggle
window.toggleCalendar = () => {
    const content = document.getElementById('calendarContent');
    const icon = document.getElementById('calendarToggleIcon');

    if (content && icon) {
        if (content.style.maxHeight === '0px') {
            content.style.maxHeight = '500px';
            content.style.paddingTop = '15px';
            content.style.opacity = '1';
            icon.style.transform = 'rotate(0deg)';
        } else {
            content.style.maxHeight = '0px';
            content.style.paddingTop = '0px';
            content.style.opacity = '0';
            icon.style.transform = 'rotate(180deg)';
        }
    }
};
