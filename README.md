🚀 HackVault – Your Hackathon Idea & Team Generator
HackVault is a powerful C++ CGI-based web app that helps developers generate unique hackathon project ideas, build efficient teams, assign tech stacks, and export everything in one go. It’s your all-in-one hackathon brainstorming partner!

🌟 Features
🎯 Domain Selection – Choose your preferred hackathon domain (e.g., Health, Education, Finance).

💡 Random Idea Generator – Get random yet relevant project ideas stored in a MySQL database.

👥 Team Builder – Add team members, assign their roles and responsibilities smartly.

🛠️ Tech Stack Suggestions – Based on project idea and domain, get suitable tech stack recommendations.

📄 Export to PDF – Download your final team and idea in PDF format for easy sharing or submission.

🧱 Tech Stack
Frontend: HTML5, CSS3, JavaScript

Backend: C++ with Common Gateway Interface (CGI)

Database: MySQL

PDF Export: HTML-to-PDF converter (e.g., wkhtmltopdf or similar)

Web Server: MAMP / Apache with CGI enabled

📁 Project Structure
python
Copy
Edit
HackVault/
├── htdocs/                  # Frontend files (HTML, CSS, JS)
│   ├── index.html
│   ├── team_builder.html
│   ├── style.css
│   └── ...
├── cgi-bin/                 # Backend CGI scripts written in C++
│   ├── generate_idea.cgi
│   ├── team_builder.cgi
│   └── ...
├── db/                      # SQL database schema and data
│   └── hackvault.sql
├── assets/                  # Images, icons, fonts
│   └── logo.png
└── README.md                # Project documentation
🛠️ Setup Instructions
1. Prerequisites
MAMP or XAMPP with CGI support

C++ compiler (like g++)

MySQL server

PDF converter (optional)

2. Clone the Repo
bash
Copy
Edit
git clone https://github.com/your-username/HackVault.git
3. Set Up the Database
Import the hackvault.sql file into your MySQL server.

sql
Copy
Edit
mysql -u root -p < db/hackvault.sql
4. Configure CGI Scripts
Place all .cgi files in your server's cgi-bin directory.

Ensure proper execution permissions:

bash
Copy
Edit
chmod +x *.cgi
Update database credentials in your C++ source code.

5. Run the Project
Start your Apache/MAMP server.

Open localhost/HackVault/htdocs/index.html in your browser.

📸 Screenshots
🚀 HackVault – Your Hackathon Idea & Team Generator
HackVault is a powerful C++ CGI-based web app that helps developers generate unique hackathon project ideas, build efficient teams, assign tech stacks, and export everything in one go. It’s your all-in-one hackathon brainstorming partner!

🌟 Features
🎯 Domain Selection – Choose your preferred hackathon domain (e.g., Health, Education, Finance).

💡 Random Idea Generator – Get random yet relevant project ideas stored in a MySQL database.

👥 Team Builder – Add team members, assign their roles and responsibilities smartly.

🛠️ Tech Stack Suggestions – Based on project idea and domain, get suitable tech stack recommendations.

📄 Export to PDF – Download your final team and idea in PDF format for easy sharing or submission.

🧱 Tech Stack
Frontend: HTML5, CSS3, JavaScript

Backend: C++ with Common Gateway Interface (CGI)

Database: MySQL

PDF Export: HTML-to-PDF converter (e.g., wkhtmltopdf or similar)

Web Server: MAMP / Apache with CGI enabled

📁 Project Structure
python
Copy
Edit
HackVault/
├── htdocs/                  # Frontend files (HTML, CSS, JS)
│   ├── index.html
│   ├── team_builder.html
│   ├── style.css
│   └── ...
├── cgi-bin/                 # Backend CGI scripts written in C++
│   ├── generate_idea.cgi
│   ├── team_builder.cgi
│   └── ...
├── db/                      # SQL database schema and data
│   └── hackvault.sql
├── assets/                  # Images, icons, fonts
│   └── logo.png
└── README.md                # Project documentation
🛠️ Setup Instructions
1. Prerequisites
MAMP or XAMPP with CGI support

C++ compiler (like g++)

MySQL server

PDF converter (optional)

2. Clone the Repo
bash
Copy
Edit
git clone https://github.com/your-username/HackVault.git
3. Set Up the Database
Import the hackvault.sql file into your MySQL server.

sql
Copy
Edit
mysql -u root -p < db/hackvault.sql
4. Configure CGI Scripts
Place all .cgi files in your server's cgi-bin directory.

Ensure proper execution permissions:

bash
Copy
Edit
chmod +x *.cgi
Update database credentials in your C++ source code.

5. Run the Project
Start your Apache/MAMP server.

Open localhost/HackVault/htdocs/index.html in your browser.

📸 Screenshots
<img width="1680" alt="Screenshot 2025-04-30 at 11 10 06 PM" src="https://github.com/user-attachments/assets/85c32725-cf60-414f-a991-ba1ed0446407" />
<img width="1680" alt="Screenshot 2025-04-30 at 11 10 55 PM" src="https://github.com/user-attachments/assets/cd62fc2c-a64d-4090-b7d2-4be6b38ca6a3" />
<img width="1680" alt="Screenshot 2025-04-30 at 11 11 03 PM" src="https://github.com/user-attachments/assets/c0ea5d76-c1a4-4e72-8d22-a61a4ecdbc20" />
<img width="1680" alt="Screenshot 2025-04-30 at 11 11 09 PM" src="https://github.com/user-attachments/assets/4414dee4-a99b-4410-8038-965ac33435c2" />


🤝 Contributing
We welcome contributions! Please fork the repository and create a pull request with meaningful changes.

💬 Contact
Made with ❤️ by Kavy Dave
Email: kavydave4922@gmail.com
GitHub: @your-username

