#
# FILE NAME: store.feature
# DESCRIPTION: store FEATURE
# AUTHOR: Danilo Čupić (DČ)
# CREATED: 13-Apr-18
# NOTES:
#

Feature: Store

  @stage_env
  Scenario: Purchase game
    When I log in as user "qa_user_1"
    And I click on My Games
    And I click on Store
    And I click on a game that I want to buy
    And I click on Buy button
    And I click on button Go to My Games
    Then I should see that My Games has increased by one game

  @stage_env
  Scenario: Insufficient funds to purchase a game
    When I log in as user "qa_user_4"
    And I position the mouse over the game I want to buy
    Then I should see message that I can not purchase a Game

  @stage_env
  Scenario: Cancel purchase
    When I log in as user "qa_user_5"
    And I click on a game that I want to buy
    And I cancel the purchase
    Then Buy a Game dialog should disappear
    And I should be back to the main page

  @stage_env
  Scenario: Cancel button after the game is purchased
    When I log in as user "qa_user_2"
    And I click on a game that I want to buy
    And I click on Buy button
    And I click on Cancel button
    Then I should see that button goToMyGames does not exist no more
