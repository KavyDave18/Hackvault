// HackVault - Main JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const domainOptions = document.querySelectorAll('.domain-option');
    const selectedDomainInput = document.getElementById('selected-domain');
    const addMemberBtn = document.getElementById('add-member');
    const teamMembersContainer = document.getElementById('team-members');
    const generateBtn = document.getElementById('generate-btn');
    const resultSection = document.getElementById('result-section');
    const loadingContainer = document.getElementById('loading-container');
    const resultContainer = document.getElementById('result-container');
    const resultContent = document.getElementById('result-content');
    const savePdfBtn = document.getElementById('save-pdf-btn');
    const regenerateBtn = document.getElementById('regenerate-btn');

    // Init localStorage
    const savedResult = localStorage.getItem('hackvault_result');
    if (savedResult) {
        try {
            const savedData = JSON.parse(savedResult);
            showSavedResult(savedData);
        } catch (e) {
            console.error('Failed to parse saved result', e);
        }
    }

    // Domain Selection
    domainOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove selection from all options
            domainOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selection to clicked option
            option.classList.add('selected');
            
            // Update hidden input
            const domain = option.getAttribute('data-domain');
            selectedDomainInput.value = domain;
        });
    });

    // Team Member Management
    addMemberBtn.addEventListener('click', () => {
        addNewTeamMember();
    });

    // Add one team member by default
    if (teamMembersContainer.children.length === 0) {
        addNewTeamMember();
    }

    // Event delegation for remove buttons
    teamMembersContainer.addEventListener('click', (e) => {
        if (e.target.closest('.remove-member')) {
            const teamMember = e.target.closest('.team-member');
            if (teamMembersContainer.children.length > 1) {
                teamMember.remove();
            } else {
                // Clear inputs instead of removing if it's the last one
                const nameInput = teamMember.querySelector('.member-name');
                const roleSelect = teamMember.querySelector('.member-role');
                nameInput.value = '';
                roleSelect.value = '';
            }
        }
    });

    // Generate Idea
    generateBtn.addEventListener('click', async () => {
        // Validate inputs
        const selectedDomain = selectedDomainInput.value;
        const teamMembers = getTeamMembers();
        
        if (!selectedDomain) {
            alert('Please select a domain first!');
            return;
        }
        
        if (teamMembers.length === 0) {
            alert('Please add at least one team member with a name and role!');
            return;
        }
        
        // Show loading state
        resultSection.style.display = 'block';
        loadingContainer.classList.add('visible');
        resultContainer.classList.remove('visible');
        
        // Scroll to results
        resultSection.scrollIntoView({ behavior: 'smooth' });
        
        try {
            // Generate the idea from backend
            const result = await fetchIdeaFromBackend(selectedDomain, teamMembers);
            
            // Save to localStorage for persistence
            localStorage.setItem('hackvault_result', JSON.stringify(result));
            
            // Show notification
            showSaveNotification();
            
            // Display result
            displayResult(result);
        } catch (error) {
            console.error('Error generating idea:', error);
            alert('Failed to generate idea. Please try again later.');
            resultSection.style.display = 'none';
        }
    });

    // PDF Export
    savePdfBtn.addEventListener('click', () => {
        exportToPDF();
    });

    // Regenerate button
    regenerateBtn.addEventListener('click', () => {
        // Scroll back to inputs
        document.querySelector('.input-section').scrollIntoView({ behavior: 'smooth' });
        
        // Hide results
        setTimeout(() => {
            resultSection.style.display = 'none';
        }, 500);
    });

    // Functions
    function addNewTeamMember() {
        const teamMember = document.createElement('div');
        teamMember.classList.add('team-member');
        teamMember.innerHTML = `
            <input type="text" class="member-name" placeholder="Team Member Name">
            <select class="member-role">
                <option value="">Select Role</option>
                <option value="Frontend">Frontend Developer</option>
                <option value="Backend">Backend Developer</option>
                <option value="Fullstack">Fullstack Developer</option>
                <option value="UI/UX">UI/UX Designer</option>
                <option value="ML/AI">ML/AI Engineer</option>
                <option value="DevOps">DevOps Engineer</option>
                <option value="PM">Project Manager</option>
            </select>
            <button class="remove-member"><i class="fas fa-times"></i></button>
        `;
        teamMembersContainer.appendChild(teamMember);
    }

    function getTeamMembers() {
        const members = [];
        const memberElems = teamMembersContainer.querySelectorAll('.team-member');
        
        memberElems.forEach(member => {
            const nameInput = member.querySelector('.member-name');
            const roleSelect = member.querySelector('.member-role');
            
            if (nameInput.value.trim() !== '' && roleSelect.value !== '') {
                members.push({
                    name: nameInput.value.trim(),
                    role: roleSelect.value
                });
            }
        });
        
        return members;
    }

    async function fetchIdeaFromBackend(domain, teamMembers) {
        // In a real app, this would be an actual fetch to the backend
        // For demonstration, we'll simulate the backend response with setTimeout
        return new Promise((resolve) => {
            setTimeout(() => {
                // For demonstration purposes, we're simulating a response
                // In a real app, this would be the response from the C++ CGI backend
                resolve({
                    domain: domain,
                    project: getRandomProjectForDomain(domain),
                    team: teamMembers,
                    techStack: getTechStackForDomain(domain)
                });
            }, 1500);
        });
    }

    function displayResult(result) {
        // Hide loading
        loadingContainer.classList.remove('visible');
        
        // Prepare content
        resultContent.innerHTML = `
            <div class="project-idea">
                <h4><i class="fas fa-lightbulb"></i> Project Idea</h4>
                <span class="project-domain">${result.domain}</span>
                <h3>${result.project.title}</h3>
                <p>${result.project.description}</p>
            </div>
            
            <div class="team-info">
                <h4><i class="fas fa-users"></i> Team Structure</h4>
                <div class="team-list">
                    ${result.team.map(member => `
                        <div class="team-member-card">
                            <h5>${member.name}</h5>
                            <span class="member-role-badge">${member.role}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="tech-stack">
                <h4><i class="fas fa-laptop-code"></i> Suggested Tech Stack</h4>
                <div class="tech-list">
                    ${formatTechStack(result.techStack)}
                </div>
            </div>
        `;
        
        // Show result
        resultContainer.classList.add('visible');
    }

    function formatTechStack(techStack) {
        // Split the tech stack string into lines and format as categories
        const lines = techStack.split('\n');
        let html = '';
        
        lines.forEach(line => {
            if (line.includes(':')) {
                const [category, items] = line.split(':');
                html += `
                    <div class="tech-category">
                        <h5>${category}</h5>
                        <div class="tech-items">
                            ${items.split(',').map(item => `
                                <span class="tech-item">${item.trim()}</span>
                            `).join('')}
                        </div>
                    </div>
                `;
            }
        });
        
        return html;
    }

    function exportToPDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');
        
        // Get the content to export
        const element = document.getElementById('result-content');
        
        // Use html2canvas to convert the element to a canvas
        html2canvas(element).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 295; // A4 height in mm
            const imgHeight = canvas.height * imgWidth / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;
            
            // Add image to PDF
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            
            // Add new pages if content doesn't fit on one page
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                doc.addPage();
                doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            
            // Save the PDF
            doc.save('HackVault_Project.pdf');
        });
    }

    function showSaveNotification() {
        const notification = document.createElement('div');
        notification.classList.add('save-notification');
        notification.innerHTML = `<i class="fas fa-check-circle"></i> Progress saved to browser storage`;
        document.body.appendChild(notification);
        
        // Remove notification after animation completes
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 2500);
    }

    function showSavedResult(result) {
        // Create a "restore previous" button
        const restoreBtn = document.createElement('div');
        restoreBtn.classList.add('restore-session');
        restoreBtn.innerHTML = `
            <div class="restore-notification">
                <p>You have a saved project idea. Would you like to restore it?</p>
                <div class="restore-actions">
                    <button id="restore-btn" class="btn">Restore</button>
                    <button id="discard-btn" class="btn">Discard</button>
                </div>
            </div>
        `;
        document.body.appendChild(restoreBtn);
        
        // Style the restore notification
        const style = document.createElement('style');
        style.textContent = `
            .restore-session {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
                animation: fadeIn 0.5s ease;
            }
            .restore-notification {
                background-color: white;
                padding: 1rem;
                border-radius: var(--border-radius);
                box-shadow: var(--box-shadow);
                border-left: 4px solid var(--primary-color);
            }
            .restore-notification p {
                margin-bottom: 0.8rem;
            }
            .restore-actions {
                display: flex;
                gap: 0.5rem;
            }
            .restore-actions .btn {
                padding: 0.5rem 1rem;
                font-size: 0.9rem;
            }
            #restore-btn {
                background-color: var(--primary-color);
                color: white;
            }
            #discard-btn {
                background-color: var(--bg-light);
                color: var(--text-dark);
            }
        `;
        document.head.appendChild(style);
        
        // Add event listeners
        document.getElementById('restore-btn').addEventListener('click', () => {
            displayResult(result);
            resultSection.style.display = 'block';
            resultSection.scrollIntoView({ behavior: 'smooth' });
            restoreBtn.remove();
        });
        
        document.getElementById('discard-btn').addEventListener('click', () => {
            localStorage.removeItem('hackvault_result');
            restoreBtn.remove();
        });
    }

    // Helper functions to simulate backend responses
    function getRandomProjectForDomain(domain) {
        const projects = {
            'Health': [
                { title: 'Health Monitoring System', description: 'A wearable device and app that tracks vital signs and alerts emergency contacts during health emergencies.' },
                { title: 'MedReminder', description: 'An app that reminds users to take medications and tracks adherence to medication schedules.' },
                { title: 'Virtual Health Assistant', description: 'An AI-powered chatbot that provides preliminary health assessments and directs users to appropriate care.' }
            ],
            'Education': [
                { title: 'Interactive Learning Platform', description: 'A platform using AR/VR to create immersive educational experiences for various subjects.' },
                { title: 'Study Group Matcher', description: 'An app that connects students studying similar subjects to form effective study groups.' },
                { title: 'Personalized Learning Path', description: 'An AI system that creates customized learning paths based on student strengths and weaknesses.' }
            ],
            'Fintech': [
                { title: 'Budget Optimizer', description: 'An app that analyzes spending habits and suggests personalized budget plans.' },
                { title: 'Peer-to-Peer Lending Platform', description: 'A secure platform connecting individual lenders with borrowers, bypassing traditional banking.' },
                { title: 'Investment Portfolio Simulator', description: 'A risk-free environment for learning investment strategies with virtual money.' }
            ],
            'Environment': [
                { title: 'Carbon Footprint Tracker', description: 'An app that calculates and tracks personal or organizational carbon footprints.' },
                { title: 'Waste Management Optimizer', description: 'A system for optimizing waste collection routes and improving recycling rates.' },
                { title: 'Sustainable Shopping Guide', description: 'An app that rates products based on environmental impact and suggests eco-friendly alternatives.' }
            ],
            'Social': [
                { title: 'Volunteer Match', description: 'A platform connecting volunteers with organizations based on skills and interests.' },
                { title: 'Community Resource Finder', description: 'An app locating and providing information about community resources like food banks and shelters.' },
                { title: 'Crisis Response Coordinator', description: 'A system for coordinating response efforts during natural disasters or other crises.' }
            ]
        };
        
        const domainProjects = projects[domain] || [];
        const randomIndex = Math.floor(Math.random() * domainProjects.length);
        return domainProjects[randomIndex];
    }

    function getTechStackForDomain(domain) {
        const techStacks = {
            'Health': 'Frontend: React, Flutter\nBackend: Node.js, Python (Django)\nDatabase: MongoDB\nCloud: AWS\nAdditional: FHIR API, HealthKit integration',
            'Education': 'Frontend: React, Vue.js\nBackend: Node.js, Ruby on Rails\nDatabase: PostgreSQL\nCloud: Google Cloud\nAdditional: WebRTC, Canvas API',
            'Fintech': 'Frontend: React, Angular\nBackend: Node.js, Java Spring\nDatabase: MySQL, Redis\nCloud: AWS\nAdditional: Stripe API, Plaid integration',
            'Environment': 'Frontend: React, Svelte\nBackend: Python (Flask), Node.js\nDatabase: PostgreSQL, TimescaleDB\nCloud: Google Cloud\nAdditional: Google Maps API, IoT integration',
            'Social': 'Frontend: React, Vue.js\nBackend: Node.js, PHP Laravel\nDatabase: MongoDB, Neo4j\nCloud: AWS\nAdditional: OAuth, WebSockets'
        };
        
        return techStacks[domain] || '';
    }
}); 