Feature: Resume Builder Home Page

    I want enter to Resume Builder home page

    Scenario: Opening a Resume Builder home page
        Given I open "https://local-resume.vercel.app/"
        Then Should has text "Resume Builder"