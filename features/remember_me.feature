#
# FILE NAME: remember_me.feature
# DESCRIPTION: remember_me FEATURE
# AUTHOR: Milan Šubarević (MŠ)
# CREATED: 12-Mar-18
# NOTES:
#

Feature: Remember Me feature

  Background:
    Given I open the application

  Scenario:
    When I click on the Remember me checkbox
    And I enter my email, password and press the Log In button
    Then I should see that I have been successfully logged in
    When I press the Quit button
    And I open the application
    Then I should see that I have been successfully logged in