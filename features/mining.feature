#
# FILE NAME: start_mining.feature
# DESCRIPTION:  start_mining FEATURE
# AUTHOR: Dimitrije Dragašević (DD)
# CREATED: 20-Apr-18
# NOTES:
#

Feature: Mining

  Background:
    Given I log in as user "qa_user_5"

  Scenario: Start mining
    When I click on the Start button
    Then I should see the application has started to successfully work
    When I click on the Pause button
    Then I should see that the application has stopped mining

  @manual
  Scenario: Mining settings menu
