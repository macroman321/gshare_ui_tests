#
# FILE NAME: register.feature
# DESCRIPTION: register FEATURE
# AUTHOR: Milan Šubarević (MŠ)
# CREATED: 04-May-18
# NOTES:
#

Feature: Register

  @manual
  Scenario: Register
    When I am on the login page of the GShare app
    And I click on the register button
    Then I should see a new screen with email, password and repeat password fields
    When I enter a valid email into the first field
    And I enter a valid password into both the password and repeat password fields
    And I click Register
    Then I Should see a message "Verify Account" and a field for the verification code contained in the email
    When I log into my email and copy the verification code
    And I enter the code into the correct field in GShare
    Then I should see the main page of GShare