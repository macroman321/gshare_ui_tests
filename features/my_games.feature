#
# FILE NAME: my_games.feature
# DESCRIPTION: my_games FEATURE
# AUTHOR: Ivan Babić (IB)
# CREATED: 10-Apr-18
# NOTES:
#

Feature: My Games

  Scenario: No purchased games
    When I log in as user "qa_user_4"
    And I click on the My Games tab
    Then I should see no games displayed

  Scenario: Purchased games
    When I log in as user "qa_user_5"
    And I click on the My Games tab
    Then I should see my games displayed
