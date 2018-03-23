Feature: GameClient Login
  Scenario: Login
    When I enter credentials for the user "qa_user_5"
    Then I should see the user is logged in
