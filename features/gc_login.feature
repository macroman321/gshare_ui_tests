Feature: GameClient Login
  Scenario: Shows an inital window
    When I start GameClient
    Then I should see GameClient app open

  Scenario: Login
    When I start GameClient
    And I enter credentials for the user "qa_user_5"
    Then I should see the user is logged in
