Feature: Resume Builder Home Page

    I want enter to Resume Builder home page

    Scenario: Opening a Resume Builder home page
        Given I open "https://local-resume.vercel.app/"
        Then Should has text "Resume Builder"

    Scenario: Can upload json
        Given I open "http://localhost:5173"
        Then I upload resume file "example.json"
        Then I should see the correct content in preview
        Then I should see the correct content in info

    Scenario: Can create from scratch
        Given I open "http://localhost:5173"
        Then I fill data on info
        Then I fill data on contact
        Then I fill data on other sections
        Then I should see the correct content in preview

    Scenario: Can see stored resume
        Given I open "http://localhost:5173" with resumes
        Then I should see the correct content in preview
        Then I select resume "localstorage1"
        Then Should has text "Jane Doe"
        Then I select resume "localstorage2"
        Then Should has text "Mock User"

    Scenario: Can copy from existing resumes
        Given I open "http://localhost:5173" with resumes
        Then I clone resume with name "newresume"
        Then I select resume "newresume"
        Then I should see the correct content in preview

# save -> data should be stored after save
# Export
# Print
# Add New Resume