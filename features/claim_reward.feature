Feature: Claim Reward

  Background:
    Given I log in as user "qa_user_5"

  Scenario: Claim reward
    When If there is a claimable balance I should be able to claim it
    Then I should see my current balance increase
