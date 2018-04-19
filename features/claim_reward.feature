Feature: Claim Reward

  Background:
    Given I start GameClient

  Scenario: Claim reward
    When I enter credentials for the user "qa_user_3"
    Then I should see the user is logged in
    And  If there is a claimable balance I should be able to claim it
    Then I should see my current balance increase
