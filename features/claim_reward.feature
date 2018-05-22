#
# FILE NAME: claim_reward.feature
# DESCRIPTION: claim_reward FEATURE
# AUTHOR: Dimitrije Dragašević (DD)
# CREATED: 20-Apr-18
# NOTES:
#

#TODO: This needs overhauling

Feature: Claim Reward

  Background:
    Given I log in as user "qa_user_5"

  @stage
  Scenario: Claim reward
    When If there is a claimable balance I should be able to claim it
    Then I should see my current balance increase

  @stage
  Scenario: Verify that claim is disabled if reward balance is below the reward threshold
    When The balance is below the required threshold
    Then I will not be able to claim it

  @manual
  Scenario: Verify the claim if reward balance is above the reward threshold
    When The reward balance become bigger then the reward threshold
    Then The Claim should be enabled
    When I claim the reward
    Then I should see the message "Working... It takes about 10 minutes to calculate the reward"
    And My balance should increase for the reward balance
    And My reward balance should reset to zero
