# FILE NAME: my_games.feature
# DESCRIPTION: my_games FEATURE
# AUTHOR: Ivan Babić (IB)
# CREATED: 2018-Apr-10

Feature: My Games

  @all
  Scenario: No purchased games
    When I log in as user "qa_user_4"
    And I click on the My Games tab
    Then I should see no games displayed

  @wip
  # TODO: Step 'I should see my games displayed' is not completed
  Scenario: Purchased games
    When I log in as user "qa_user_5"
    And I click on the My Games tab
    Then I should see my games displayed
