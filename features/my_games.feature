#
# FILE NAME: my_games.feature
# DESCRIPTION: Verify CMAPP My Games page
# AUTHOR: Ivan Babic (IB)
# CREATED: 10-Apr-18
# NOTES:
#

Feature: My Games

  Scenario: My Games verification when a user has no games
    When I log in as user "qa_user_4"
    And I click on the My Games tab
    Then I should see no games displayed

  Scenario: My Games verification when a user has games
    When I log in as user "qa_user_5"
    And I click on the My Games tab
    Then I should see my games displayed
