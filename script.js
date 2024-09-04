function addWorkExperience() {
    const container = document.getElementById('workExperienceContainer');
    const itemCount = container.getElementsByClassName('work-experience-item').length + 1;

    const newExperience = document.createElement('div');
    newExperience.classList.add('work-experience-item');
    newExperience.innerHTML = `
        <label for="jobTitle${itemCount}">Job Title:</label>
        <input type="text" id="jobTitle${itemCount}" required><br>
        <label for="jobDate${itemCount}">Date:</label>
        <input type="text" id="jobDate${itemCount}" required><br>
        <label for="jobDescription${itemCount}">Description:</label>
        <textarea id="jobDescription${itemCount}" rows="3" required></textarea><br>
    `;
    container.appendChild(newExperience);
}

function addSchooling() {
    const container = document.getElementById('schoolingContainer');
    const itemCount = container.getElementsByClassName('schooling-item').length + 1;

    const newSchooling = document.createElement('div');
    newSchooling.classList.add('schooling-item');
    newSchooling.innerHTML = `
        <label for="schoolName${itemCount}">School Name:</label>
        <input type="text" id="schoolName${itemCount}" required><br>
        <label for="schoolYear${itemCount}">Year:</label>
        <input type="text" id="schoolYear${itemCount}" required><br>
    `;
    container.appendChild(newSchooling);
}

function addSkill() {
    const container = document.getElementById('skillsContainer');
    const skillCount = container.getElementsByClassName('skill-item').length + 1;

    const newSkill = document.createElement('div');
    newSkill.classList.add('skill-item');
    newSkill.innerHTML = `
        <label for="skill${skillCount}">Skill:</label>
        <input type="text" id="skill${skillCount}" required><br>
        <label for="skillLevel${skillCount}">Proficiency (%):</label>
        <input type="number" id="skillLevel${skillCount}" min="0" max="100" required><br>
    `;
    container.appendChild(newSkill);
}

function addProject() {
    const container = document.getElementById('projectsContainer');
    const projectCount = container.getElementsByClassName('project-item').length + 1;

    const newProject = document.createElement('div');
    newProject.classList.add('project-item');
    newProject.innerHTML = `
        <label for="projectTitle${projectCount}">Project Title:</label>
        <input type="text" id="projectTitle${projectCount}" required><br>
        <label for="projectDescription${projectCount}">Description:</label>
        <textarea id="projectDescription${projectCount}" rows="3" required></textarea><br>
    `;
    container.appendChild(newProject);
}

