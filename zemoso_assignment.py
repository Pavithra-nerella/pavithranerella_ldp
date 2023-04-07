locations = {
    "Hyderabad": ["Software", "Data Analysis", "Business Analyst"],
    "Chennai": ["DevOps", "Software", "Web developer"],
    "Banglore": ["Big Data Engineer", "Business Analyst", "Full Stack Developer"],
    "Pune": ["Cloud Architect", "Data Analyst", "Block chain Engineer"],
}
preferences = input("Enter your preferred locations: ")
preferences = preferences.split(", ")
matches = []
for preference in preferences:
    if preference in locations:
        for job_role in locations[preference]:
            matches.append(job_role)
if len(matches) > 0:
    print("Your preferred job roles are:")
    for match in matches:
        print(match)
else:
    print("Sorry, no job roles match your preferences. Better luck next time.")