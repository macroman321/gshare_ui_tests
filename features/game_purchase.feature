#
# FILE NAME: game_purchase.feature
# DESCRIPTION: Verify game purchase
# AUTHOR: Danilo Cupic (DC)
# CREATED: 13-Apr-18
# NOTES:
#

Feature: GameClient Login
  Background:
    Given I start GameClient
    When I enter credentials for the user "qa_user_5"
    Then I should see the user is logged in

Scenario: Buy Games Test
    When I click on My Games
    And I click on Store
    And I click on a game that I want to buy
    And I click on Buy button
    And I click on button Go to My Games
    Then I should see the game in the list of bought games