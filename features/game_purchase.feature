#
# FILE NAME: game_purchase.feature
# DESCRIPTION: Verify game purchase
# AUTHOR: Danilo Cupic (DC)
# CREATED: 13-Apr-18
# NOTES:
#

Feature: GameClient Login

  Scenario: Buy Games Test
    When I log in as user "qa_user_1"
    And I click on My Games
    And I click on Store
    And I click on a game that I want to buy
    And I click on Buy button
    And I click on button Go to My Games
    Then I should see that My Games has icreased by one game

  Scenario: Test Insufficient funds
    When I log in as user "qa_user_4"
    And I position the mouse over the game I want to buy
    Then I should see message that I can not purchase a Game

  Scenario: Test Cancel purchase
    When I log in as user "qa_user_5"
    And I click on a game that I want to buy
    And I cancel the purchase
    Then Buy a Game dialog should disappear
    And I should be back to the main page

  Scenario: Test Cancel button after the game is purchased
    When I log in as user "qa_user_2"
    And I click on a game that I want to buy
    And I click on Buy button
    And I click on Cancel button
    Then I should see that button goToMyGames does not exist no more