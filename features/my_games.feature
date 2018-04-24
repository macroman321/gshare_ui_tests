#
# FILE NAME: my_games.feature
# DESCRIPTION: Verify CMAPP My Games page
# AUTHOR: Ivan Babic (IB)
# CREATED: 10-Apr-18
# NOTES:
#

Feature: GameClient Login
  Background:
    Given I log in as user "qa_user_5"

    Scenario: My Games verification
      When I click on the My Games tab
      Then I should see all my purchased games displayed