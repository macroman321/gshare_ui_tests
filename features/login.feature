#
# FILE NAME: login.feature
# DESCRIPTION: Verify CMAPP login
# AUTHOR: Dragan Nikolic (DN)
# CREATED: 12-Mar-18
# NOTES:
#
Feature: GameClient Login
  Scenario: Login
    When I enter credentials for the user "qa_user_5"
    Then I should see the user is logged in