function generateResume() {
    // Personal Information
    document.getElementById('resumeName').innerText = document.getElementById('name').value;
    document.getElementById('resumeTitle').innerText = document.getElementById('title').value;
    document.getElementById('resumeSummary').innerText = document.getElementById('summary').value;
    document.getElementById('resumeEmail').innerText = document.getElementById('email').value;

    const linkedInLink = document.getElementById('resumeLinkedIn');
    linkedInLink.href = document.getElementById('linkedin').value;
    linkedInLink.innerText = document.getElementById('linkedin').value;

    const githubLink = document.getElementById('resumeGitHub');
    githubLink.href = document.getElementById('github').value;
    githubLink.innerText = document.getElementById('github').value;

    // Work Experience
    const workExperienceContainer = document.getElementById('resumeWorkExperience');
    workExperienceContainer.innerHTML = ''; // Clear previous entries

    const workItems = document.getElementsByClassName('work-experience-item');
    for (let i = 0; i < workItems.length; i++) {
        const jobTitle = workItems[i].querySelector(`#jobTitle${i + 1}`).value;
        const jobDate = workItems[i].querySelector(`#jobDate${i + 1}`).value;
        const jobDescription = workItems[i].querySelector(`#jobDescription${i + 1}`).value;

        const workItem = document.createElement('div');
        workItem.classList.add('timeline-item');
        workItem.innerHTML = `
            <h3>${jobTitle}</h3>
            <span class="date">${jobDate}</span>
            <p>${jobDescription}</p>
        `;
        workExperienceContainer.appendChild(workItem);
    }

    // Education (Higher Degree)
    document.getElementById('resumeEducation').innerText = document.getElementById('education').value;

    // Schooling
    const schoolingContainer = document.getElementById('resumeSchooling');
    schoolingContainer.innerHTML = ''; // Clear previous entries

    const schoolingItems = document.getElementsByClassName('schooling-item');
    for (let i = 0; i < schoolingItems.length; i++) {
        const schoolName = schoolingItems[i].querySelector(`#schoolName${i + 1}`).value;
        const schoolYear = schoolingItems[i].querySelector(`#schoolYear${i + 1}`).value;

        const schoolingItem = document.createElement('div');
        schoolingItem.classList.add('schooling-entry');
        schoolingItem.innerHTML = `
            <h3>${schoolName}</h3>
            <span class="date">${schoolYear}</span>
        `;
        schoolingContainer.appendChild(schoolingItem);
    }

    // Skills
    const skillsContainer = document.getElementById('resumeSkills');
    skillsContainer.innerHTML = ''; // Clear previous entries

    const skillItems = document.getElementsByClassName('skill-item');
    for (let i = 0; i < skillItems.length; i++) {
        const skill = skillItems[i].querySelector(`#skill${i + 1}`).value;
        const skillLevel = skillItems[i].querySelector(`#skillLevel${i + 1}`).value;

        const skillItem = document.createElement('div');
        skillItem.classList.add('skill');
        skillItem.innerHTML = `
            <span>${skill}</span>
            <div class="progress-bar">
                <div class="progress" style="width: ${skillLevel}%;"></div>
            </div>
        `;
        skillsContainer.appendChild(skillItem);
    }

    // Projects
    const projectsContainer = document.getElementById('resumeProjects');
    projectsContainer.innerHTML = ''; // Clear previous entries

    const projectItems = document.getElementsByClassName('project-item');
    for (let i = 0; i < projectItems.length; i++) {
        const projectTitle = projectItems[i].querySelector(`#projectTitle${i + 1}`).value;
        const projectDescription = projectItems[i].querySelector(`#projectDescription${i + 1}`).value;

        const projectItem = document.createElement('div');
        projectItem.classList.add('project-entry');
        projectItem.innerHTML = `
            <h3>${projectTitle}</h3>
            <p>${projectDescription}</p>
        `;
        projectsContainer.appendChild(projectItem);
    }

    // Display the resume
    document.getElementById('resume').style.display = 'block';
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Combine Name and Title
    const fullName = document.getElementById('resumeName').textContent;
    const jobTitle = document.getElementById('resumeTitle').textContent;
    const combinedHeader = `${fullName}  ${jobTitle}`;

    // Center combined name and title at the top of the PDF
    doc.setFontSize(20);
    doc.text(combinedHeader, doc.internal.pageSize.getWidth() / 2, 30, { align: 'center' });

    // Add a horizontal line after the heading
    doc.line(10, 35, doc.internal.pageSize.getWidth() - 10, 35);

    // Professional Summary Section
    doc.setFontSize(12);
    doc.text('Professional Summary', 10, 45);
    doc.text(document.getElementById('resumeSummary').textContent, 10, 55, { maxWidth: 180 });

    // Add a horizontal line after Professional Summary
    doc.line(10, 65, doc.internal.pageSize.getWidth() - 10, 65);

    // Contact Information
    doc.text('Contact Information', 10, 75);
    doc.text('Email: ' + document.getElementById('resumeEmail').textContent, 10, 85);
    doc.text('LinkedIn: ' + document.getElementById('resumeLinkedIn').textContent, 10, 95);
    doc.text('GitHub: ' + document.getElementById('resumeGitHub').textContent, 10, 105);

    // Add a horizontal line after Contact Information
    doc.line(10, 115, doc.internal.pageSize.getWidth() - 10, 115);

    // Work Experience Section
    let yOffset = 125;
    doc.text('Work Experience', 10, yOffset);
    const workItems = document.querySelectorAll('#resumeWorkExperience .timeline-item');
    yOffset += 10;
    workItems.forEach(item => {
        const jobTitle = item.querySelector('h3').textContent;
        const jobDate = item.querySelector('.date').textContent;
        const jobDescription = item.querySelector('p').textContent;

        doc.text(jobTitle, 10, yOffset);
        doc.text(jobDate, 150, yOffset);
        yOffset += 10;
        doc.text(jobDescription, 10, yOffset, { maxWidth: 180 });
        yOffset += 20;
    });

    // Add a horizontal line after Work Experience
    doc.line(10, yOffset - 5, doc.internal.pageSize.getWidth() - 10, yOffset - 5);

    // Education Section
    yOffset += 10;
    doc.text('Education', 10, yOffset);
    doc.text(document.getElementById('resumeEducation').textContent, 10, yOffset + 10, { maxWidth: 180 });

    // Add a horizontal line after Education
    doc.line(10, yOffset + 20, doc.internal.pageSize.getWidth() - 10, yOffset + 20);

    // Schooling Section
    yOffset += 30;
    doc.text('Schooling', 10, yOffset);
    const schoolingItems = document.querySelectorAll('#resumeSchooling .schooling-entry');
    yOffset += 10;
    schoolingItems.forEach(item => {
        const schoolName = item.querySelector('h3').textContent;
        const schoolYear = item.querySelector('.date').textContent;

        doc.text(schoolName, 10, yOffset);
        doc.text(schoolYear, 150, yOffset);
        yOffset += 10;
    });

    // Add a horizontal line after Schooling
    doc.line(10, yOffset + 5, doc.internal.pageSize.getWidth() - 10, yOffset + 5);

    // Skills Section
    yOffset += 15;
    doc.text('Skills', 10, yOffset);
    const skillItems = document.querySelectorAll('#resumeSkills .skill');
    yOffset += 10;
    skillItems.forEach(item => {
        const skill = item.querySelector('span').textContent;
        doc.text(skill, 10, yOffset);
        yOffset += 10;
    });

    // Add a horizontal line after Skills
    doc.line(10, yOffset + 5, doc.internal.pageSize.getWidth() - 10, yOffset + 5);

    // Projects Section
    yOffset += 15;
    doc.text('Projects', 10, yOffset);
    const projectItems = document.querySelectorAll('#resumeProjects .project-entry');
    yOffset += 10;
    projectItems.forEach(item => {
        const projectTitle = item.querySelector('h3').textContent;
        const projectDescription = item.querySelector('p').textContent;

        doc.text(projectTitle, 10, yOffset);
        yOffset += 10;
        doc.text(projectDescription, 10, yOffset, { maxWidth: 180 });
        yOffset += 20;
    });

    // Save the PDF
    doc.save('resume.pdf');
}
