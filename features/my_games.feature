#
# FILE NAME: my_games.feature
# DESCRIPTION: Verify CMAPP My Games page
# AUTHOR: Ivan Babic (IB)
# CREATED: 10-Apr-18
# NOTES:
#

Feature: GameClient Login
  Background:
    Given I start GameClient
    When I enter credentials for the user "qa_user_5"
    Then I should see the user is logged in

    Scenario: My Games verification
      When I click on the My Games tab
      Then I should see all my purchased games displayed