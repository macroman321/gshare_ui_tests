#
# FILE NAME: start_mining.feature
# DESCRIPTION: start mining FEATURE
# AUTHOR: Dimitrije Dragasevic (DD)
# CREATED: 20-Apr-18
# NOTES:
#


Feature: Start mining

  Background:
    Given I start GameClient
    Given I enter credentials for the user "qa_user_5"

  Scenario: Machine is connected to the power

    When I click on the Start button
    Then I should see the application has started to successfully work

  @manual
  Scenario: Machine is disconnected from the power

    When I disconnect the machine from the power
    Then I should see the Start button becomes disabled
    And I should see the message that some features are unavailable

  @manual
  Scenario: Machine is disconnected while mining

    When I click on the Start button
    Then I should see the application has started to successfully work
    When I disconnect the machine fro the power I should see the GShare stop mining