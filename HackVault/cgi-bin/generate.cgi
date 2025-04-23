#!/usr/bin/env cplusplus

#include <iostream>
#include <string>
#include <map>
#include <vector>
#include <cstdlib>
#include <ctime>
#include <mysql/mysql.h>
#include <json/json.h> // Using jsoncpp
#include <cgicc/Cgicc.h>
#include <cgicc/HTTPHTMLHeader.h>
#include <cgicc/HTMLClasses.h>

using namespace std;
using namespace cgicc;

// Database connection settings
const string DB_HOST = "localhost";
const string DB_USER = "root";  // Replace with your MySQL username
const string DB_PASS = "";      // Replace with your MySQL password
const string DB_NAME = "hackvault";

// Structure to hold project idea
struct ProjectIdea {
    int id;
    string title;
    string description;
    string domain;
};

// Structure to hold team member
struct TeamMember {
    string name;
    string role;
};

// Function to connect to MySQL database
MYSQL* connectToDatabase() {
    MYSQL* conn = mysql_init(NULL);
    
    if (conn == NULL) {
        cerr << "Error initializing MySQL connection: " << mysql_error(conn) << endl;
        return NULL;
    }
    
    if (!mysql_real_connect(conn, DB_HOST.c_str(), DB_USER.c_str(), DB_PASS.c_str(), 
                          DB_NAME.c_str(), 0, NULL, 0)) {
        cerr << "Error connecting to MySQL database: " << mysql_error(conn) << endl;
        mysql_close(conn);
        return NULL;
    }
    
    return conn;
}

// Function to get a random project idea for the selected domain
ProjectIdea getRandomProjectIdea(MYSQL* conn, const string& domain) {
    ProjectIdea idea;
    idea.id = 0; // Default value if no idea is found
    
    if (conn == NULL) {
        return idea;
    }
    
    // Prepare query to get random project idea for the selected domain
    string query = "SELECT id, title, description, domain FROM ideas WHERE domain = '" + 
                   domain + "' ORDER BY RAND() LIMIT 1";
    
    if (mysql_query(conn, query.c_str())) {
        cerr << "Error executing MySQL query: " << mysql_error(conn) << endl;
        return idea;
    }
    
    MYSQL_RES* result = mysql_store_result(conn);
    if (result == NULL) {
        cerr << "Error getting MySQL result: " << mysql_error(conn) << endl;
        return idea;
    }
    
    MYSQL_ROW row = mysql_fetch_row(result);
    if (row) {
        idea.id = atoi(row[0]);
        idea.title = row[1] ? row[1] : "";
        idea.description = row[2] ? row[2] : "";
        idea.domain = row[3] ? row[3] : "";
    }
    
    mysql_free_result(result);
    return idea;
}

// Function to get tech stack for the selected domain
string getTechStack(MYSQL* conn, const string& domain) {
    string techStack = "";
    
    if (conn == NULL) {
        return techStack;
    }
    
    // Prepare query to get tech stack for the selected domain
    string query = "SELECT tech_stack FROM domain_tech WHERE domain = '" + domain + "' LIMIT 1";
    
    if (mysql_query(conn, query.c_str())) {
        cerr << "Error executing MySQL query: " << mysql_error(conn) << endl;
        return techStack;
    }
    
    MYSQL_RES* result = mysql_store_result(conn);
    if (result == NULL) {
        cerr << "Error getting MySQL result: " << mysql_error(conn) << endl;
        return techStack;
    }
    
    MYSQL_ROW row = mysql_fetch_row(result);
    if (row && row[0]) {
        techStack = row[0];
    }
    
    mysql_free_result(result);
    return techStack;
}
// Function to parse team members from JSON string
vector<TeamMember> parseTeamMembers(const string& teamJson) {
    vector<TeamMember> teamMembers;
    
    Json::Value root;
    Json::Reader reader;
    
    bool parseSuccess = reader.parse(teamJson, root);
    if (!parseSuccess) {
        cerr << "Error parsing team JSON: " << reader.getFormattedErrorMessages() << endl;
        return teamMembers;
    }
    
    if (root.isArray()) {
        for (unsigned int i = 0; i < root.size(); i++) {
            if (root[i].isMember("name") && root[i].isMember("role")) {
                TeamMember member;
                member.name = root[i]["name"].asString();
                member.role = root[i]["role"].asString();
                teamMembers.push_back(member);
            }
        }
    }
    
    return teamMembers;
}

// Function to generate JSON response
string generateJsonResponse(const ProjectIdea& idea, const vector<TeamMember>& team, const string& techStack) {
    Json::Value response;
    
    // Add project idea information
    response["domain"] = idea.domain;
    response["project"]["id"] = idea.id;
    response["project"]["title"] = idea.title;
    response["project"]["description"] = idea.description;
    
    // Add team members
    Json::Value teamArray(Json::arrayValue);
    for (const auto& member : team) {
        Json::Value memberObj;
        memberObj["name"] = member.name;
        memberObj["role"] = member.role;
        teamArray.append(memberObj);
    }
    response["team"] = teamArray;
    
    // Add tech stack
    response["techStack"] = techStack;
    
    // Convert JSON to string
    Json::FastWriter writer;
    return writer.write(response);
}

int main() {
    try {
        // Initialize random seed
        srand(time(NULL));
        
        // Create CGI object
        Cgicc cgi;
        
        // Get form data
        string domain = "";
        string teamJson = "";
        
        // Check if this is a GET or POST request
        const_form_iterator domain_it = cgi.getElement("domain");
        if (domain_it != cgi.getElements().end()) {
            domain = **domain_it;
        }
        
        const_form_iterator team_it = cgi.getElement("team");
        if (team_it != cgi.getElements().end()) {
            teamJson = **team_it;
        }
        
        // Connect to database
        MYSQL* conn = connectToDatabase();
        
        // Get random project idea
        ProjectIdea idea = getRandomProjectIdea(conn, domain);
        
        // Get tech stack for domain
        string techStack = getTechStack(conn, domain);
        
        // Parse team members
        vector<TeamMember> teamMembers = parseTeamMembers(teamJson);
        
        // Generate JSON response
        string jsonResponse = generateJsonResponse(idea, teamMembers, techStack);
        
        // Close database connection
        if (conn != NULL) {
            mysql_close(conn);
        }
        
        // Set content type to JSON
        cout << "Content-Type: application/json\r\n\r\n";
        // Output JSON response
        cout << jsonResponse;
    } 
    catch(exception& e) {
        // Handle exceptions
        cout << "Content-Type: application/json\r\n\r\n";
        cout << "{\"error\": \"An error occurred: " << e.what() << "\"}";
    }
    
    return 0;
} 