#
# FILE NAME: claim_reward.feature
# DESCRIPTION: claim_reward FEATURE
# AUTHOR: Dimitrije Dragasevic (DD)
# CREATED: 20-Apr-18
# NOTES:
#

Feature: Claim Reward

  Background:
    Given I log in as user "qa_user_5"

  Scenario: Claim reward
    When If there is a claimable balance I should be able to claim it
    Then I should see my current balance increase

  Scenario: Verify that claim is disabled if reward balance is below the reward threshold
    When the balance is below the required threshold
    Then I will not be able to claim it

  @manual
  Scenario: Verify the claim if reward balance is above the reward threshold
    When the reward balance become bigger then the reward threshold
    Then the Claim should be enabled
    When I claim the reward
    Then I should see the message "your message was successfully claimed ... it takes about 10 min to calculate the reward"
    And my balance should increase for the reward balance
    And my reward balance should reset to zero
