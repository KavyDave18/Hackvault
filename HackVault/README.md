# HackVault - Hackathon Project & Team Idea Generator

HackVault is a web-based application that helps students generate project ideas for hackathons, organize team members with roles, and suggest appropriate tech stacks based on the selected domain.

## Features

- 🎯 Select from various domains (Health, Education, Fintech, Environment, Social)
- 💡 Generate random project ideas from a database
- 👥 Add team members and assign them roles
- 🛠️ Display suggested tech stacks for the selected domain
- 📄 Export the final result as a downloadable PDF
- 💾 Automatic saving of results (localStorage) to prevent data loss

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: C++ CGI scripts
- **Database**: MySQL
- **Libraries**: jsPDF, html2canvas, Font Awesome

## Prerequisites

- Web server with CGI support (XAMPP, MAMP, Apache)
- MySQL server
- C++ compiler (g++)
- Required C++ libraries:
  - MySQL Connector for C++
  - JsonCpp
  - GNU cgicc

## Setup Instructions

### 1. Database Setup

1. Start your MySQL server
2. Create the database and tables using the included SQL script:

```bash
mysql -u root -p < setup.sql
```

### 2. C++ CGI Script Setup

1. Install the required C++ libraries:

```bash
# For Debian/Ubuntu
sudo apt-get install libmysqlclient-dev libjsoncpp-dev libcgicc-dev

# For macOS with Homebrew
brew install mysql-client jsoncpp cgicc
```

2. Compile the CGI script:

```bash
g++ -o cgi-bin/generate.cgi generate.cgi -lcgicc -ljsoncpp -lmysqlclient
```

3. Ensure the CGI script has execution permissions:

```bash
chmod +x cgi-bin/generate.cgi
```

### 3. Web Server Setup

#### Using XAMPP/MAMP:

1. Copy all frontend files (HTML, CSS, JS) to the htdocs directory
2. Copy the compiled CGI script to the cgi-bin directory
3. Ensure CGI execution is enabled in your server configuration

#### Using Apache:

1. Copy all files to your web server directory (e.g., /var/www/html/)
2. Configure Apache to allow CGI execution:

```apache
<Directory /var/www/html/cgi-bin>
    Options +ExecCGI
    AddHandler cgi-script .cgi
</Directory>
```

3. Restart Apache:

```bash
sudo service apache2 restart
```

## Project Structure

```
hackvault/
├── index.html          # Main page HTML
├── style.css           # CSS styles
├── script.js           # Frontend JavaScript
├── generate.cgi        # C++ CGI script (source)
├── cgi-bin/            # Directory for compiled CGI script
│   └── generate.cgi    # Compiled CGI script
├── setup.sql           # Database setup script
└── README.md           # This file
```

## Usage

1. Open the application in your web browser (e.g., http://localhost/)
2. Select a domain for your project
3. Add team members and assign them roles
4. Click "Generate Idea" to get a random project idea with tech stack
5. Export the result as PDF if needed

## Customization

- To add more project ideas or domains, modify the `setup.sql` file and re-run it
- Customize the UI by modifying the CSS in `style.css`
- Extend functionality by updating the JavaScript in `script.js`

## Troubleshooting

- **CGI Script Not Executing**: Ensure the script has proper execute permissions and CGI is enabled in your web server
- **Database Connection Issues**: Check your MySQL credentials in the CGI script and make sure MySQL server is running
- **Missing C++ Libraries**: Verify all required C++ libraries are installed correctly

## License

This project is available for educational purposes. 