#
# FILE NAME: mining.feature
# DESCRIPTION:  mining FEATURE
# AUTHOR: Dimitrije Dragašević (DD)
# CREATED: 20-Apr-18
# NOTES:
#

Feature: Mining

  @all_env
  Scenario: Mining using an existing user
    When I log in as user "qa_user_5"
    And I click on the Start button
    Then I should see miner has started mining
    When I click on the Stop button
    Then I should see miner has stopped mining

  @manual
  Scenario: Mining using a new user and fresh app installation

  @manual
  Scenario: Mining using an existing user after reinstalling the app

  @all_env
  Scenario: Mining settings menu
