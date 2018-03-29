#
# FILE NAME: remember_me.feature
# DESCRIPTION: remember_me FEATURE
# AUTHOR: Milan Šubarević (MŠ)
# CREATED: 12-Mar-18
# NOTES:
#

Feature: Remember Me feature
  Scenario: Remember Me feature test
    When I start GameClient
    When I click on the Remember me checkbox
    And I enter credentials for the user "qa_user_5"
    Then I should see the user is logged in
    When I press the Quit button
    And I start GameClient
    Then I should see the user is logged in
    And I log out of the application
