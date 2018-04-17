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

Scenario: Buy Games Test
    When I enter credentials for the user "qa_user_5"
    Then I should see the user is logged in
    When I click on My Games
    And I click on Store
    And I click on a game that I want to buy
    And I click on Buy button
    And I click on button Go to My Games
    Then I should see the game in the list of bought games

Scenario: Test Insufficient funds
    When I enter credentials for the user "qa_user_4"
    Then I should see the user is logged in
    Then I should see message that I can not purchase a Game

Scenario: Test Cancel purchase
    When I enter credentials for the user "qa_user_5"
    Then I should see the user is logged in
    And I click on a game that I want to buy
    Then I should click on Cancel button

Scenario: Test Cancel button after the game is purchased
    When I enter credentials for the user "qa_user_2"
    Then I should see the user is logged in
    And I click on a game that I want to buy
    And I click on Buy button
    Then I should avoid Go To My Games button, and click on Cancel button

@manual
  Scenario: Test valid Login with 2FA code
    When I enter a valid credentials
    And I enter a valid 2FA code
    Then I should be loged in succesfully in application   

  @manual
  Scenario: Test invalid verification code
    When I enter a valid credentials
    And I enter a wrong 2FA code
    Then I should see notification that 2FA code is wrong    