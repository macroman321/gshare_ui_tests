#
# FILE NAME: mining.feature
# DESCRIPTION:  mining FEATURE
# AUTHOR: Dimitrije Dragasevic (DD)
# CREATED: 20-Apr-18
# NOTES:
#


Feature: Mining

  Background:
    Given I log in as user "qa_user_5"

  Scenario: Verify that start mining works correctly when machine is connected to the power

    When I click on the Start button
    Then I should see the application has started to successfully work


  Scenario: Verify that the machine will stop mining after i click on the pause button
    When I click on the Start button
    And I click on the Stop button
    Then I should see that the application has stopped mining


  @manual
  Scenario: Verify that it is not possible to start mining when machine is not connected to the power

    When I disconnect the machine from the power
    Then I should see the Start button becomes disabled
    And I should see the message that some features are unavailable

  @manual
  Scenario: Verify that mining is stopped if machine is disconnected while mining

    When I click on the Start button
    Then I should see the application has started to successfully work
    When I disconnect the machine from the power
    And I should see that the GShare app has stopped mining
    When I open the console of the application
    Then I should see the message miner has exited with code null

